import formattedDate from "../utils/formattedDate";
import { leaderboardArr } from "../database/fakeDB";

function Leaderboard() {
  return (
    <div className="leaderboardInfo" style={leaderboardInfoStyle}>
      <div>
        {leaderboardArr.length > 0 ? (
          <>
            <h2 style={h2Style}>Disney Waldo</h2>
            <ol>
              {leaderboardArr.map((player) => {
                return (
                  <li className="playerCards" style={playerCardsStyle} key={player._id}>
                    <p>
                      Player: <strong>{player.name}</strong>
                    </p>
                    <p>Score: {player.score}s</p>
                    <p>Date: {formattedDate(player.date)}</p>
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
        {leaderboardArr.length > 0 ? (
          <>
            <h2 style={h2Style}>Pokemon Waldo</h2>
            <ol>
              {leaderboardArr.map((player) => {
                return (
                  <li className="playerCards" style={playerCardsStyle} key={player._id}>
                    <p>
                      Player: <strong>{player.name}</strong>
                    </p>
                    <p>Score: {player.score}s</p>
                    <p>Date: {formattedDate(player.date)}</p>
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
        {leaderboardArr.length > 0 ? (
          <>
            <h2 style={h2Style}>Rick & Morty Waldo</h2>
            <ol>
              {leaderboardArr.map((player) => {
                return (
                  <li className="playerCards" style={playerCardsStyle} key={player._id}>
                    <p>
                      Player: <strong>{player.name}</strong>
                    </p>
                    <p>Score: {player.score}s</p>
                    <p>Date: {formattedDate(player.date)}</p>
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
