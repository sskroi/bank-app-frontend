import React, { useContext } from "react";
import styles from "./Header.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import { useNavigate } from "react-router-dom";
import { ACCOUNTS_ROUTE, SIGN_IN_ROUTE } from "../../utils/consts.js";

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
      <div className="container">
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

  return (
    <nav className={styles.navMenuCont}>
      <button
        className={styles.navBtn}
        onClick={() => navigate(ACCOUNTS_ROUTE)}
      >
        СЧЕТА
      </button>
      <button
        className={styles.navBtn}
        onClick={() => alert("not implemented")}
      >
        ПЕРЕВОДЫ
      </button>
      <button
        className={styles.navBtn}
        onClick={() => alert("not implemented")}
      >
        ПРОФИЛЬ
      </button>
    </nav>
  );
}

export default Header;
