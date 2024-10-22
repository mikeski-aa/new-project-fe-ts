import { useContext } from "react";
import useRedirectHook from "../hooks/useRedierctHook";
import "../styles/home.css";
import { UserContext } from "../App";

function Home() {
  const userContext = useContext(UserContext);
  //   useRedirectHook(userContext.isLogged);
  return (
    <>
      <h1>Homepage</h1>
      <p>Only visible if logged in</p>
    </>
  );
}

export default Home;
