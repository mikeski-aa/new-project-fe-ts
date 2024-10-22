import { createContext, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

interface IUser {
  username: string;
  id: number;
}

interface UserContextInt {
  user: IUser | null | undefined;
  setUser: (user: IUser | null | undefined) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const UserContext = createContext<UserContextInt>({
  user: undefined,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  theme: "light",
  setTheme: () => {},
});

function App() {
  const [user, setUser] = useState<IUser | null | undefined>();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Home></Home>,
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
        value={{ user, setUser, isLogged, setIsLogged, theme, setTheme }}
      >
        <RouterProvider router={router}></RouterProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
