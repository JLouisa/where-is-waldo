import { Link } from "react-router-dom";
import logo from "/favicon.png";
import characterArr from "../../database/fakeDB";
import Stopwatch from "../stopwatch";
import PropTypes from "prop-types";
import useGlobalStore from "../../state/useGlobalStore";

function Nav({ state, dispatch }) {
  const { rickMortyGame, setRickMortyGame } = useGlobalStore();

  return (
    <nav>
      <div className="nav1">
        <img src={logo} alt="loupe icon" className="logoImage"></img>
        <h1>Where is Waldo Game</h1>
        {/* <div className="menuLinks">
          <a href="">Leaderboard</a>
          <a href="">Game Rules</a>
        </div> */}
      </div>
      <div className="nav2">
        <Link to="/home" id="logoHome">
          <img src={logo} alt="loupe icon" className="logoImage"></img>
        </Link>
        <h1>{rickMortyGame ? "Where is Rick & Morty Game" : "Where is Waldo Game"}</h1>
        {state.startGame ? (
          <div className="charactersDiv">
            <Stopwatch state={state} dispatch={dispatch} />
            {/* </div>
          <div> */}
            {characterArr.map((character, index) => {
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
};

export default Nav;
