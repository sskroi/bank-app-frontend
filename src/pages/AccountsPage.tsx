import { FC, useState } from "react";
import Button1 from "../components/UI/buttons/Button1";
import styles from "./AccountsPage.module.scss";
import { Container, Dropdown, Spinner } from "react-bootstrap";
import { createAccount, getAccounts } from "../http/accountsAPI";
import AccountList from "../components/AccountList";
import BSModal from "../components/UI/BSModal";
import useStore from "../hooks/useStore";
import { AxiosError } from "axios";

const AccountsPage: FC = () => {
  const { accounts } = useStore();

  const updateAccountList = async () => {
    try {
      const data = await getAccounts(0, 100);
      accounts.setAccounts(data);
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        alert(e.response.data.message);
      } else {
        console.log(e);
      }
    }
  };

  return (
    <Container className={styles.accountsPage}>
      <div className={styles.pageHeader}>
        <OpenAccBtnAndMenu updateAccountList={updateAccountList} />
        <h3>Ваши счета</h3>
      </div>
      <Container className={styles.accountList}>
        <AccountList updateAccountList={updateAccountList} />
      </Container>
    </Container>
  );
};

const OpenAccBtnAndMenu: FC<{ updateAccountList: () => void }> = ({
  updateAccountList,
}) => {
  const [openAccActive, setOpenAccActive] = useState(false);

  const [infoMsg, setInfoMsg] = useState<{
    header: string;
    body: null | React.ReactNode;
  }>({ header: "Ошибка", body: null });

  const currencies = ["RUB", "EUR", "USD"];

  const defaultCurrencyValue = "Выберите валюту";
  const [newAccCurrency, setNewAccCurrency] =
    useState<string>(defaultCurrencyValue);

  const [loading, setLoading] = useState(false);
  const openAccount = async () => {
    setLoading(true);
    try {
      const newAccNum = await createAccount(newAccCurrency.toLowerCase());
      setOpenAccActive(false);
      updateAccountList();
      setInfoMsg({
        header: "Счёт создан",
        body: (
          <>
            <p>Счёт успешно создан. Номер счёта:</p>
            <p>{newAccNum}</p>
          </>
        ),
      });
    } catch (e) {
      setOpenAccActive(false);
      if (e instanceof AxiosError && e.response) {
        setInfoMsg({
          header: "Ошибка",
          body: e.response.data.message,
        });
      } else {
        console.log(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button1
        style={{ fontSize: "20px" }}
        onClick={() => setOpenAccActive(true)}
      >
        Открыть счёт
      </Button1>

      <BSModal
        active={!!infoMsg.body}
        onClose={() => setInfoMsg({ header: "error", body: null })}
        header={infoMsg.header}
      >
        <div className={styles.createAccountInfoWindow}>{infoMsg.body}</div>
      </BSModal>

      <BSModal
        active={!!openAccActive}
        onClose={() => setOpenAccActive(false)}
        header="Открытие счёта"
        size="sm"
        footer={
          <Button1
            style={{ minWidth: "150px" }}
            disabled={newAccCurrency === defaultCurrencyValue}
            onClick={openAccount}
          >
            Открыть
          </Button1>
        }
      >
        <div className={styles.createAccountMenu}>
          <Dropdown onSelect={(e) => e && setNewAccCurrency(e)}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {newAccCurrency}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {currencies.map((x) => (
                <Dropdown.Item key={x} eventKey={x}>
                  {x}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {loading && <Spinner style={{ margin: "0 auto" }} />}
        </div>
      </BSModal>
    </div>
  );
};

export default AccountsPage;
