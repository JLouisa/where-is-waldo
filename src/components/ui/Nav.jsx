import { Link } from "react-router-dom";
import logo from "/favicon.png";
import PropTypes from "prop-types";

function Nav({ state, characters }) {
  return (
    <nav>
      <div className="nav1">
        <img src={logo} alt="loupe icon" className="logoImage"></img>
        <h1>Where is Waldo Game</h1>
      </div>
      <div className="nav2">
        <Link to="/home" id="logoHome">
          <img src={logo} alt="loupe icon" className="logoImage"></img>
        </Link>
        <h1>{state.gameGenre === "rm" ? "Where is Rick & Morty Game" : "Where is Waldo Game"}</h1>
        {state.startGame ? (
          <div className="charactersDiv">
            <div id="stopwatch">0 seconds</div>
            {characters.map((character, index) => {
              return <img key={index} src={character.url} className="characterImg"></img>;
            })}
          </div>
        ) : (
          <div className="menuLinks">
            <Link to="/leaderboard">
              <span>Leaderboard</span>
            </Link>
            <Link to="/game-rules">
              <span>Game Rules</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

Nav.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func,
  characters: PropTypes.array,
};

export default Nav;
