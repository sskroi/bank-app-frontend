import React from "react";

import SignInForm from "../components/authForms/SignInForm";
import SignUpForm from "../components/authForms/SignUpForm";
//import Header from "../components/header/Header";
import styles from "./Auth.module.scss";
import { useLocation } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../utils/consts";

const Auth = () => {
  const location = useLocation();

  return (
    <div className={styles.authPage}>
      {location.pathname === SIGN_UP_ROUTE ? <SignUpForm /> : <SignInForm />}
    </div>
  );
};

export default Auth;
