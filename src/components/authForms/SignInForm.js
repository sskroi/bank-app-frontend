import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authForms.module.scss";
import Input1 from "../UI/inputs/Input1";
import Button1 from "../UI/buttons/Button1";

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
      <div className={styles.inputFieldsCont}>
        <Input1
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <Input1
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      <div className={styles.buttonsCont}>
        <Button1 type="submit">Sign in</Button1>

        <Button1 onClick={() => navigate("/sign-up")}>Sign up</Button1>
      </div>
    </form>
  );
}

export default SignInForm;
