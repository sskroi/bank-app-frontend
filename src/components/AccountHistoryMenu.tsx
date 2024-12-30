import BSModal from "./UI/BSModal";
import TransferList from "./TransferList";
import { IAccount } from "../types/types";
import { FC } from "react";

interface AccountHistoryMenuProps {
  account: IAccount | null;
  setAccount: (acc: IAccount | null) => void;
}

const AccountHistoryMenu: FC<AccountHistoryMenuProps> = ({
  account,
  setAccount,
}) => {
  return (
    <BSModal
      active={!!account}
      onClose={() => setAccount(null)}
      header="История переводов"
      scrollable
      size="lg"
    >
      <div className="d-flex flex-column justify-content-center justify-content-center align-items-center">
        <TransferList style={{ width: "100%" }} account={account} />
      </div>
    </BSModal>
  );
};

export default AccountHistoryMenu;
