import map1 from "../assets/maps/mixed.png";
import map2 from "../assets/maps/pokemon.jpg";
import map3 from "../assets/maps/rickAndMorty.png";
import errorMap from "../assets/maps/error.jpg";
import loadingIcon from "../assets/markers/loading.svg";
import checkedIcon from "../assets/markers/checkbox-circle.svg";
import mistakeIcon from "../assets/markers/mistake-circle.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ACTION } from "../state/reducer";
import processor from "../utils/processCharacter";
import useFetch from "../hooks/useFetch";
import useGlobalStore from "../state/useGlobalStore";
import loadingImg from "../assets/tail-spin.svg";

function Map({ state, dispatch, characters, setCharacters }) {
  const [loading, setLoading] = useState(true);
  const { getFetch } = useFetch();
  const navigateTo = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const [clickArr, setClickArr] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [posXY, setPosXY] = useState([]);
  const [menuPosXY, setMenuPosXY] = useState([]);
  const clickedRef = useRef(0);
  const scoreRef = useRef(0);
  const { processCharacter } = processor();
  const { setIsRunning } = useGlobalStore();

  // Redirect if refreshed on map page
  useEffect(() => {
    if (state.gameGenre === "home") {
      navigateTo("/home");
    }
  });

  useEffect(() => {
    // fetch data when loading
    const getCharacters = async () => {
      if (loading) {
        const map = `/${state.gameGenre}`;
        const data = await getFetch("/character", map);
        const characterArr = processCharacter(data);
        setCharacters(characterArr);
        setLoading(false);
      }
      // Start stopwatch after loading
      if (!loading) {
        setIsRunning(true);
        return () => {
          setIsRunning(false);
        };
      }
    };
    getCharacters();
  }, [loading]);

  useEffect(() => {
    if (gameOver) navigateTo("/score-form");
    return () => setGameOver(false);
  }, [gameOver, navigateTo]);

  // Working;
  const getMarkPosXY = (offX = 0, offY = 0) => {
    const map = document.querySelector(".rickMortyMap");
    const rect = map.getBoundingClientRect();
    const e = window.event;
    const posX = e.clientX - rect.x - 40 + offX;
    const posY = e.clientY - rect.y - 40 + offY;
    let posXTarget = ((posX / rect.width) * 100).toFixed(0);
    let posYTarget = ((posY / rect.height) * 100).toFixed(0);
    if (offX && posXTarget > 95) posXTarget = 85;
    if (offY && posYTarget > 95) posYTarget = 75;
    const _posXY = { posX: posXTarget, posY: posYTarget, rect: rect };
    return _posXY;
  };

  const addMark = () => {
    const markXY = getMarkPosXY();
    // console.log(`PosX: ${markXY.posX}, PosY: ${markXY.posY}`);
    // const menuXY = getMarkPosXY();
    const menuXY = getMarkPosXY(70, 40);
    const theMark = {
      markXY: markXY,
      iconImg: loadingIcon,
    };
    const theMenu = {
      markXY: menuXY,
      iconImg: loadingIcon,
    };
    setPosXY(theMark);
    setMenuPosXY(theMenu);
    setClickArr([...clickArr, theMark]);
  };

  const cancelAddMark = () => {
    // Create a copy of clickArr with the last item removed
    const newArr = clickArr.slice(0, -1);

    // Set the new array and update the state
    setClickArr(newArr);
  };

  const ChooseCharacterHandler = (index) => {
    if (scoreRef.current < 3) {
      const charArr = [...characters];
      processorMark(charArr[index], charArr, index);
    }
  };

  const processorMark = (item, charArr, index) => {
    const theMarkXY = processorChosen(item, posXY);

    if (theMarkXY) {
      const newArr = [...clickArr];
      newArr[clickArr.length - 1].iconImg = checkedIcon;
      setClickArr(newArr);
      charArr.splice(index, 1);
      setCharacters(charArr);
      scoreRef.current++;
    } else {
      const newArr = [...clickArr];
      newArr[clickArr.length - 1].iconImg = mistakeIcon;
      setClickArr(newArr);
    }
    if (scoreRef.current >= 3) {
      setTimeout(() => {
        dispatch({ type: ACTION.stopGame });
        setGameOver(true);
      }, 750);
    }
  };

  const processorChosen = (item, _posXY) => {
    const foundChar = characters.find((char) => {
      return char.name === item.name;
    });

    if (foundChar) {
      const correctX = _posXY.markXY.posX >= foundChar.posX[0] && _posXY.markXY.posX <= foundChar.posX[1];
      const correctY = _posXY.markXY.posY >= foundChar.posY[0] && _posXY.markXY.posY <= foundChar.posY[1];

      if (correctX && correctY) {
        return true;
      }
      return false;
    }
    return false;
  };

  const calculateIconStyle = (click) => {
    return {
      position: "absolute",
      left: click.markXY.posX + "%",
      top: click.markXY.posY + "%",
    };
  };

  const calculateMenuStyle = () => {
    return {
      position: "absolute",
      left: menuPosXY.markXY.posX + "%",
      top: menuPosXY.markXY.posY + "%",
    };
  };

  //! Game Controller
  const gameController = (index) => {
    switch (clickedRef.current) {
      case 0: {
        addMark();
        clickedRef.current = 1;
        setShowMenu(true);
        break;
      }
      case 1: {
        ChooseCharacterHandler(index);
        clickedRef.current = 0;
        setShowMenu(false);
        break;
      }
      case 2: {
        cancelAddMark();
        clickedRef.current = 0;
        setShowMenu(false);
        break;
      }
      default: {
        //Do nothing
        break;
      }
    }
  };

  const mapChosen = () => {
    if (state.gameGenre === "disneyMap") return map1;
    if (state.gameGenre === "pokemonMap") return map2;
    if (state.gameGenre === "rickMortyMap") return map3;
    return errorMap;
  };

  if (loading) return <img style={centerDivStyle} src={loadingImg} alt="Loading Icon"></img>;

  return (
    <section>
      <div className="mapContainer">
        {/* Map */}
        <img
          src={mapChosen()}
          alt="Rick and more find crowd"
          className="rickMortyMap"
          onClick={() => {
            if (clickedRef.current === 1) clickedRef.current = 2;
            gameController();
          }}
        />
        {/* Clicked Icons */}
        {clickArr.map((clickedCharacter, index) => (
          <img
            key={index}
            className="icons"
            style={calculateIconStyle(clickedCharacter)}
            src={clickedCharacter.iconImg}
          />
        ))}
        {/* Character Menu */}
        {showMenu && (
          /*posXY.length > 0 &&*/ <div className="chooseDiv" style={calculateMenuStyle()}>
            {characters.map((character, index) => (
              <div
                className="characterDiv"
                key={index + character.name}
                onClick={() => {
                  gameController(index);
                }}
              >
                <img src={character.iconImg} alt={character.name} className="chooseCharacter" />
                <span>{character.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

Map.propTypes = {
  state: PropTypes.object,
  setGetTime: PropTypes.func,
  characters: PropTypes.array,
  setCharacters: PropTypes.func,
  dispatch: PropTypes.func,
};

export default Map;

const centerDivStyle = {
  textAlign: "center",
};
