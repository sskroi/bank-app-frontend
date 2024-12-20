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
    setLoading(true);
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
      size="lg"
    >
      <div className="d-flex flex-column justify-content-center justify-content-center align-items-center">
        {loading ? (
          <Spinner style={{ margin: "0 auto" }} />
        ) : history.length === 0 ? (
          <h3>Нет транзакций</h3>
        ) : (
          <TransferList style={{ width: "100%" }} transfers={history} />
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
