import React, { useContext, useEffect, useState } from "react";
import styles from "./AccountList.module.scss";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import AccountCard from "./AccountCard.jsx";
import TransferMenu from "./TransferMenu.jsx";
import CloseAccountMenu from "./CloseAccountMenu.jsx";

const AccountList = observer(({ updateAccountList }) => {
  const { accounts } = useContext(Context);

  const [loading, setLoading] = useState(true);
  useEffect(() => updateAccountList(setLoading), []);

  const [closingAcc, setClosingAcc] = useState(null);
  const [transferAcc, setTransferAcc] = useState(null);
  const [transferActive, setTransferActive] = useState(false);

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
              onTransfer={(acc) => {
                setTransferAcc(acc);
                setTransferActive(true);
              }}
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
