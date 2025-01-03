import React, { useEffect, useState, FC } from "react";
import styles from "./TransferList.module.scss";
import { Accordion, Col, Row, Spinner } from "react-bootstrap";
import { getTransfers } from "../api/transferAPI";
import { IAccount, ITransaction } from "../types/types";
import { format, toZonedTime } from "date-fns-tz";

interface TransferListProps {
  account?: IAccount | null;
  allTransfers?: boolean;
  style?: React.CSSProperties;
}

const TransferList: FC<TransferListProps> = ({
  account = null,
  allTransfers = false,
  style,
}) => {
  const [loading, setLoading] = useState(false);
  const [transfers, setTransfers] = useState<ITransaction[]>([]);

  const fetchTransfers = () => {
    if (!account && !allTransfers) {
      return;
    }

    setLoading(true);
    getTransfers({ accountNumber: account?.number })
      .then((data) => setTransfers(data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(fetchTransfers, [account, allTransfers]);

  const displayTransfers = transfers
    .sort((x, y) => +(x.timestamp < y.timestamp))
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

const formatDate = (timestamp: string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = toZonedTime(timestamp, userTimeZone);

  const formattedDate = format(date, "dd-MM-yyyy HH:mm:ss", {
    timeZone: userTimeZone,
  });

  return formattedDate;
};

const TransferCard: FC<{ transfer: ITransaction }> = ({ transfer }) => {
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
            style={amountColor ? { color: amountColor } : {}}
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
              <b>{formatDate(transfer.timestamp)}</b>
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

export default TransferList;
