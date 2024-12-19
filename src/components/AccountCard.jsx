import PropTypes from "prop-types";
import styles from "./AccountCard.module.scss";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button1 from "./UI/buttons/Button1";

const AccountCard = ({
  account,
  account: { number, balance, currency },
  onCloseAccount,
  onTransfer,
}) => {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(number);
      setCopySuccess("Скопировано");
      setTimeout(() => setCopySuccess(""), 800);
    } catch (err) {
      console.error("Ошибка при копировании: ", err);
    }
  };

  return (
    <div className={styles.accountCard}>
      <Row>
        <Col className={styles.numberCont}>
          <b style={{ whiteSpace: "nowrap" }}>{number}</b>
        </Col>
        <Col xs="auto">
          <a
            style={{ padding: 0 }}
            className={styles.copyText}
            onClick={handleCopyClick}
          >
            скопировать
          </a>
        </Col>
      </Row>
      {copySuccess && <p className={styles.copySuccessText}>{copySuccess}</p>}
      <div>
        <b>{balance}</b> {currency.toUpperCase()}
      </div>
      <Row
        className={`${styles.accountCardButtonsCont} justify-content-center`}
      >
        <Col xs="auto">
          <Button1
            style={{ minWidth: "120px" }}
            onClick={() => onTransfer(account)}
          >
            Перевести
          </Button1>
        </Col>
        <Col xs="auto">
          <Button1
            style={{ minWidth: "120px" }}
            onClick={() => alert("Not implemented")}
          >
            История
          </Button1>
        </Col>
        <Col xs="auto">
          <Button1
            style={{ minWidth: "120px", whiteSpace: "nowrap" }}
            onClick={() => onCloseAccount(account)}
          >
            Закрыть счёт
          </Button1>
        </Col>
      </Row>
    </div>
  );
};
AccountCard.propTypes = {
  account: PropTypes.object,
  onCloseAccount: PropTypes.func,
  onTransfer: PropTypes.func,
};

export default AccountCard;
