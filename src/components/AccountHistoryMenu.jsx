import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTransfers } from "../http/transferAPI";
import BSModal from "./UI/BSModal";
import TransferList from "./TransferList";
import { Spinner } from "react-bootstrap";

const AccountHistoryMenu = ({ account, setAccount }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = () => {
    if (!account) {
      return () => {};
    }
    getTransfers(account.number)
      .then((data) => {
        setHistory(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchHistory, [account]);

  return (
    <BSModal
      active={!!account}
      onClose={() => setAccount(null)}
      header="История переводов"
      scrollable
    >
      <div className="d-flex flex-column">
        {loading ? (
          <Spinner style={{ margin: "0 auto" }} />
        ) : history.length === 0 ? (
          <h3>Нет транзакций</h3>
        ) : (
          <TransferList transfers={history} />
        )}
      </div>
    </BSModal>
  );
};

AccountHistoryMenu.propTypes = {
  account: PropTypes.object,
  setAccount: PropTypes.func,
};

export default AccountHistoryMenu;
