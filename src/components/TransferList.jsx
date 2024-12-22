import React, { useEffect, useState } from "react";
import styles from "./TransferList.module.scss";
import { Accordion, Col, Row, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { getTransfers } from "../http/transferAPI";

const TransferList = ({ account = null, allTransfers = false, style }) => {
  const [loading, setLoading] = useState(false);
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = () => {
    if (!account && !allTransfers) {
      return;
    }

    setLoading(true);
    getTransfers(account?.number)
      .then((data) => setTransfers(data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(fetchTransfers, [account]);

  const displayTransfers = transfers
    .sort((x, y) => x.timestamp < y.timestamp)
    .map((x) => <TransferCard key={x.publicId} transfer={x} />);

  return loading ? (
    <Spinner style={{ margin: "0 auto", color: "var(--primary-text-color)" }} />
  ) : transfers.length === 0 ? (
    <h3 style={{ color: "var(--primary-text-color)" }}>Нет транзакций</h3>
  ) : (
    <Accordion style={style} className={styles.transfersList}>
      {displayTransfers}
    </Accordion>
  );
};

function formatDate(isoString) {
  const date = new Date(isoString);
  date.setHours(date.getHours() - 3);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    //timeZoneName: "short",
  };

  return date.toLocaleString("ru-RU", options);
}

const TransferCard = ({ transfer }) => {
  const minusColor = "#C05959";
  const plusColor = "#5EB56A";

  let amount;
  let amountColor;
  if (transfer.direction === 1) {
    amount = `+${transfer.received} ${transfer.receivedCurrency.toUpperCase()}`;
    amountColor = plusColor;
  } else if (transfer.direction === -1) {
    amount = `-${transfer.sent} ${transfer.sentCurrency.toUpperCase()}`;
    amountColor = minusColor;
  } else {
    if (transfer.isConversion) {
      amount = (
        <>
          <span
            style={{ color: minusColor }}
          >{`-${transfer.sent} ${transfer.sentCurrency.toUpperCase()}`}</span>
          {" → "}
          <span style={{ color: plusColor }}>
            {`+${transfer.received} ${transfer.receivedCurrency.toUpperCase()}`}
          </span>
        </>
      );
    } else {
      amount = `${transfer.sent} ${transfer.sentCurrency.toUpperCase()}`;
    }
    amountColor = null;
  }

  return (
    <Accordion.Item eventKey={transfer.publicId}>
      <Accordion.Header>
        <Row className="d-flex justify-content-between w-100">
          <Col xs="auto">{formatDate(transfer.timestamp)}</Col>
          <Col
            xs="auto"
            className="me-2"
            style={amountColor && { color: amountColor }}
          >
            {amount}
          </Col>
        </Row>
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col>
            <p>Номер транзакции:</p>
            <b>{transfer.publicId}</b>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Сумма:</p>
            <b>{amount}</b>
          </Col>
          <Row>
            <Col>
              <p>Дата:</p>
              <b>{transfer.timestamp}</b>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col>
            <p>Счёт получателя:</p>
            <b>{transfer.receiverAccountNumber}</b>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Счёт отправителя:</p>
            <b>
              {transfer.senderAccountNumber === null
                ? "Неизвестен"
                : transfer.senderAccountNumber}
            </b>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

const transfer = PropTypes.shape({
  publicId: PropTypes.string,
  senderAccountNumber: PropTypes.string,
  receiverAccountNumber: PropTypes.string,
  sent: PropTypes.string,
  received: PropTypes.string,
  sentCurrency: PropTypes.string,
  receivedCurrency: PropTypes.string,
  isConversion: PropTypes.bool,
  direction: PropTypes.number,
  conversionRate: PropTypes.string,
  timestamp: PropTypes.string,
});

TransferCard.propTypes = {
  account: PropTypes.object,
  allTransfers: PropTypes.bool,
};

TransferList.propTypes = {
  transfers: PropTypes.arrayOf(transfer),
  style: PropTypes.object,
};

export default TransferList;
