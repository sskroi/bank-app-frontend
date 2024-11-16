import React from "react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header>
      <div className="container">
        <div className={styles.headerCont}>
          <Logo />
          <NavigateMenu />
          <LogOutBtn />
        </div>
      </div>
    </header>
  );
}

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

function LogOutBtn() {
  return (
    <div className={styles.logOutBtn}>
      <a href="#">Log Out</a>
    </div>
  );
}

export default Header;
