import React from "react";

//import SignInForm from "../components/authForms/SignInForm";
import SignUpForm from "../components/authForms/SignUpForm";
//import Header from "../components/header/Header";
import styles from "./Auth.module.scss";

const Auth = () => {
  return (
    <div className={styles.authPage}>
      <SignUpForm />
    </div>
  );
};

export default Auth;
