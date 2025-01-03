import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authForms.module.scss";
import Button1 from "../UI/buttons/Button1";
import { SIGN_UP_ROUTE } from "../../utils/consts";
import Input1WithLabel from "../UI/inputs/Input1WithLabel";
import { StoreContext } from "../../main";
import { signIn } from "../../api/authAPI";
import useStore from "../../hooks/useStore";

function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { user } = useStore();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(formData.email, formData.password);
      console.log(data);
      user.setAuth(true);
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  return (
    <form onSubmit={submit} className={styles.loginFormCont}>
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
