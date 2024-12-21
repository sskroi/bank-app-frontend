import React, { useContext, useState } from "react";
import Button1 from "../components/UI/buttons/Button1";
import styles from "./Accounts.module.scss";
import { Container, Dropdown, Spinner } from "react-bootstrap";
import { createAccount, getAccounts } from "../http/accountsAPI";
import AccountList from "../components/AccountList";
import { Context } from "../index.js";
import PropTypes from "prop-types";
import BSModal from "../components/UI/BSModal.jsx";

const Accounts = () => {
  const { accounts } = useContext(Context);

  const updateAccountList = (setLoading) => {
    getAccounts(0, 100)
      .then((data) => accounts.setAccounts(data))
      .catch((e) => {
        if (e.response?.data?.message) {
          alert(e.response.data.message);
        } else {
          alert(e.message);
        }
      })
      .finally(() => typeof setLoading === "function" && setLoading(false));
  };

  return (
    <div className={styles.accountsPage}>
      <div className={styles.accountPageContent}>
        <div className={styles.pageHeader}>
          <OpenAccBtnAndMenu updateAccountList={updateAccountList} />
          <h3>Ваши счета</h3>
        </div>
        <Container className={styles.accountList}>
          <AccountList updateAccountList={updateAccountList} />
        </Container>
      </div>
    </div>
  );
};

const OpenAccBtnAndMenu = ({ updateAccountList }) => {
  const [openAccActive, setOpenAccActive] = useState(false);

  const [infoMsg, setInfoMsg] = useState({ header: "error", msg: "" });

  const defaultCurrencyValue = "Выберите валюту";
  const [newAccCurrency, setNewAccCurrency] = useState(defaultCurrencyValue);
  const [openAccBtnDisabled, setOpenAccBtnDisabled] = useState(true);
  const [openAccInfo, setOpenAccInfo] = useState("");
  const changeCurrency = (e) => {
    setNewAccCurrency(e);
    if (e !== defaultCurrencyValue) {
      setOpenAccBtnDisabled(false);
      setOpenAccInfo("");
    }
  };

  const [loading, setLoading] = useState(false);
  const openAccount = async () => {
    setLoading(true);
    try {
      const newAccNum = await createAccount(newAccCurrency.toLowerCase());
      setOpenAccActive(false);
      updateAccountList();
      setInfoMsg({
        header: "Счёт создан",
        msg: (
          <>
            <p>Счёт успешно создан. Номер счёта:</p>
            <p>{newAccNum}</p>
          </>
        ),
      });
    } catch (e) {
      setOpenAccActive(false);
      if (e.response?.data?.message) {
        setInfoMsg({
          header: "Ошибка",
          msg: e.response.data.message,
        });
      } else {
        setInfoMsg({
          header: "Ошибка",
          msg: e.message,
        });
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
        active={!!infoMsg.msg}
        onClose={() => setInfoMsg({ msg: "" })}
        header={infoMsg.header}
      >
        <div className={styles.createAccountInfoWindow}>{infoMsg.msg}</div>
      </BSModal>

      <BSModal
        active={!!openAccActive}
        onClose={() => setOpenAccActive(false)}
        header="Открытие счёта"
        size="sm"
        footer={
          <Button1
            style={{ minWidth: "150px" }}
            disabled={openAccBtnDisabled}
            onClick={openAccount}
          >
            Открыть
          </Button1>
        }
      >
        <div className={styles.createAccountMenu}>
          <Dropdown onSelect={changeCurrency}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {newAccCurrency}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item eventKey="RUB">RUB</Dropdown.Item>
              <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
              <Dropdown.Item eventKey="EUR">EUR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {openAccInfo !== "" && (
            <label style={{ color: "#B73D3D" }}>{openAccInfo}</label>
          )}
          {loading && <Spinner style={{ margin: "0 auto" }} />}
        </div>
      </BSModal>
    </div>
  );
};

OpenAccBtnAndMenu.propTypes = {
  updateAccountList: PropTypes.func,
};

export default Accounts;
