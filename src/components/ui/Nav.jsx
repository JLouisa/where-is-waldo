import { Link } from "react-router-dom";
import logo from "/favicon.png";
import PropTypes from "prop-types";
import { ACTION } from "../../state/reducer";

function Nav({ state, dispatch, characters }) {
  const titleChosen = () => {
    if (state.gameGenre === "mixed") return "Where is Disney Game";
    if (state.gameGenre === "poke") return "Where is the Pokemon Game";
    if (state.gameGenre === "rm") return "Where is Rick & Morty Game";
    return "Where is Waldo Game";
  };

  const resetClicked = () => {
    dispatch({ type: ACTION.startGame });
    dispatch({ type: ACTION.stopGame });
    dispatch({ type: ACTION.HOME });
  };

  return (
    <nav>
      <div className="nav1">
        <img src={logo} alt="loupe icon" className="logoImage"></img>
        <h1>Where is Waldo Game</h1>
      </div>
      <div className="nav2">
        <Link to="/home" id="logoHome" onClick={resetClicked}>
          <img src={logo} alt="loupe icon" className="logoImage"></img>
        </Link>
        <h1>{titleChosen()}</h1>
        {state.startGame ? (
          <div className="charactersDiv">
            <div id="stopwatch">0 seconds</div>
            {characters.map((character, index) => {
              return <img key={index} src={character.iconImg} className="characterImg"></img>;
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
