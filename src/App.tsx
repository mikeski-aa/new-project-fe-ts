import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState<number>(0);

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
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
