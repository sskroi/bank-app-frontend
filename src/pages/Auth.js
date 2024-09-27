import React from "react";

import LoginForm from "../components/loginForm/LoginForm";
import Header from "../components/header/Header";
import "./Auth.scss"

const Auth = () => {

    return (
        <div className="AuthPage">
            <Header />
            <LoginForm />
        </div>
    )
}

export default Auth;
