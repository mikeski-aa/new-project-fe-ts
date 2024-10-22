import "../styles/loginregister.css";
import React, { SyntheticEvent, useContext, useState } from "react";
import { createUser, loginUser } from "../services/userCalls";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
  const [page, setPage] = useState<string>("login");
  const [regUsername, setRegUsername] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>("");
  const [logUsername, setLogUsername] = useState<string>("");
  const [logPassword, setLogPassword] = useState<string>("");
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // handle switching between register and login forms
  const handleGoLogin = (): void => {
    setPage("login");
  };

  // handle switching from login to register forms
  const handleGoRegister = (): void => {
    setPage("register");
  };

  // Input handlers for registering
  const handleRegUname = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setRegUsername(inputElement.value);
    console.log(inputElement.value);
  };

  const handleRegPw = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setRegPassword(inputElement.value);
    console.log(inputElement.value);
  };

  const handleRegPwCon = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setRegConfirmPassword(inputElement.value);
    console.log(inputElement.value);
  };

  // input handlers for login
  const handleLogUsername = (e: SyntheticEvent): void => {
    const inputElement = e.target as HTMLInputElement;
    setLogUsername(inputElement.value);
  };

  const handleLogPassword = (e: SyntheticEvent): void => {
    const inputElement = e.target as HTMLInputElement;
    setLogPassword(inputElement.value);
  };

  // handle register click
  const handleRegisterClick = async () => {
    const response = await createUser(
      regUsername,
      regPassword,
      regConfirmPassword
    );

    if (response.errorPresent === true) {
      // if error is present, we don't proceed with register and inform user of error
      return console.log("inform error");
    } else {
      // redirect to login
      setPage("login");
    }
    console.log(response);
  };

  // handle login click
  const handleLoginClick = async () => {
    const response = await loginUser(logUsername, logPassword);
    if (response.errorPresent === true) {
      // if error is present, we don't proceed with register and inform user of error
      return console.log("inform error");
    } else {
      console.log("i should navigate away");
      // redirect to login
      console.log(response);
      userContext.setUser(response.user);
      userContext.setIsLogged(true);
      navigate("/");
    }
    console.log(response);
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
              onChange={(e) => handleLogUsername(e)}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="password"
              onChange={(e) => handleLogPassword(e)}
            ></input>
            <button
              className="welcomeButton"
              onClick={() => handleLoginClick()}
            >
              Login
            </button>
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
