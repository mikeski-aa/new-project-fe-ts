import "../styles/loginregister.css";
import React, { useState } from "react";
import { createUser } from "../services/userCalls";

function Login() {
  const [page, setPage] = useState<string>("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleGoLogin = (): void => {
    setPage("login");
  };

  const handleGoRegister = (): void => {
    setPage("register");
  };

  const handleRegisterClick = async () => {
    await createUser(username, password, confirmPassword);
  };

  const handleRegUname = (e) => {
    setUsername(e.target.value)
  }

  const handleRegPw = (e) => {
    
  }

  const handleRegPw = (e) => {
    e.
  }

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
              onChange={(e)=> handleRegUname}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="Password"
              onChange={(e)=> handleRegPw}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="Confirm password"
              onChange={(e)=> handleRegPwConf}
            ></input>
            <button className="welcomeButton">Register</button>
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
