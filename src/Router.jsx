import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Map from "./pages/Map.jsx";
import GameRules from "./pages/GameRules.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import ScoreForm from "./pages/ScoreForm.jsx";
import Home from "./pages/Home.jsx";
import { useReducer } from "react";
import { reducer } from "./state/reducer.js";
import { useState } from "react";

const Router = () => {
  const [state, dispatch] = useReducer(reducer, { startGame: false, gameGenre: "home" });
  const [characters, setCharacters] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App state={state} dispatch={dispatch} characters={characters} />,
      children: [
        { path: "", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home state={state} dispatch={dispatch} setCharacters={setCharacters} /> },
        { path: "/score-form", element: <ScoreForm state={state} /> },
        { path: "/leaderboard", element: <Leaderboard /> },
        { path: "/game-rules", element: <GameRules /> },
        {
          path: "/map",
          element: <Map state={state} dispatch={dispatch} characters={characters} setCharacters={setCharacters} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
