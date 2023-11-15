import map1 from "../assets/maps/rickAndMorty.png";
import ChooseCharacter from "../components/ChooseCharacter";
import loadingIcon from "../assets/markers/loading.svg";
import useBearStore from "../state/useGlobalStore";
// import { useState } from "react";
import { useState, useRef, useEffect } from "react";
import characterArr from "../database/fakeDB";
// import useBearStore from "../state/useGlobalStore";

function Home() {
  const [clickOnMap, setClickOnMap] = useState([]);
  const { gameOver, setGameOver, showChoose, setShowChoose } = useBearStore();

  // ==
  const [characters, setCharacters] = useState(characterArr);
  //   const [showChoose, setShowChoose] = useState(false);
  // const { gameOver, setGameOver, showChoose, setShowChoose } = useBearStore();
  const scoreRef = useRef(0);

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
  // ==

  const getRect = () => {
    const map = document.querySelector(".map");
    const rect = map.getBoundingClientRect();
    return rect;
  };

  const handleMouseClick = () => {
    const e = window.event;
    const posX = e.clientX;
    const posY = e.clientY;
    console.log(`PosX: ${posX}, PosY: ${posY}`);
    const posXY = [posX, posY, getRect()];

    const theMark = (
      <img
        className="icons selectIcon"
        style={{
          position: "absolute",
          left: `${posXY[0] - posXY[2].x - 40}px`,
          top: `${posXY[1] - posXY[2].y - 40}px`,
        }}
        src={loadingIcon}
        alt="Marker"
      />
    );

    setClickOnMap([...clickOnMap, theMark]);
    setShowChoose(true);
  };

  return (
    <section>
      <div
        className="map chooseContainer"
        onClick={() => {
          if (!gameOver) {
            setShowChoose(!showChoose);
          } else {
            console.log("Game already over");
          }
        }}
      >
        <img
          src={map1}
          alt="Rick and more find crowd"
          className="rickMortyMap"
          onClick={() => {
            handleMouseClick();
          }}
        />
        {clickOnMap.length > 0 &&
          clickOnMap.map((marker, index) => {
            return (
              <div key={index}>
                <div>{marker}</div>
                {showChoose && (
                  <div className="chooseDiv">
                    {characters.map((character, index) => {
                      return (
                        <div
                          className="characterDiv"
                          key={index + character.name}
                          onClick={() => {
                            ChooseCharacterHandler(index);
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
            );
          })}
      </div>
    </section>
  );
}

export default Home;
