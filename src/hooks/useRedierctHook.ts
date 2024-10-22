import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function useRedirectHook() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userContext.isLogged) {
      console.log("user not logged in!");
      navigate("/login");
    } else {
      return;
    }
    return () => {};
  }, []);

  return null;
}

export default useRedirectHook;
