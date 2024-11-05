import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./authForms.module.scss";
import Input1 from "../UI/inputs/Input1";
import Button1 from "../UI/buttons/Button1";

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      "Form submitted:\nUsername: " +
        formData.username +
        "\n" +
        "Password: " +
        formData.password,
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginFormCont}>
      <InputsTable handleChange={handleChange} />
      <ButtonsTable />
    </form>
  );
}

function InputsTable({ handleChange }) {
  return (
    <div className="InputFieldsCont">
      <Input1 type="text" placeholder="Username" />
    </div>
  );
}

function ButtonsTable() {
  const navigate = useNavigate();

  const handleBackToLoginClick = (event) => {
    navigate("/sign-in");
  };

  return (
    <div className={styles.buttonsCont}>
      <Button1 type="submit">Sign up</Button1>

      <Button1 type="button" onClick={handleBackToLoginClick}>
        Back to login
      </Button1>
    </div>
  );
}

export default SignUpForm;
