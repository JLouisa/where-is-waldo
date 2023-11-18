import formattedDate from "../utils/formattedDate";
// import { leaderboardArr } from "../database/fakeDB";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const { getFetch } = useFetch();

  useEffect(() => {
    const getLeaderboard = async () => {
      const data = await getFetch("/leaderboard");
      console.log("data");
      console.log(data);
      console.log(data[0]);
      console.log(data[1]);
      console.log(data[2]);
      setLeaderboard(data);
    };
    getLeaderboard();
    return setLeaderboard([]);
  }, []);

  if (leaderboard.length === 0) return <div>Loading...</div>;

  return (
    <div className="leaderboardInfo" style={leaderboardInfoStyle}>
      <div>
        {leaderboard && leaderboard.length > 0 && leaderboard[2] !== undefined ? (
          <>
            <h2 style={h2Style}>Disney Waldo</h2>
            <ol>
              {leaderboard[2].map((player) => {
                return (
                  <li className="playerCards" style={playerCardsStyle} key={player._id}>
                    <p>
                      Player: <strong>{player.player}</strong>
                    </p>
                    <p>Score: {player.score}s</p>
                    <p>Date: {formattedDate(player.createdDate)}</p>
                  </li>
                );
              })}
            </ol>
          </>
        ) : (
          "Be the first the beat the level"
        )}
      </div>
      <div>
        {leaderboard.length > 0 && leaderboard[1] !== undefined ? (
          <>
            <h2 style={h2Style}>Pokemon Waldo</h2>
            <ol>
              {leaderboard[1].map((player) => {
                return (
                  <li className="playerCards" style={playerCardsStyle} key={player._id}>
                    <p>
                      Player: <strong>{player.player}</strong>
                    </p>
                    <p>Score: {player.score}s</p>
                    <p>Date: {formattedDate(player.createdDate)}</p>
                  </li>
                );
              })}
            </ol>
          </>
        ) : (
          "Be the first the beat the level"
        )}
      </div>
      <div>
        {leaderboard.length > 0 && leaderboard[0] !== undefined ? (
          <>
            <h2 style={h2Style}>Rick & Morty Waldo</h2>
            <ol>
              {leaderboard[0].map((player) => {
                return (
                  <li className="playerCards" style={playerCardsStyle} key={player._id}>
                    <p>
                      Player: <strong>{player.player}</strong>
                    </p>
                    <p>Score: {player.score}s</p>
                    <p>Date: {formattedDate(player.createdDate)}</p>
                  </li>
                );
              })}
            </ol>
          </>
        ) : (
          "Be the first the beat the level"
        )}{" "}
      </div>
    </div>
  );
}

export default Leaderboard;

const leaderboardInfoStyle = {
  display: "flex",
  // flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const playerCardsStyle = {
  maxEidth: "500px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  margin: "1em",
  padding: "1em 2em",
};

const h2Style = {
  textAlign: "center",
};
