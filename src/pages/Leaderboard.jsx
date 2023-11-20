import formattedDate from "../utils/formattedDate";
// import { leaderboardArr } from "../database/fakeDB";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(0);
  const { getFetch } = useFetch();

  useEffect(() => {
    const getLeaderboard = async () => {
      const data = await getFetch("/leaderboard");
      setLeaderboard(data);
    };
    getLeaderboard();
    return setLeaderboard([]);
  }, []);

  const theLeaderboard = () => {
    return (
      <>
        {leaderboard.map((theMap) => {
          return (
            <div key={theMap.name}>
              <h2 style={h2Style}>{theMap.name}</h2>
              <ol>
                {theMap.map.length > 0
                  ? theMap.map.map((player) => {
                      return (
                        <li className="playerCards" style={playerCardsStyle} key={player._id}>
                          <p>
                            Player: <strong>{player.player}</strong>
                          </p>
                          <p>Score: {player.score}s</p>
                          <p>Date: {formattedDate(player.createdDate)}</p>
                        </li>
                      );
                    })
                  : "Be the first the beat the level"}
              </ol>
            </div>
          );
        })}
      </>
    );
  };

  if (leaderboard === 0 || leaderboard === undefined) return <Loading />;

  return (
    <>
      <div style={h2Style}>
        <Link to="/home">
          <button className="btn" style={h2Style}>
            Play a game
          </button>
        </Link>
      </div>
      <div className="leaderboardInfo" style={leaderboardInfoStyle}>
        {theLeaderboard()}
      </div>
    </>
  );
}

export default Leaderboard;

const leaderboardInfoStyle = {
  display: "flex",
  justifyContent: "center",
  // alignItems: "center",
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
