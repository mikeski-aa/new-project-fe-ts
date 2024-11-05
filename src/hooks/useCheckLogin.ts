import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { loginCheck } from "../services/userCalls";

function useCheckLogin() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const checkForLogin = async () => {
      const checkResult = await loginCheck();
      userContext.setLoading(false);

      if (checkResult.errorPresent) {
        userContext.setIsLogged(false);
        return;
      }

      userContext.setIsLogged(true);

      if (checkResult.user) {
        userContext.setUser(checkResult.user);

        return;
      }
    };

    checkForLogin();
  }, []);
}

export default useCheckLogin;
