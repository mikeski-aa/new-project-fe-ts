import { createContext, useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

interface User {
  username: string;
  id: number;
}

interface UserContextInt {
  user: User;
  setUser: (user: User | null) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean | null) => void;
}

export const UserContext = createContext<UserContextInt>();

function App() {
  const [user, setUser] = useState<User | null>();
  const [isLogged, setIsLogged] = useState<boolean>(false);

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
      <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
        <RouterProvider router={router}></RouterProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
