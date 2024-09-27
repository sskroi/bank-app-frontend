import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss"
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
    <form onSubmit={handleSubmit} className="LoginFormCont">

      <div className="InputFieldsCont">
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
    <div className="ButtonsCont">
      <button type="submit" className="Btn">Log in</button>

      <button type="button" onClick={() => navigate("/register")} className="Btn">Sign up</button>
    </div>
  )
}

export default LoginForm;
