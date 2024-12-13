import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authForms.module.scss";
import Button1 from "../UI/buttons/Button1";
import Input1WithLabel from "../UI/inputs/Input1WithLabel";
import { SIGN_IN_ROUTE } from "../../utils/consts";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    patronymic: "",
    passport: "",
    password: "",
    repPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginFormCont}>
      <h2>Регистрация аккаунта</h2>

      <div className={styles.inputFieldsCont}>
        <Input1WithLabel
          labelValue="Электронная почта"
          placeholder="example@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input1WithLabel
          labelValue="Имя"
          placeholder="Иван"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input1WithLabel
          labelValue="Фамилия"
          placeholder="Иванов"
          value={formData.surname}
          onChange={(e) =>
            setFormData({ ...formData, surname: e.target.value })
          }
        />
        <Input1WithLabel
          labelValue="Отчество"
          placeholder="Иванович"
          value={formData.patronymic}
          onChange={(e) =>
            setFormData({ ...formData, patronymic: e.target.value })
          }
        />
        <Input1WithLabel
          labelValue="Паспортные данные"
          placeholder="1234 567890"
          value={formData.passport}
          onChange={(e) =>
            setFormData({ ...formData, passport: e.target.value })
          }
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
        <Input1WithLabel
          type="password"
          labelValue="Повтор пароля"
          placeholder="********"
          value={formData.repPassword}
          onChange={(e) =>
            setFormData({ ...formData, repPassword: e.target.value })
          }
        />
      </div>

      <div className={styles.buttonsCont}>
        <Button1 type="submit">Зарегистрироваться</Button1>
        <Button1 onClick={() => navigate(SIGN_IN_ROUTE)}>
          Вход в аккаунт
        </Button1>
      </div>
    </form>
  );
}
