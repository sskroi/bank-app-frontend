import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./AccountHistory.module.scss";
import { getAccountTransfers } from "../http/transferAPI";
import BSModal from "./UI/BSModal";
import TransferList from "./TransferList";

const AccountHistoryMenu = ({ account, setAccount }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
    if (!account) {
      return () => {};
    }
    getAccountTransfers(account.number)
      .then((data) => {
        setHistory(data);
      })
      .catch(() => {
        console.log(e);
      });
  };

  useEffect(fetchHistory, [account]);

  return (
    <BSModal
      active={!!account}
      onClose={() => setAccount(null)}
      header="История переводов"
    >
      <TransferList transfers={history} />
    </BSModal>
  );
};

AccountHistoryMenu.propTypes = {
  account: PropTypes.object,
  setAccount: PropTypes.func,
};

export default AccountHistoryMenu;
