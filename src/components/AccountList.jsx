import React, { useContext, useEffect, useState } from "react";
import styles from "./AccountList.module.scss";
import { closeAccount } from "../http/accountsAPI";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import Button1 from "./UI/buttons/Button1.jsx";
import ModalWindow2 from "./UI/ModalWindow2.jsx";
import Input1 from "./UI/inputs/Input1.jsx";
import { Spinner } from "react-bootstrap";

const AccountList = observer(({ updateAccountList }) => {
  const { accounts } = useContext(Context);

  const [loading, setLoading] = useState(true);
  useEffect(() => updateAccountList(setLoading), []);

  const [closingAcc, setClosingAcc] = useState(null);
  const [transferAcc, setTransferAcc] = useState(null);

  return (
    <div className={styles.accountList}>
      {closingAcc && (
        <ModalWindow2 onClose={() => setClosingAcc(null)}>
          <CloseAccountMenu
            {...{ closingAcc, setClosingAcc, updateAccountList }}
          />
        </ModalWindow2>
      )}

      {transferAcc && (
        <ModalWindow2 onClose={() => setTransferAcc(null)}>
          <TransferMenu
            {...{ transferAcc, setTransferAcc, updateAccountList }}
          />
        </ModalWindow2>
      )}

      {loading ? (
        <Spinner />
      ) : accounts.accounts.length === 0 ? (
        <h3>У вас нет открытых счетов.</h3>
      ) : (
        accounts.accounts
          .filter((x) => !x.isClose)
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
  return (
    <div className={styles.accountCard}>
      <div>
        <b>{number}</b>
      </div>
      <div>
        <b>{balance}</b> {currency.toUpperCase()}
      </div>
      <div className={styles.accountCardButtonsCont}>
        <Button1 onClick={() => onTransfer(account)}>Перевести</Button1>
        <Button1>Пополнить</Button1>
        <Button1 onClick={() => onCloseAccount(account)}>Закрыть счёт</Button1>
      </div>
    </div>
  );
};
AccountCard.propTypes = {
  account: PropTypes.object,
  onCloseAccount: PropTypes.func,
  onTransfer: PropTypes.func,
};

const TransferMenu = ({ transferAcc, setTransferAcc, updateAccountList }) => {
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
        <Input1 placeholder="f47971af-0487-4fae-898d-fb9108da4dff" />
      </div>
      <Button1>Перевести</Button1>
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
      await closeAccount(closingAcc);
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
      <Button1 onClick={closeAcc}>Закрыть счёт</Button1>
    </div>
  );
};
CloseAccountMenu.propTypes = {
  closingAcc: PropTypes.object,
  setClosingAcc: PropTypes.func,
  updateAccountList: PropTypes.func,
};

export default AccountList;
