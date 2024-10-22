import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";

function Layout() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="Nav">
        <button className="navBtn" onClick={() => handleLogoutClick()}>
          Logout
        </button>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
