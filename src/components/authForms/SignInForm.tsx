import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authForms.module.scss";
import Button1 from "../UI/buttons/Button1";
import { SIGN_UP_ROUTE } from "../../utils/consts";
import Input1WithLabel from "../UI/inputs/Input1WithLabel";
import { signIn } from "../../api/authAPI";
import useStore from "../../hooks/useStore";
import axios from "axios";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user } = useStore();
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrMsg(null);
    try {
      await signIn(formData.email, formData.password);
      user.setAuth(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 401)
          setErrMsg("Логин или пароль не совпадают");
        else if (err.response?.status == 400)
          setErrMsg("Некорректный формат данных");
        else {
          setErrMsg("Что-то пошло не так");
        }
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form className={styles.loginFormCont}>
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

      {errMsg && <p style={{ color: "var(--error-color)" }}>{errMsg}</p>}

      <div className={styles.buttonsCont}>
        <Button1
          onClick={onSubmit}
          style={{ width: "45%" }}
          disabled={formData.email === "" || formData.password.length < 8}
        >
          Войти
        </Button1>

        <Button1
          onClick={(e) => {
            e.preventDefault();
            navigate(SIGN_UP_ROUTE);
          }}
        >
          Регистрация
        </Button1>
      </div>
    </form>
  );
};

export default SignInForm;
