import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// changing this hook to update on loading finishing is a bad workaround to the loading issue
function useRedirectHook(isLogged: boolean, loading: boolean) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (!isLogged) {
        navigate("/login");
      }
    }
  }, [loading]);

  return null;
}

export default useRedirectHook;
