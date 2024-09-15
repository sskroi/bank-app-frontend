import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss"

function LoginForm() {
    const [formData, setFormData] = useState({
        "username": '',
        "password": ''
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Form submitted:\nUsername: " + formData.username + "\n" + "Password: " + formData.password);
    }

    return (
        <form onSubmit={handleSubmit} className="LoginFormCont">
            <InputsTable handleChange={handleChange} />
            <ButtonsTable />
        </form>
    )
}

function InputsTable({ handleChange }) {
    return (
        <div className="InputFieldsCont">
            <input type="text" className="InputField" placeholder="Username" name="username" onChange={handleChange}></input>

            <input type="password" className="InputField" placeholder="Password" name="password" onChange={handleChange}></input>
        </div>
    )
}

function ButtonsTable() {
    const navigate = useNavigate();

    const handleSignUpClick = (event) => {
        navigate("/register");
    }

    return (
        <div className="ButtonsCont">
            <button type="submit" className="Btn">Login</button>

            <button type="button" onClick={handleSignUpClick} className="Btn">Sign up</button>
        </div>
    )
}

export default LoginForm;
