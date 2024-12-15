import React, { useContext, useEffect, useState } from "react";
import styles from "./AccountList.module.scss";
import { getAccounts } from "../http/accountsAPI";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image.js";
import { Spinner } from "react-bootstrap";

const AccountList = observer(() => {
  const { accounts } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccounts(0, 100)
      .then((data) => accounts.setAccounts(data))
      .catch((e) => {
        if (e.response?.data?.message) {
          alert(e.response.data.message);
        } else {
          alert(e.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.accountList}>
      {loading ? (
        <Spinner />
      ) : accounts.accounts.length === 0 ? (
        <h3>У вас нет счетов</h3>
      ) : (
        accounts.accounts.map((x) => <AccountCard key={x.number} {...x} />)
      )}
    </div>
  );
});

const AccountCard = ({ number, balance, currency, is_close }) => {
  return (
    <div className={styles.accountCard}>
      <div>Номер счёта:</div>
      <div>
        <b>{number}</b>
      </div>
      <div>Баланс:</div>
      <div>
        <b>{balance}</b> {currency.toUpperCase()}
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  number: PropTypes.string,
  balance: PropTypes.number,
  currency: PropTypes.currency,
  is_close: propTypes.bool,
};

export default AccountList;
