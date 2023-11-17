import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import rickMortyIcon from "../assets/rickAndMorty.png";
import pokemonIcon from "../assets/pokeball.png";
import disneyIcon from "../assets/disney.png";
import useGlobalStore from "../state/useGlobalStore";
import { ACTION } from "../state/reducer";

function Home({ /*state,*/ dispatch }) {
  const { rickMortyGame, setRickMortyGame } = useGlobalStore();

  const startTheGameRM = () => {
    dispatch({ type: ACTION.startGame });
    setRickMortyGame(true);
  };

  return (
    <>
      <div className="mapChooseDiv">
        <div className="mapCardIcons">
          <img src={disneyIcon} alt="Disney icon" className="mapIcons"></img>
          <Link to="/map">
            <button className="btn" onClick={startTheGameRM}>
              Play
            </button>
          </Link>
        </div>
        <div className="mapCardIcons">
          <img src={pokemonIcon} alt="Pokemon icon" className="mapIcons"></img>
          <Link to="/map">
            <button className="btn" onClick={startTheGameRM}>
              Play
            </button>
          </Link>
        </div>
        <div className="mapCardIcons">
          <img src={rickMortyIcon} alt="Rick and Morty black icon" className="mapIcons"></img>
          <Link to="/map">
            <button className="btn" onClick={startTheGameRM}>
              Play
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  setStartGame: PropTypes.func,
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Home;
