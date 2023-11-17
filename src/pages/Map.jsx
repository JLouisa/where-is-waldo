import map1 from "../assets/maps/rickAndMorty.png";
import loadingIcon from "../assets/markers/loading.svg";
import checkedIcon from "../assets/markers/checkbox-circle.svg";
import mistakeIcon from "../assets/markers/mistake-circle.svg";
import { useState, useRef, useEffect } from "react";
import characterArr from "../database/fakeDB";
import PropTypes from "prop-types";

function Map({ isRunning, setIsRunning }) {
  const [characters, setCharacters] = useState(characterArr);
  const [gameOver, setGameOver] = useState(false);
  const [clickArr, setClickArr] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [posXY, setPosXY] = useState([]);
  const clickedRef = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    if (isRunning === false) {
      setIsRunning(true);
    }
  }, []);

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
      setGameOver(true);
      setIsRunning(false);
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

  if (gameOver) {
    return <p>Game Over</p>;
  }

  return (
    <section>
      <div className="mapContainer">
        <img
          src={map1}
          alt="Rick and more find crowd"
          className="rickMortyMap"
          onClick={() => {
            if (clickedRef.current === 1) clickedRef.current = 2;
            gameController();
          }}
        />
        {/* Click on map */}
        {clickArr.map((click, index) => (
          <img
            key={index}
            className="icons"
            style={{
              position: "absolute",
              left: `${click.markXY[0] - click.markXY[2].x - 40}px`,
              top: `${click.markXY[1] - click.markXY[2].y - 40}px`,
            }}
            src={click.icon}
          />
        ))}
        {showMenu && posXY.length > 0 && (
          <div
            className="chooseDiv"
            style={{
              position: "absolute",
              left: `${posXY[0] + 80 - 40}px`,
              top: `${posXY[1] - posXY[2].y + 30 - 40}px`,
            }}
          >
            {/* Choose Character Menu */}
            {characters.map((character, index) => {
              return (
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

Map.propTypes = {
  isRunning: PropTypes.bool,
  setIsRunning: PropTypes.func,
};

export default Map;
