import React from "react";
import styles from "./TransferList.module.scss";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const TransferList = ({ transfers, style }) => {
  return (
    <Accordion style={style} className={styles.transfersList}>
      {transfers.map((x) => (
        <TransferCard key={x.publicId} transfer={x} />
      ))}
    </Accordion>
  );
};

const TransferCard = ({ transfer }) => {
  let amount;
  let amountColor;
  if (transfer.isIncoming) {
    amount = `+${transfer.received} ${transfer.receivedCurrency.toUpperCase()}`;
    amountColor = "#5EB56A";
  } else {
    amount = `-${transfer.sent} ${transfer.sentCurrency.toUpperCase()}`;
    amountColor = "#C05959";
  }

  return (
    <Accordion.Item eventKey={transfer.publicId}>
      <Accordion.Header>
        <Row className="d-flex justify-content-between w-100">
          <Col xs="auto">{transfer.timestamp}</Col>
          <Col xs="auto" className="me-2" style={{ color: amountColor }}>
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
            <b>
              {transfer.isIncoming
                ? `${transfer.received} ${transfer.receivedCurrency}`
                : `${transfer.sent} ${transfer.sentCurrency}`}
            </b>
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
  isIncoming: PropTypes.bool,
  conversionRate: PropTypes.string,
  timestamp: PropTypes.string,
});

TransferCard.propTypes = {
  transfer: transfer,
};

TransferList.propTypes = {
  transfers: PropTypes.arrayOf(transfer),
  style: PropTypes.object,
};

export default TransferList;
