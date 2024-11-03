import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useContext } from "react";
import { UserContext } from "../App";
import useRedirectHook from "../hooks/useRedierctHook";

function Layout() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // useCheckLogin();
  // console.log(userContext);
  useRedirectHook(userContext.isLogged, userContext.loading);

  const handleLogoutClick = () => {
    // reset store and user info
    userContext.setUser(null);
    userContext.setStores([]);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleFinanceClick = () => {
    navigate("/finance");
  };

  const handleSettingsClick = () => {};

  if (userContext.loading) {
    return (
      <>
        <h1>Loading</h1>
        <p>Please be patient our servers are waking up</p>
      </>
    );
  }

  return (
    <>
      <div className="nav">
        <button className="navBtn" onClick={() => handleHomeClick()}>
          Stores
        </button>
        <button className="navBtn" onClick={() => handleFinanceClick()}>
          Finance
        </button>
        {/* <button className="navBtn" onClick={() => handleSettingsClick()}>
          Settings
        </button> */}
        <button className="navBtn" onClick={() => handleLogoutClick()}>
          Logout for user: {userContext.user?.username}
        </button>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
