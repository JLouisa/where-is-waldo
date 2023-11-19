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

function Map({ state, dispatch, characters, setCharacters }) {
  const [loading, setLoading] = useState(true);
  const { getFetch } = useFetch();
  const navigateTo = useNavigate();
  const [gameOver, setGameOver] = useState(false);
  const [clickArr, setClickArr] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [posXY, setPosXY] = useState([]);
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
  const getPosXY = () => {
    const map = document.querySelector(".rickMortyMap");
    const rect = map.getBoundingClientRect();
    const e = window.event;
    const posX = e.clientX;
    const posY = e.clientY;
    console.log(`PosX, PosY`);
    console.log(`PosX: ${posX}, PosY: ${posY}`);
    const posXY = [posX, posY, rect];
    // const posXY = { posX: posX, posY: posY, rect: rect };
    return posXY;
  };

  // const getPosXY = () => {
  //   const map = document.querySelector(".rickMortyMap");
  //   const rect = map.getBoundingClientRect();

  //   const e = window.event;
  //   const posX = ((e.clientX - rect.x) / rect.width) * 100;
  //   const posY = ((e.clientY - rect.y) / rect.height) * 100;
  //   console.log(`PosX, PosY`);
  //   console.log(`PosX: ${posX}, PosY: ${posY}`);
  //   const posXY = [posX, posY, rect];
  //   return posXY;
  // };

  const addMark = () => {
    const markXY = getPosXY();
    const obj = {
      markXY: markXY,
      iconImg: loadingIcon,
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
    const proccessed = proccessOnServer(item, posXY);
    if (proccessed) {
      const newArr = [...clickArr];
      newArr[clickArr.length - 1].iconImg = checkedIcon;
      setClickArr(newArr);
      arr.splice(index, 1);
      setCharacters(arr);
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

  const proccessOnServer = (item, posXY) => {
    const foundChar = characters.find((char) => {
      return char.name === item.name;
    });
    console.log("found Character");
    console.log(foundChar);
    if (foundChar) {
      const correctX = posXY[0] >= foundChar.posX[0] && posXY[0] <= foundChar.posX[1];
      const correctY = posXY[1] >= foundChar.posX[0] && posXY[1] <= foundChar.posX[1];
      if (correctX && correctY) {
        return true;
      }
      return false;
    }
    return false;
  };

  // const calculateIconStyle = (clickedCharacter) => {
  //   return {
  //     position: "absolute",
  //     left: `${clickedCharacter.markXY[0] - 40}%`,
  //     top: `${clickedCharacter.markXY[1] - 40}%`,
  //   };
  // };

  const calculateMenuStyle = () => {
    return {
      position: "absolute",
      left: `${posXY[0] + 80 - 40}px`,
      top: `${posXY[1] - posXY[2].y + 30 - 40}px`,
    };
  };

  // (Working)
  const calculateIconStyle = (click) => {
    return {
      position: "absolute",
      left: `${click.markXY[0] - click.markXY[2].x - 40}px`,
      top: `${click.markXY[1] - click.markXY[2].y - 40}px`,
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

  if (loading) return <div>Loading...</div>;

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
        {clickArr.map((clickedCharacter, index) => (
          <img
            key={index}
            className="icons"
            style={calculateIconStyle(clickedCharacter)}
            src={clickedCharacter.iconImg}
          />
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
                <img src={character.iconImg} alt={character.name} className="chooseCharacter" />
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
