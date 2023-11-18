import map1 from "../assets/maps/mixed.png";
import map2 from "../assets/maps/pokemon.jpg";
import map3 from "../assets/maps/rickAndMorty.png";
import errorMap from "../assets/maps/error.jpg";
import loadingIcon from "../assets/markers/loading.svg";
import checkedIcon from "../assets/markers/checkbox-circle.svg";
import mistakeIcon from "../assets/markers/mistake-circle.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import characterArr from "../database/fakeDB";
import Stopwatch from "../utils/stopwatch";
import PropTypes from "prop-types";
import { ACTION } from "../state/reducer";

function Map({ state, dispatch, setGetTime, characters, setCharacters }) {
  const theStopWatch = Stopwatch();
  const navigateTo = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const [clickArr, setClickArr] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [posXY, setPosXY] = useState([]);
  const clickedRef = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    theStopWatch.start();
    return () => {
      setGetTime(theStopWatch.getTime());
      theStopWatch.stop();
    };
  }, []);

  useEffect(() => {
    if (gameOver) navigateTo("/score-form");
    return () => setGameOver(false);
  }, [gameOver, navigateTo]);

  console.log(clickArr);

  const getPosXY = () => {
    const map = document.querySelector(".rickMortyMap");
    const rect = map.getBoundingClientRect();
    const e = window.event;
    const posX = e.clientX;
    const posY = e.clientY;
    console.log(`PosX, PosY`);
    console.log(`PosX: ${posX}, PosY: ${posY}`);
    const posXY = [posX, posY, rect];
    return posXY;
  };

  const addMark = () => {
    const markXY = getPosXY();
    const obj = {
      markXY: markXY,
      icon: loadingIcon,
    };
    setPosXY(markXY);
    setClickArr([...clickArr, obj]);
  };

  const cancelAddMark = () => {
    // Create a copy of clickArr with the last item removed
    const newArr = clickArr.slice(0, -1);

    // Set the new array and update the state
    setClickArr(newArr);
  };

  const ChooseCharacterHandler = (index) => {
    if (scoreRef.current < 3) {
      const newArr = [...characters];
      sendToServer(newArr[index], newArr, index);
    }
  };

  const sendToServer = (item, arr, index) => {
    console.log(`Server: ${item.name}, X:${item.posX}, Y:${item.posY}`);
    console.log(item.name, [posXY[0], posXY[1]]);
    const proccessed = proccessOnServer(item, posXY);
    console.log(`proccessed`);
    console.log(proccessed);
    if (proccessed) {
      console.log(`processed true`);
      const newArr = [...clickArr];
      newArr[clickArr.length - 1].icon = checkedIcon;
      setClickArr(newArr);
      arr.splice(index, 1);
      setCharacters(arr);
      scoreRef.current++;
    } else {
      console.log(`processed false`);
      const newArr = [...clickArr];
      newArr[clickArr.length - 1].icon = mistakeIcon;
      setClickArr(newArr);
    }
    if (scoreRef.current >= 3) {
      console.log("Game Over");
      setTimeout(() => {
        dispatch({ type: ACTION.stopGame });
        dispatch({ type: ACTION.HOME });
        setGameOver(true);
      }, 750);
    }
  };

  const proccessOnServer = (item, posXY) => {
    const foundChar = characterArr.find((char) => {
      return char.name === item.name;
    });
    if (foundChar) {
      const correctX = posXY[0] >= foundChar.posX[0] && posXY[0] <= foundChar.posX[1];
      const correctY = posXY[1] >= foundChar.posY[0] && posXY[1] <= foundChar.posY[1];
      if (correctX && correctY) {
        return true;
      }
      return false;
    }
    return false;
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

  const calculateIconStyle = (click) => {
    return {
      position: "absolute",
      left: `${click.markXY[0] - click.markXY[2].x - 40}px`,
      top: `${click.markXY[1] - click.markXY[2].y - 40}px`,
    };
  };

  const calculateMenuStyle = () => {
    return {
      position: "absolute",
      left: `${posXY[0] + 80 - 40}px`,
      top: `${posXY[1] - posXY[2].y + 30 - 40}px`,
    };
  };

  const mapChosen = () => {
    if (state.gameGenre === "mixed") return map1;
    if (state.gameGenre === "poke") return map2;
    if (state.gameGenre === "rm") return map3;
    return errorMap;
  };

  return (
    <section>
      <figure className="mapContainer">
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
        {clickArr.map((click, index) => (
          <img key={index} className="icons" style={calculateIconStyle(click)} src={click.icon} />
        ))}
        {/* Character Menu */}
        {showMenu && posXY.length > 0 && (
          <figcaption className="chooseDiv" style={calculateMenuStyle()}>
            {characters.map((character, index) => (
              <div
                className="characterDiv"
                key={index + character.name}
                onClick={() => {
                  gameController(index);
                }}
              >
                <img src={character.url} alt={character.name} className="chooseCharacter" />
                <span>{character.name}</span>
              </div>
            ))}
          </figcaption>
        )}
      </figure>
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

// Here's a simple example using percentage coordinates:
// const handleMouseClick = (event) => {
//   const container = document.querySelector('.map');
//   const rect = container.getBoundingClientRect();

//   const posXpct = ((event.clientX - rect.x) / rect.width) * 100;
//   const posYpct = ((event.clientY - rect.y) / rect.height) * 100;

//   // Your logic using percentage coordinates
// };
