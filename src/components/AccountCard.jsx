import PropTypes from "prop-types";
import styles from "./AccountCard.module.scss";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button1 from "./UI/buttons/Button1";

const AccountCard = ({
  account,
  account: { number, balance, currency },
  onCloseAccount,
  onTransfer,
  onHistory,
}) => {
  const [copyText, setCopyText] = useState("скопировать");
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyClick = async () => {
    if (isCopying) return;

    try {
      await navigator.clipboard.writeText(number);
      setIsCopying(true);
      setCopyText("скопировано");
      setTimeout(() => {
        setCopyText("скопировать");
        setIsCopying(false);
      }, 800);
    } catch (err) {
      console.error("error on copy to clipboard: ", err);
    }
  };

  return (
    <Container className={styles.accountCard}>
      <Row className="d-flex justify-content-between">
        <Col md={9} xs={12} className={styles.numberCont}>
          <b>{number}</b>
        </Col>
        <Col className={styles.copyTextCont}>
          <a
            className={`${styles.copyText} ${
              copyText === "скопировано" ? styles.copiedText : ""
            }`}
            onClick={handleCopyClick}
          >
            {copyText}
          </a>
        </Col>
      </Row>
      <div>
        <b>{balance}</b> {currency.toUpperCase()}
      </div>
      <Row className={styles.accountCardButtonsCont}>
        <Col>
          <Button1
            style={{ minWidth: "130px" }}
            onClick={() => onTransfer(account)}
          >
            Перевести
          </Button1>
        </Col>
        <Col>
          <Button1
            style={{ minWidth: "130px" }}
            onClick={() => onHistory(account)}
          >
            История
          </Button1>
        </Col>
        <Col>
          <Button1
            style={{ minWidth: "130px", whiteSpace: "nowrap" }}
            onClick={() => onCloseAccount(account)}
          >
            Закрыть счёт
          </Button1>
        </Col>
      </Row>
    </Container>
  );
};
AccountCard.propTypes = {
  account: PropTypes.object.isRequired,
  onCloseAccount: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  onHistory: PropTypes.func.isRequired,
};

export default AccountCard;
