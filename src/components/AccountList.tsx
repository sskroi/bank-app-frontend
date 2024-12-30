import { FC, useEffect, useState } from "react";
import styles from "./AccountList.module.scss";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import AccountCard from "./AccountCard";
import TransferMenu from "./TransferMenu";
import CloseAccountMenu from "./CloseAccountMenu";
import AccountHistoryMenu from "./AccountHistoryMenu";
import useStore from "../hooks/useStore";
import { IAccount } from "../types/types";

interface AccountListProps {
  updateAccountList: (setLoading?: (isLoading: boolean) => void) => void;
}

const AccountList: FC<AccountListProps> = observer(({ updateAccountList }) => {
  const { accounts } = useStore();

  const [loading, setLoading] = useState(true);
  useEffect(() => updateAccountList(setLoading), []);

  const [closingAcc, setClosingAcc] = useState<IAccount | null>(null);
  const [transferAcc, setTransferAcc] = useState<IAccount | null>(null);
  const [transferActive, setTransferActive] = useState(false);

  const [historyAccount, setHistoryAccount] = useState<IAccount | null>(null);

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
        <Spinner style={{ margin: "0 auto" }} />
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

export default AccountList;
