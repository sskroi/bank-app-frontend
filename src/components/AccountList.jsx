import React, { useContext, useEffect, useState } from "react";
import styles from "./AccountList.module.scss";
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import AccountCard from "./AccountCard";
import TransferMenu from "./TransferMenu";
import CloseAccountMenu from "./CloseAccountMenu";
import AccountHistoryMenu from "./AccountHistoryMenu";

const AccountList = observer(({ updateAccountList }) => {
  const { accounts } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);
  useEffect(() => updateAccountList(setLoading), []);

  const [closingAcc, setClosingAcc] = useState(null);
  const [transferAcc, setTransferAcc] = useState(null);
  const [transferActive, setTransferActive] = useState(false);

  const [historyAccount, setHistoryAccount] = useState(null);

  return (
    <div className={styles.accountList}>
      <CloseAccountMenu {...{ closingAcc, setClosingAcc, updateAccountList }} />

      {transferAcc && (
        <TransferMenu
          key={transferAcc.number}
          {...{
            transferAcc,
            updateAccountList,
            active: transferActive,
            setActive: setTransferActive,
          }}
        />
      )}

      {
        <AccountHistoryMenu
          account={historyAccount}
          setAccount={setHistoryAccount}
        />
      }

      {loading ? (
        <Spinner style={{margin: "0 auto"}} />
      ) : accounts.accounts.length === 0 ? (
        <h3>У вас нет открытых счетов.</h3>
      ) : (
        accounts.accounts
          .filter((x) => !x.isClose)
          .sort((x, y) => x.number.localeCompare(y.number))
          .map((x) => (
            <AccountCard
              onCloseAccount={setClosingAcc}
              onTransfer={(acc) => {
                setTransferAcc(acc);
                setTransferActive(true);
              }}
              onHistory={setHistoryAccount}
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

export default AccountList;
