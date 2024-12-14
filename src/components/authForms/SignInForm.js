import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authForms.module.scss";
import Button1 from "../UI/buttons/Button1";
import { SIGN_UP_ROUTE } from "../../utils/consts";
import Input1WithLabel from "../UI/inputs/Input1WithLabel";

function SignInForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormData({
      username: "",
      password: "",
    });

    console.log(
      "Form submitted:\nUsername: " +
        formData.username +
        "\n" +
        "Password: " +
        formData.password,
    );
  };
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className={styles.loginFormCont}>
      <h2>Вход в аккаунт</h2>

      <div className={styles.inputFieldsCont}>
        <Input1WithLabel
          labelValue="Электронная почта"
          placeholder="example@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input1WithLabel
          type="password"
          labelValue="Пароль"
          placeholder="********"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      <div className={styles.buttonsCont}>
        <Button1 type="submit" style={{ width: "45%" }}>
          Войти
        </Button1>

        <Button1 onClick={() => navigate(SIGN_UP_ROUTE)}>Регистрация</Button1>
      </div>
    </form>
  );
}

export default SignInForm;
