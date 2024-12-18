import React, { useContext, useEffect, useState } from "react";
import styles from "./AccountList.module.scss";
import { closeAccount, transfer } from "../http/accountsAPI";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import Button1 from "./UI/buttons/Button1.jsx";
import Input1 from "./UI/inputs/Input1.jsx";
import { Col, Row, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import ModalWindow1 from "./UI/ModalWindow1.jsx";

const AccountList = observer(({ updateAccountList }) => {
  const { accounts } = useContext(Context);

  const [loading, setLoading] = useState(true);
  useEffect(() => updateAccountList(setLoading), []);

  const [closingAcc, setClosingAcc] = useState(null);
  const [transferAcc, setTransferAcc] = useState(null);

  return (
    <div className={styles.accountList}>
      {closingAcc && (
        <ModalWindow1 onClose={() => setClosingAcc(null)}>
          <CloseAccountMenu
            {...{ closingAcc, setClosingAcc, updateAccountList }}
          />
        </ModalWindow1>
      )}

      {transferAcc && (
        <ModalWindow1 onClose={() => setTransferAcc(null)}>
          <TransferMenu
            {...{ transferAcc, setTransferAcc, updateAccountList }}
          />
        </ModalWindow1>
      )}

      {loading ? (
        <Spinner />
      ) : accounts.accounts.length === 0 ? (
        <h3>У вас нет открытых счетов.</h3>
      ) : (
        accounts.accounts
          .filter((x) => !x.isClose)
          .sort((x, y) => x.number.localeCompare(y.number))
          .map((x) => (
            <AccountCard
              onCloseAccount={setClosingAcc}
              onTransfer={setTransferAcc}
              key={x.number}
              account={x}
            />
          ))
      )}
    </div>
  );
});
AccountList.propTypes = {
  updateAccountList: PropTypes.func,
};

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
          <a className={styles.copyText} onClick={handleCopyClick}>
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

const TransferMenu = ({ transferAcc, setTransferAcc, updateAccountList }) => {
  const [amount, setAmount] = useState(0);
  const [amountOk, setAmountOk] = useState(false);
  const [dstAccNum, setDstAccNum] = useState("");
  const [dstAccNumOk, setDstAccNumOk] = useState(false);

  const onTransfer = async () => {
    try {
      await transfer(transferAcc.number, dstAccNum, amount);
      updateAccountList();
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    } finally {
      setTransferAcc(null);
    }
  };

  const [dstAccErr, setDstAccErr] = useState("");
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const accNumberValidator = Yup.object().shape({
    accNum: Yup.string()
      .matches(uuidRegex, "Поле должно быть валидным номером счёта")
      .required("Поле обязательно для заполнения"),
  });
  const handleDstAccNumInput = (e) => {
    const inputValue = e.target.value;
    setDstAccNum(inputValue);

    accNumberValidator
      .validate({ accNum: inputValue })
      .then(() => {
        setDstAccNumOk(true);
        setDstAccErr("");

        if (inputValue === transferAcc.number) {
          setDstAccErr("Вы не можете переводить на текщий счёт");
          setDstAccNumOk(false);
        }
      })
      .catch((err) => {
        setDstAccNumOk(false);
        setDstAccErr(err.message);
      });
  };

  const [amountErr, setAmountErr] = useState("");
  const amountValidator = Yup.object({
    amount: Yup.number()
      .min(0, "Сумма должна быть больше 9")
      .max(transferAcc.balance, "У вас недостаточно средств")
      .required("Поле обязательно для заполнения"),
  });
  const handleAmountInput = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/[^0-9.]/g, "");
    inputValue = inputValue.replace(/(\..*)\./g, "$1");
    if (
      inputValue.startsWith("0") &&
      inputValue.length > 1 &&
      inputValue[1] !== "."
    ) {
      inputValue = inputValue.replace(/^0+/, "");
    }

    if (inputValue.startsWith(".")) {
      inputValue = "0.";
    }

    const [integerPart, decimalPart] = inputValue.split(".");

    if (decimalPart !== undefined) {
      inputValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }

    setAmount(inputValue);

    amountValidator
      .validate({ amount: Number(inputValue) })
      .then(() => {
        if (Number(inputValue) > 0) {
          setAmountOk(true);
        } else {
          setAmountOk(false);
        }
        setAmountErr("");
      })
      .catch((err) => {
        setAmountOk(false);
        setAmountErr(err.message);
      });
  };

  return (
    <div className={styles.transferWindow}>
      <h5>Перевод средств</h5>
      <div>
        <label>Со счёта:</label>
        <br />
        <b>{transferAcc.number}</b>
        <br />
        <b>
          {transferAcc.balance} {transferAcc.currency.toUpperCase()}
        </b>
      </div>
      <div className={styles.transferDestAccInputCont}>
        <p>Введите счёт получателя:</p>
        <Input1
          value={dstAccNum}
          onInput={handleDstAccNumInput}
          placeholder="f47971af-0487-4fae-898d-fb9108da4dff"
        />
        {dstAccErr && <p className={styles.errInfo}>{dstAccErr}</p>}

        <p>Сумма перевода:</p>
        <Input1 value={amount} onInput={handleAmountInput} placeholder="0" />
        {amountErr && <p className={styles.errInfo}>{amountErr}</p>}
      </div>
      <Button1 onClick={onTransfer} disabled={!amountOk || !dstAccNumOk}>
        Перевести
      </Button1>
    </div>
  );
};
TransferMenu.propTypes = {
  transferAcc: PropTypes.object,
  setTransferAcc: PropTypes.func,
  updateAccountList: PropTypes.func,
};

const CloseAccountMenu = ({ closingAcc, setClosingAcc, updateAccountList }) => {
  const closeAcc = async () => {
    try {
      await closeAccount(closingAcc.number);
      updateAccountList();
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    } finally {
      setClosingAcc(null);
    }
  };

  return (
    <div className={styles.closeAccountWindow}>
      <h5>Закрытие счёта</h5>
      <p>Вы собираетесь закрыть счёт с номером:</p>
      <b>{closingAcc.number}</b>
      {closingAcc.balance > 0 && (
        <p className={styles.errInfo}>
          Вы не можете закрыть счёт т.к. на нём есть средства
        </p>
      )}
      <Button1 onClick={closeAcc} disabled={closingAcc.balance !== "0"}>
        Закрыть счёт
      </Button1>
    </div>
  );
};
CloseAccountMenu.propTypes = {
  closingAcc: PropTypes.object,
  setClosingAcc: PropTypes.func,
  updateAccountList: PropTypes.func,
};

export default AccountList;
