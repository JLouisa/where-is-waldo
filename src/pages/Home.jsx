import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import rickMortyIcon from "../assets/icons/rickAndMorty.png";
import pokemonIcon from "../assets/icons/pokeball.png";
import disneyIcon from "../assets/icons/disney.png";
import { ACTION } from "../state/reducer";
import { useEffect } from "react";
import useGlobalStore from "../state/useGlobalStore";

function Home({ dispatch }) {
  const { setGetTime } = useGlobalStore();
  const startTheGame = (map) => {
    dispatch({ type: ACTION.startGame });
    dispatch({ type: map });
  };

  useEffect(() => {
    setGetTime(0);
  }, []);

  const showIcons = () => {
    const disneyMap = { theState: ACTION.MAPDISNEY, icon: disneyIcon, theAlt: "Disney icon", difficulty: "Easy" };
    const ricAndMortyMap = {
      theState: ACTION.MAPRM,
      icon: rickMortyIcon,
      theAlt: "Rick and Morty black icon",
      difficulty: "Medium",
    };
    const pokemonMap = { theState: ACTION.MAPPOKE, icon: pokemonIcon, theAlt: "Pokemon icon", difficulty: "Hard" };

    const theMaps = [disneyMap, ricAndMortyMap, pokemonMap];
    return (
      <>
        {theMaps.map((map) => {
          return (
            <>
              <div className="mapCardIcons">
                <img src={map.icon} alt={map.theAlt} className="mapIcons"></img>
                <span style={colorStyle(difficultyStyle[map.difficulty])}>{map.difficulty}</span>
                <Link to="/map">
                  <button
                    className="btn"
                    onClick={() => {
                      startTheGame(map.theState);
                    }}
                  >
                    Play
                  </button>
                </Link>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="theChoiceMain">
      <div className="mapChooseDiv">{showIcons()}</div>
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

const colorStyle = (level) => {
  return {
    color: level,
  };
};

const difficultyStyle = {
  Easy: "green",
  Medium: "orange",
  Hard: "red",
};
