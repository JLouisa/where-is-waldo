import formattedDate from "../utils/formattedDate";
import { leaderboardArr } from "../database/fakeDB";

function Leaderboard() {
  return (
    <div className="leaderboardInfo">
      {leaderboardArr.length > 0 ? (
        <ol>
          {leaderboardArr.map((player) => {
            return (
              <li className="playerCards" key={player._id}>
                <p>
                  Player: <strong>{player.name}</strong>
                </p>
                <p>Score: {player.score}s</p>
                <p>Date: {formattedDate(player.date)}</p>
              </li>
            );
          })}
        </ol>
      ) : (
        "Be the first the beat the level"
      )}
    </div>
  );
}

export default Leaderboard;
