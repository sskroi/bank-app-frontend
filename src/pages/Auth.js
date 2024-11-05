import React from "react";

import LoginForm from "../components/loginForm/LoginForm";
import SignUpForm from "../components/loginForm/SignUpForm";
import Header from "../components/header/Header";
import styles from "./Auth.module.scss"

const Auth = () => {
    return (
        <div className={styles.authPage}>
            <Header />
            <SignUpForm />
        </div>
    )
}

export default Auth;
