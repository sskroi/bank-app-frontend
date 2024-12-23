import React, { useContext } from "react";
import styles from "./Header.module.scss";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../index";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import {
  ACCOUNTS_ROUTE,
  HISTORY_ROUTE,
  PROFILE_ROUTE,
  SIGN_IN_ROUTE,
} from "../utils/consts.js";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = observer(() => {
  const { user } = useContext(StoreContext);
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

  const logOut = () => {
    user.setAuth(false);
    user.setUser({});
    localStorage.removeItem("accessToken");
    navigate(SIGN_IN_ROUTE);
  };

  return (
    <Navbar
      variant="dark"
      expand="md"
      collapseOnSelect
      fixed="top"
      className={styles.navBar}
    >
      <Container>
        <Navbar.Brand>F-BANK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto align-items-center">
            {user.isAuth &&
              btns.map((x) => (
                <Nav.Link
                  key={x.text}
                  className={`${styles.navBtn} ${location.pathname === x.path ? styles.activeBtn : ""}`}
                  onClick={() => navigate(x.path)}
                >
                  {x.text}
                </Nav.Link>
              ))}
          </Nav>

          <Nav>
            {user.isAuth ? (
              <button className={styles.logBtn} onClick={logOut}>
                <LogoutIcon />
              </button>
            ) : (
              <button
                className={styles.logBtn}
                onClick={() => navigate(SIGN_IN_ROUTE)}
              >
                <LoginIcon />
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Header;
