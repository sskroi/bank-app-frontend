import React, { useContext, useState } from "react";
import Button1 from "../components/UI/buttons/Button1";
import styles from "./Accounts.module.scss";
import { Dropdown, Modal } from "react-bootstrap";
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

  const [infoMsg, setInfoMsg] = useState({ type: "error", msg: "" });

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
      setInfoMsg({
        type: "info",
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
          type: "error",
          msg: e.response.data.message,
        });
      } else {
        setInfoMsg({
          type: "error",
          msg: e.message,
        });
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

      <BSModal
        active={infoMsg.msg}
        onClose={() => setInfoMsg({ msg: "" })}
        footer={
          <Button1 style={{minWidth: "150px"}} onClick={() => setInfoMsg({ msg: "" })}>Закрыть</Button1>
        }
        header={infoMsg.type === "error" && "Ошибка"}
      >
        <div className={styles.createAccountInfoWindow}>{infoMsg.msg}</div>
      </BSModal>

      <BSModal
        active={openAccActive}
        onClose={() => setOpenAccActive(false)}
        header={<Modal.Title>Открытие счёта</Modal.Title>}
        size="sm"
        footer={
          <Button1 disabled={openAccBtnDisabled} onClick={openAccount}>
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
        </div>
      </BSModal>
    </div>
  );
};

OpenAccBtnAndMenu.propTypes = {
  updateAccountList: PropTypes.func,
};

export default Accounts;
