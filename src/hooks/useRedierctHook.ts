import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// changing this hook to update on loading finishing is a bad workaround to the loading issue
function useRedirectHook(isLogged: boolean, loading: boolean) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (!isLogged) {
        console.log(isLogged);
        console.log("user not logged in! REDIRECTING TO LOGIN");
        navigate("/login");
      }
    }
  }, [loading]);

  return null;
}

export default useRedirectHook;
