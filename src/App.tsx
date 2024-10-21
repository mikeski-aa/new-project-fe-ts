import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState<number>(0);

  const router = createBrowserRouter([
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
