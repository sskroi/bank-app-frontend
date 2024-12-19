import React from "react";
import styles from "./CloseAccountMenu.module.scss";
import { closeAccount } from "../http/accountsAPI";
import PropTypes from "prop-types";
import Button1 from "./UI/buttons/Button1.jsx";
import BSModal from "./UI/BSModal.jsx";

const CloseAccountMenu = ({ closingAcc, setClosingAcc, updateAccountList }) => {
  const closeAcc = async () => {
    try {
      await closeAccount(closingAcc.number);
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
    <BSModal
      active={!!closingAcc}
      onClose={() => setClosingAcc(null)}
      header="Закрытие счёта"
      footer={
        <Button1
          style={{ minWidth: "150px" }}
          onClick={closeAcc}
          disabled={!closingAcc || closingAcc.balance !== "0"}
        >
          Закрыть счёт
        </Button1>
      }
    >
      {closingAcc && (
        <div className={styles.closeAccountWindow}>
          <p>Вы собираетесь закрыть счёт с номером:</p>
          <b>{closingAcc.number}</b>
          {closingAcc.balance > 0 && (
            <p className={styles.errInfo}>
              Вы не можете закрыть счёт т.к. на нём есть средства
            </p>
          )}
        </div>
      )}
    </BSModal>
  );
};
CloseAccountMenu.propTypes = {
  closingAcc: PropTypes.object,
  setClosingAcc: PropTypes.func,
  updateAccountList: PropTypes.func,
};

export default CloseAccountMenu;
