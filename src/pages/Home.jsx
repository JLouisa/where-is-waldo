import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import rickMortyIcon from "../assets/icons/rickAndMorty.png";
import pokemonIcon from "../assets/icons/pokeball.png";
import disneyIcon from "../assets/icons/disney.png";
import { ACTION } from "../state/reducer";
import characterArr from "../database/fakeDB";

function Home({ dispatch, setCharacters }) {
  const startTheGame = (map) => {
    dispatch({ type: ACTION.startGame });
    dispatch({ type: map });
    setCharacters(characterArr);
  };

  return (
    <div className="theChoiceMain">
      <div className="mapChooseDiv">
        <div className="mapCardIcons">
          <img src={disneyIcon} alt="Disney icon" className="mapIcons"></img>
          <Link to="/map">
            {/*Needs to change*/}
            <button
              className="btn"
              onClick={() => {
                startTheGame(ACTION.MIXED);
              }}
            >
              Play
            </button>
          </Link>
        </div>
        <div className="mapCardIcons">
          <img src={pokemonIcon} alt="Pokemon icon" className="mapIcons"></img>
          <Link to="/map">
            {/*Needs to change*/}
            <button
              className="btn"
              onClick={() => {
                startTheGame(ACTION.GAMEPOKE);
              }}
            >
              Play
            </button>
          </Link>
        </div>
        <div className="mapCardIcons">
          <img src={rickMortyIcon} alt="Rick and Morty black icon" className="mapIcons"></img>
          <Link to="/map">
            <button
              className="btn"
              onClick={() => {
                startTheGame(ACTION.GAMERM);
              }}
            >
              Play
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  setStartGame: PropTypes.func,
  setCharacters: PropTypes.func,
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Home;
