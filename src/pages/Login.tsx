import "../styles/loginregister.css";
import React, { SyntheticEvent, useContext, useState } from "react";
import { createUser, loginUser, guestLogin } from "../services/userCalls";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { validateRegisterInput } from "../utils/validateInput";

function Login() {
  const [page, setPage] = useState<string>("login");
  const [regUsername, setRegUsername] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>("");
  const [logUsername, setLogUsername] = useState<string>("");
  const [logPassword, setLogPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const [regError, setRegError] = useState<boolean>(false);
  const [regErrorArray, setRegErrorArray] = useState<string[]>([]);

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // handle switching between register and login forms
  const handleGoLogin = (): void => {
    setRegError(false);
    setRegErrorArray([]);
    setRegUsername("");
    setRegPassword("");
    setRegConfirmPassword("");
    setPage("login");
  };

  // handle switching from login to register forms
  const handleGoRegister = (): void => {
    setLoginError(false);
    setLogUsername("");
    setLogPassword("");
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
  const handleRegisterClick = async (): Promise<void> => {
    if (
      validateRegisterInput(
        regUsername,
        regPassword,
        regConfirmPassword,
        setRegError,
        setRegErrorArray
      )
    ) {
      return;
    }

    const response = await createUser(
      regUsername,
      regPassword,
      regConfirmPassword
    );

    // this needs to check that username being entered is not already taken by another user
    // if we get to here it only means that we have one error, which is username taken already
    if (response.errorPresent === true) {
      // if error is present, we don't proceed with register and inform user of error
      setRegError(true);
      setRegErrorArray(["Username already taken"]);
      return;
    } else {
      setRegUsername("");
      setRegPassword("");
      setRegConfirmPassword("");
      // redirect to login
      setPage("login");
    }
    console.log(response);
  };

  // handle login click
  const handleLoginClick = async (): Promise<void> => {
    const response = await loginUser(logUsername, logPassword);
    if (response.errorPresent === true) {
      // if error is present, we don't proceed with register and inform user of error
      setLoginError(true);
      return console.log("inform error");
    } else {
      setLoginError(false);
      console.log("i should navigate away");
      // redirect to login
      console.log(response);
      userContext.setUser(response.user);
      userContext.setIsLogged(true);
      navigate("/");
    }
    console.log(response);
  };

  // handle guest login click
  // needs to call service to create guest instance
  const handleGuestClick = async () => {
    const response = await guestLogin();
    setLoginError(false);
    userContext.setUser(response.user);
    userContext.setIsLogged(true);
    navigate("/");
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
              value={logUsername}
              maxLength={15}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="password"
              onChange={(e) => handleLogPassword(e)}
              value={logPassword}
              maxLength={30}
            ></input>
            <button
              className="welcomeButton"
              onClick={() => handleLoginClick()}
            >
              Login
            </button>
          </form>
          <button className="welcomeButton" onClick={handleGuestClick}>
            Guest Login
          </button>
          <button className="welcomeButton" onClick={handleGoRegister}>
            I want to create a new account
          </button>
        </div>
        <div
          className={loginError ? "loginErrorBox showError" : "loginErrorBox"}
        >
          Username or password provided is incorrect
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
              value={regUsername}
              maxLength={15}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="Password"
              onChange={(e) => handleRegPw(e)}
              value={regPassword}
              maxLength={30}
            ></input>
            <input
              type="password"
              className="welcomeInput"
              placeholder="Confirm password"
              onChange={(e) => handleRegPwCon(e)}
              value={regConfirmPassword}
              maxLength={30}
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
        <div className={regError ? "regErrorBox showError" : "regErrorBox"}>
          {regErrorArray.map((item, index) => (
            <div key={index} className="errorItem">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;
