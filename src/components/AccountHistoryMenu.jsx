import React from "react";
import PropTypes from "prop-types";
import BSModal from "./UI/BSModal";
import TransferList from "./TransferList";

const AccountHistoryMenu = ({ account, setAccount }) => {
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

AccountHistoryMenu.propTypes = {
  account: PropTypes.object,
  setAccount: PropTypes.func,
};

export default AccountHistoryMenu;
