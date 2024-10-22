import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirectHook(isLogged: boolean) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      console.log("user not logged in!");
      navigate("/login");
    }
    return () => {};
  }, []);

  return null;
}

export default useRedirectHook;
