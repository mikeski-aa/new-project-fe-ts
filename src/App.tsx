import { createContext, useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { loginCheck } from "./services/userCalls";
import {
  UserContextInt,
  IUser,
  IStore,
} from "./interfaces/userContextInterfaces";
import Store from "./pages/Store";
import { getStores } from "./services/storeCalls";
import Finance from "./pages/Finance";

// for some reason we have to declare the default values of the context in Typescript?
// i dont quite understand why
export const UserContext = createContext<UserContextInt>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  theme: "light",
  setTheme: () => {},
  loading: true,
  setLoading: () => {},
  stores: [],
  setStores: () => {},
});

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");
  const [loading, setLoading] = useState<boolean>(true);
  const [stores, setStores] = useState<IStore[]>([]);

  useEffect(() => {
    //
    const checkForLogin = async () => {
      const checkResult = await loginCheck();

      setLoading(false);
      //
      //

      if (checkResult.errorPresent) {
        setIsLogged(false);
        return;
      }

      if (checkResult.user) {
        setIsLogged(true);

        // get store data
        const response = await getStores(checkResult.user.id);
        if (!response.errorPresent && response.stores) {
          setStores(response.stores);
          //

          setUser(checkResult.user);

          return;
        }
      }
    };

    checkForLogin();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
        },
        {
          path: "/finance",
          element: <Finance></Finance>,
        },
        {
          path: "/store/:id",
          element: <Store></Store>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
  ]);

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          isLogged,
          setIsLogged,
          theme,
          setTheme,
          loading,
          setLoading,
          stores,
          setStores,
        }}
      >
        <RouterProvider router={router}></RouterProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
