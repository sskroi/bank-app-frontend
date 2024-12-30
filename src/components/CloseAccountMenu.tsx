import { FC, useState } from "react";
import styles from "./CloseAccountMenu.module.scss";
import { closeAccount } from "../http/accountsAPI";
import Button1 from "./UI/buttons/Button1";
import BSModal from "./UI/BSModal";
import { Spinner } from "react-bootstrap";
import { IAccount } from "../types/types";
import { AxiosError } from "axios";

interface CloseAccountMenuProps {
  closingAcc: IAccount | null;
  setClosingAcc: (acc: IAccount | null) => void;
  updateAccountList: () => void;
}

const CloseAccountMenu: FC<CloseAccountMenuProps> = ({
  closingAcc,
  setClosingAcc,
  updateAccountList,
}) => {
  const [loading, setLoading] = useState(false);

  const closeAcc = async () => {
    try {
      setLoading(true);
      if (closingAcc) {
        await closeAccount(closingAcc.number);
        updateAccountList();
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        alert(e.response.data.message);
      } else if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      setLoading(false);
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
          {Number(closingAcc.balance) > 0 && (
            <p className={styles.errInfo}>
              Вы не можете закрыть счёт т.к. на нём есть средства
            </p>
          )}
          {loading && <Spinner style={{ margin: "0 auto" }} />}
        </div>
      )}
    </BSModal>
  );
};

export default CloseAccountMenu;
