import React, { useContext } from "react";
import styles from "./Header.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ACCOUNTS_ROUTE,
  HISTORY_ROUTE,
  PROFILE_ROUTE,
  SIGN_IN_ROUTE,
} from "../../utils/consts.js";

const Header = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setAuth(false);
    user.setUser({});
    localStorage.removeItem("accessToken");
    navigate(SIGN_IN_ROUTE);
  };

  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerCont}>
          <Logo />
          {user.isAuth && <NavigateMenu />}
          {user.isAuth ? (
            <button className={styles.logBtn} onClick={logOut}>
              Выйти
            </button>
          ) : (
            <button
              className={styles.logBtn}
              onClick={() => navigate(SIGN_IN_ROUTE)}
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
});

function Logo() {
  return (
    <div className={styles.logo}>
      <a href="#">F-BANK</a>
    </div>
  );
}

function NavigateMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const btns = [
    {
      text: "СЧЕТА",
      path: ACCOUNTS_ROUTE,
    },
    {
      text: "ИСТОРИЯ",
      path: HISTORY_ROUTE,
    },
    {
      text: "ПРОФИЛЬ",
      path: PROFILE_ROUTE,
    },
  ];

  return (
    <nav className={styles.navMenuCont}>
      {btns.map((x) => (
        <button
          key={x.text}
          className={`${styles.navBtn} ${location.pathname === x.path ? styles.activeBtn : ""}`}
          onClick={() => navigate(x.path)}
        >
          {x.text}
        </button>
      ))}
    </nav>
  );
}

export default Header;
