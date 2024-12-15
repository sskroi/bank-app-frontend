import React, { useState } from "react";
import Button1 from "../components/UI/buttons/Button1";
import styles from "./Accounts.module.scss";
import ModalWindow1 from "../components/UI/ModalWindow1";
import { Dropdown } from "react-bootstrap";
import { createAccount } from "../http/accountsAPI";
import AccountList from "../components/AccountList";

const Accounts = () => {
  return (
    <div className={styles.accountsPage}>
      <div className={styles.accountPageContent}>
        <div className={styles.btnsCont}>
          <OpenAccBtnAndMenu />
          <CloseAccBtnAndMenu />
        </div>

        <AccountList />
      </div>
    </div>
  );
};

const OpenAccBtnAndMenu = () => {
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

      <ModalWindow1 isActive={openAccActive} setActive={setOpenAccActive}>
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
          {openAccInfo !== "" && <label>{openAccInfo}</label>}
          <Button1 disabled={openAccBtnDisabled} onClick={openAccount}>
            Открыть
          </Button1>
        </div>
      </ModalWindow1>
    </div>
  );
};

const CloseAccBtnAndMenu = () => {
  const [closeAccActive, setCloseAccActive] = useState(false);

  return (
    <div>
      <Button1
        style={{ fontSize: "20px" }}
        onClick={() => setCloseAccActive(true)}
      >
        Закрыть счёт
      </Button1>
      <ModalWindow1 isActive={closeAccActive} setActive={setCloseAccActive}>
        <div style={{ color: "red" }}>NOT IMPLEMENTED</div>
      </ModalWindow1>
    </div>
  );
};

export default Accounts;
