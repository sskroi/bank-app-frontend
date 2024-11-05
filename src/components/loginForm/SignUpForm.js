import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import Input1 from "../UI/inputs/Input1";

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
      <button type="submit" className={styles.btn}>
        Sign up
      </button>

      <button type="button" onClick={handleBackToLoginClick} className={styles.btn}>
        Back to login
      </button>
    </div>
  );
}

export default SignUpForm;
