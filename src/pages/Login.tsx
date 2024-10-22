import "../styles/loginregister.css";
import React, { SyntheticEvent, useState } from "react";
import { createUser } from "../services/userCalls";

function Login() {
  const [page, setPage] = useState<string>("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // handle switching between register and login
  const handleGoLogin = (): void => {
    setPage("login");
  };

  // handle switching from login to register
  const handleGoRegister = (): void => {
    setPage("register");
  };

  const handleRegisterClick = async () => {
    const response = await createUser(username, password, confirmPassword);
    console.log(response);
  };

  const handleRegUname = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setUsername(inputElement.value);
    console.log(inputElement.value);
  };

  const handleRegPw = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setPassword(inputElement.value);
    console.log(inputElement.value);
  };

  const handleRegPwCon = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setConfirmPassword(inputElement.value);
    console.log(inputElement.value);
  };

  return (
    <div className="loginContainer">
      <div
        className={
          page === "login" ? "loginMainDiv active" : "loginMainDiv inactive"
        }
      >
        <div className="loginHeader">Login</div>
        <div className="loginForm">
          <form onSubmit={(e) => e.preventDefault()} className="loginForm">
            <input
              type="text"
              className="welcomeInput"
              placeholder="username"
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="password"
            ></input>
            <button className="welcomeButton">Login</button>
          </form>
          <button className="welcomeButton">Guest Login</button>
          <button className="welcomeButton" onClick={handleGoRegister}>
            I want to create a new account
          </button>
        </div>
      </div>

      <div
        className={
          page === "register"
            ? "registerMainDiv active"
            : "registerMainDiv inactive"
        }
      >
        <div className="registerHeader">Register</div>
        <div className="registerForm">
          <form onSubmit={(e) => e.preventDefault()} className="registerForm">
            <input
              type="text"
              className="welcomeInput"
              placeholder="Username"
              onChange={(e) => handleRegUname(e)}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="Password"
              onChange={(e) => handleRegPw(e)}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="Confirm password"
              onChange={(e) => handleRegPwCon(e)}
            ></input>
            <button
              className="welcomeButton"
              onClick={() => handleRegisterClick()}
            >
              Register
            </button>
          </form>
          <button className="welcomeButton" onClick={handleGoLogin}>
            I have an account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
