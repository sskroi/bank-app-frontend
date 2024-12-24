import React, { useContext } from "react";

import SignInForm from "../components/authForms/SignInForm";
import SignUpForm from "../components/authForms/SignUpForm";
import styles from "./Auth.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCOUNTS_ROUTE, SIGN_UP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../main";

const Auth = observer(() => {
  const location = useLocation();
  const { user } = useContext(StoreContext);
  const navigate = useNavigate();

  if (user.isAuth) {
    navigate(ACCOUNTS_ROUTE);
  }

  const isSignUp = location.pathname.startsWith(SIGN_UP_ROUTE);
  const AuthForm = isSignUp ? SignUpForm : SignInForm;

  return (
    <div className={styles.authPage}>
      <AuthForm />
    </div>
  );
});

export default Auth;
