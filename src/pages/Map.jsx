import map1 from "../assets/maps/rickAndMorty.png";
import loadingIcon from "../assets/markers/loading.svg";
import { useState, useRef } from "react";
import characterArr from "../database/fakeDB";

function Home() {
  const [characters, setCharacters] = useState(characterArr);
  const [gameOver, setGameOver] = useState(false);
  const [clickArr, setClickArr] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [posXY, setPosXY] = useState([]);
  const clickedRef = useRef(0);
  const scoreRef = useRef(0);

  const getPosXY = () => {
    const map = document.querySelector(".rickMortyMap");
    const rect = map.getBoundingClientRect();
    const e = window.event;
    const posX = e.clientX;
    const posY = e.clientY;
    console.log(`PosX: ${posX}, PosY: ${posY}`);
    const posXY = [posX, posY, rect];
    return posXY;
  };

  const addMark = () => {
    const markXY = getPosXY();
    setPosXY(markXY);
    setClickArr([...clickArr, markXY]);
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
      sendToServer(newArr[index]);
      newArr.splice(index, 1);
      setCharacters(newArr);
      scoreRef.current++;
    }
    if (scoreRef.current >= 3) {
      console.log("Game Over");
      setGameOver(true);
    }
  };

  const sendToServer = (item) => {
    console.log(`${item.name} has been sent to the server`);
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

  if (gameOver) return <p>Game Over</p>;

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
              left: `${click[0] - click[2].x - 40}px`,
              top: `${click[1] - click[2].y - 40}px`,
            }}
            src={loadingIcon}
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

export default Home;
