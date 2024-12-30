import React, { FC, useState } from "react";
import styles from "./TransferMenu.module.scss";
import { transfer } from "../http/transferAPI";
import Button1 from "./UI/buttons/Button1";
import Input1 from "./UI/inputs/Input1";
import * as Yup from "yup";
import BSModal from "./UI/BSModal";
import { Spinner } from "react-bootstrap";
import { IAccount } from "../types/types";
import { AxiosError } from "axios";

interface TransferMenuProps {
  transferAcc: IAccount;
  active: boolean;
  setActive: (isActive: boolean) => void;
  updateAccountList: () => void;
}

const TransferMenu: FC<TransferMenuProps> = ({
  transferAcc,
  active,
  setActive,
  updateAccountList,
}) => {
  const [amount, setAmount] = useState<number | string>(0);
  const [amountOk, setAmountOk] = useState(false);
  const [dstAccNum, setDstAccNum] = useState("");
  const [dstAccNumOk, setDstAccNumOk] = useState(false);

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [successTransferMsg, setSuccessTransferMsg] =
    useState<React.ReactElement | null>(null);

  const [loading, setLoading] = useState(false);
  const onTransfer = async () => {
    try {
      setLoading(true);
      const r = await transfer(transferAcc.number, dstAccNum, String(amount));
      setActive(false);
      setSuccessTransferMsg(
        <>
          <p>
            Переведено: {r.sent} {transferAcc.currency.toUpperCase()}
          </p>
          <div>
            <p>На счёт:</p>
            <p style={{ textWrap: "nowrap" }}>{r.receiverAccountNumber}</p>
          </div>
          <div>
            <p>Со счёта:</p>
            <p style={{ textWrap: "nowrap" }}>{r.senderAccountNumber}</p>
          </div>
        </>,
      );
      setErrMsg(null);
      updateAccountList();
    } catch (err) {
      let msg = "unknown error occurred";
      if (err instanceof AxiosError && err.response) {
        if (err.response.status === 404) {
          msg = "Счёт получателя не найден";
        } else if (err.response.data.message) {
          msg = err.response.data.message;
        }
      } else {
        console.log(err);
      }

      setErrMsg(msg);
    } finally {
      setLoading(false);
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
  const handleDstAccNumInput = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setDstAccNum(inputValue);

    accNumberValidator
      .validate({ accNum: inputValue })
      .then(() => {
        setDstAccNumOk(true);
        setDstAccErr("");

        if (inputValue === transferAcc.number) {
          setDstAccErr("Вы не можете переводить на текущий счёт");
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
      .max(Number(transferAcc.balance), "У вас недостаточно средств")
      .required("Поле обязательно для заполнения"),
  });
  const handleAmountInput = (e: React.FormEvent<HTMLInputElement>) => {
    let inputValue = e.currentTarget.value;
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
    <>
      <BSModal
        active={!!successTransferMsg}
        header="Успешный перевод"
        onClose={() => setSuccessTransferMsg(null)}
      >
        <div className="d-flex flex-column gap-2">{successTransferMsg}</div>
      </BSModal>

      <BSModal
        active={active}
        onClose={() => setActive(false)}
        header="Перевод средств"
        footer={
          <Button1
            style={{ minWidth: "200px" }}
            onClick={onTransfer}
            disabled={!amountOk || !dstAccNumOk}
          >
            Перевести
          </Button1>
        }
      >
        <div className={styles.transferWindow}>
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
            <Input1
              value={amount}
              onInput={handleAmountInput}
              placeholder="0"
            />
            {amountErr && <p className={styles.errInfo}>{amountErr}</p>}
          </div>
          {errMsg && <p className={styles.errInfo}>{errMsg}</p>}
          {loading && <Spinner style={{ margin: "0 auto" }} />}
        </div>
      </BSModal>
    </>
  );
};

export default TransferMenu;
