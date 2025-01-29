import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authForms.module.scss";
import Button1 from "../UI/buttons/Button1";
import Input1WithLabel from "../UI/inputs/Input1WithLabel";
import { SIGN_IN_ROUTE } from "../../utils/consts";
import { signUp } from "../../api/authAPI";
import { Form } from "react-bootstrap";
import useStore from "../../hooks/useStore";
import axios from "axios";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    patronymic: "",
    passport: "1234 567890",
    password: "",
    repPassword: "",
    consent: false,
  });

  const [infoLabel, setInfoLabel] = useState("");
  const [signUpBtnDisabled, setSignUpBtnDisabled] = useState(true);

  const navigate = useNavigate();

  const { user } = useStore();

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signUp(formData);
      user.setAuth(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setInfoLabel("Email занят");
        } else if (err.response?.status === 400) {
          setInfoLabel("Некорректный формат данных");
        } else {
          setInfoLabel("Что-то пошло не так");
        }
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (
      formData.password !== "" &&
      formData.password !== formData.repPassword
    ) {
      setInfoLabel("Пароли не совпадают");
    } else {
      setInfoLabel("");
    }

    if (formData.consent) {
      setSignUpBtnDisabled(false);
    } else {
      setSignUpBtnDisabled(true);
    }
  }, [formData]);

  return (
    <form className={styles.loginFormCont} autoComplete="off">
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

      {infoLabel !== "" && (
        <p style={{ color: "var(--error-color)" }}>{infoLabel}</p>
      )}

      <Form.Check
        type="checkbox"
        id="agree-check"
        label="Согласен на обработку персональных данных"
        style={{ color: "var(--primary-text-color)" }}
        onChange={(e) =>
          setFormData({ ...formData, consent: e.target.checked })
        }
      />

      <div className={styles.buttonsCont}>
        <Button1 onClick={onSubmit} disabled={signUpBtnDisabled}>
          Зарегистрироваться
        </Button1>
        <Button1
          onClick={(e) => {
            e.preventDefault();
            navigate(SIGN_IN_ROUTE);
          }}
        >
          Вход в аккаунт
        </Button1>
      </div>
    </form>
  );
}
