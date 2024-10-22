import { Outlet } from "react-router-dom";
import "../styles/layout.css";

function Layout() {
  return (
    <>
      <div className="Nav"></div>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;
