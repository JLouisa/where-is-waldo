import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "../App";
import Home from "./Home.jsx";
import beth from "../assets/characters/beth.png";
import jerry from "../assets/characters/jerry.png";
import summer from "../assets/characters/summer.png";
// import useBearStore from "./useBearStore";

const Router = () => {
  const characterArr = [beth, jerry, summer];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App characterArr={characterArr} />,
      children: [
        { path: "", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
