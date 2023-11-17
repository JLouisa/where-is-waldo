import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Map from "./pages/Map.jsx";
import beth from "./assets/characters/beth.png";
import jerry from "./assets/characters/jerry.png";
import summer from "./assets/characters/summer.png";
import GameRules from "./pages/GameRules.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import TestPage from "./pages/TestPage.jsx";
import { useState } from "react";

// import useBearStore from "./useBearStore";

const Router = () => {
  const [isRunning, setIsRunning] = useState(false);
  const characterArr = [beth, jerry, summer];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App characterArr={characterArr} isRunning={isRunning} setIsRunning={setIsRunning} />,
      children: [
        { path: "", element: <Navigate to="/map" /> },
        { path: "/test", element: <TestPage /> },
        { path: "/map", element: <Map isRunning={isRunning} setIsRunning={setIsRunning} /> },
        { path: "/game-rules", element: <GameRules /> },
        { path: "/leaderboard", element: <Leaderboard /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
