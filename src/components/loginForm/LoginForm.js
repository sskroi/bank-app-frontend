import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss"
import Input1 from "../UI/inputs/Input1";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormData({
      username: "",
      password: "",
    })

    console.log("Form submitted:\nUsername: " + formData.username + "\n" + "Password: " + formData.password);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginFormCont}>

      <div className={styles.inputFieldsCont}>
        <Input1 type="text" placeholder="Username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
        <Input1 type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
      </div>

      <ButtonsTable />
    </form>
  )
}

function ButtonsTable() {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonsCont}>
      <button type="submit" className={styles.btn}>Log in</button>

      <button type="button" onClick={() => navigate("/sign-up")} className={styles.btn}>Sign up</button>
    </div>
  )
}

export default LoginForm;
