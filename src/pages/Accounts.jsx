import React, { useContext, useState } from "react";
import Button1 from "../components/UI/buttons/Button1";
import styles from "./Accounts.module.scss";
import ModalWindow1 from "../components/UI/ModalWindow1";
import { Dropdown } from "react-bootstrap";
import { createAccount, getAccounts } from "../http/accountsAPI";
import AccountList from "../components/AccountList";
import { Context } from "../index.js";
import PropTypes from "prop-types";

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
        <div className={styles.btnsCont}>
          <OpenAccBtnAndMenu updateAccountList={updateAccountList} />
        </div>

        <AccountList updateAccountList={updateAccountList} />
      </div>
    </div>
  );
};

const OpenAccBtnAndMenu = ({ updateAccountList }) => {
  const [openAccActive, setOpenAccActive] = useState(false);

  const [newAccCurrency, setNewAccCurrency] = useState("Выберите валюту");
  const [openAccBtnDisabled, setOpenAccBtnDisabled] = useState(true);
  const [openAccInfo, setOpenAccInfo] = useState("");
  const changeCurrency = (e) => {
    setNewAccCurrency(e);
    if (e === "RUB") {
      setOpenAccBtnDisabled(false);
      setOpenAccInfo("");
    } else {
      setOpenAccBtnDisabled(true);
      setOpenAccInfo(`В данный момент создание счёта в валюте ${e} недоступно`);
    }
  };

  const openAccount = async () => {
    try {
      const newAccNum = await createAccount(newAccCurrency.toLowerCase());
      setOpenAccActive(false);
      updateAccountList();
      alert(`Счёт успешно создан. Номер - ${newAccNum}`);
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
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

      <ModalWindow1
        isActive={openAccActive}
        onClose={() => setOpenAccActive(false)}
      >
        <div className={styles.createAccountMenu}>
          <h3>Открытие счёта</h3>
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
          <Button1 disabled={openAccBtnDisabled} onClick={openAccount}>
            Открыть
          </Button1>
        </div>
      </ModalWindow1>
    </div>
  );
};

OpenAccBtnAndMenu.propTypes = {
  updateAccountList: PropTypes.func,
};

export default Accounts;
