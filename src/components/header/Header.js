import React, { useContext } from "react";
import styles from "./Header.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";

const Header = observer(() => {
  const { user } = useContext(Context);

  return (
    <header>
      <div className="container">
        <div className={styles.headerCont}>
          <Logo />
          {user.isAuth && <NavigateMenu />}
          {user.isAuth ? (
            <button
              className={styles.logBtn}
              onClick={() => user.setAuth(false)}
            >
              Выйти
            </button>
          ) : (
            <button
              className={styles.logBtn}
              onClick={() => user.setAuth(true)}
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
  return (
    <nav className={styles.navMenuCont}>
      <button className={styles.navBtn}>HOME</button>
      <button className={styles.navBtn}>TRANSFERS</button>
      <button className={styles.navBtn}>HISTORY</button>
    </nav>
  );
}

export default Header;
