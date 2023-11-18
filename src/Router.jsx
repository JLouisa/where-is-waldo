import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Map from "./pages/Map.jsx";
import GameRules from "./pages/GameRules.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import TestPage from "./pages/TestPage.jsx";
import ScoreForm from "./pages/ScoreForm.jsx";
import Home from "./pages/Home.jsx";
import { useReducer } from "react";
import { reducer } from "./state/reducer.js";
import { useState } from "react";
import characterArr from "./database/fakeDB";

const Router = () => {
  const [state, dispatch] = useReducer(reducer, { isRunning: false, startGame: false, gameGenre: "" });
  const [getTime, setGetTime] = useState(0);
  const [characters, setCharacters] = useState(characterArr);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App state={state} dispatch={dispatch} characters={characters} />,
      children: [
        { path: "", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home state={state} dispatch={dispatch} /> },
        {
          path: "/map",
          element: (
            <Map
              state={state}
              dispatch={dispatch}
              setGetTime={setGetTime}
              characters={characters}
              setCharacters={setCharacters}
            />
          ),
        },
        { path: "/score-form", element: <ScoreForm getTime={getTime} /> },
        { path: "/leaderboard", element: <Leaderboard /> },
        { path: "/game-rules", element: <GameRules /> },
        { path: "/test", element: <TestPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export { Router };
