import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useContext } from "react";
import { UserContext } from "../App";
import useRedirectHook from "../hooks/useRedierctHook";
import useCheckLogin from "../hooks/useCheckLogin";

function Layout() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useCheckLogin();
  useRedirectHook(userContext.isLogged);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      <div className="Nav">
        <button className="navBtn" onClick={() => handleLogoutClick()}>
          Logout for user: {userContext.user?.username}
        </button>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
