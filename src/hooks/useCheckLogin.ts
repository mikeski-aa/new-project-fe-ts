import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { loginCheck } from "../services/userCalls";

function useCheckLogin() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log("i ran ");
    const checkForLogin = async () => {
      console.log(userContext.isLogged);
      const checkResult = await loginCheck();
      userContext.setLoading(false);
      console.log(checkResult);

      if (checkResult.errorPresent) {
        userContext.setIsLogged(false);
        return console.log("yep no token found, error present");
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
