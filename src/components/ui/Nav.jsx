import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "/favicon.png";
import { ACTION } from "../../state/reducer";
import Stopwatch from "../Stopwatch";

function Nav({ state, dispatch, characters }) {
  const titleChosen = () => {
    if (state.gameGenre === "disneyMap") return "Where is Disney Game";
    if (state.gameGenre === "pokemonMap") return "Where is the Pokemon Game";
    if (state.gameGenre === "rickMortyMap") return "Where is Rick & Morty Game";
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
            <Stopwatch />
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
