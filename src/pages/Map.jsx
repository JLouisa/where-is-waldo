import map1 from "../assets/maps/rickAndMorty.png";
import ChooseCharacter from "../components/ChooseCharacter";
import loadingIcon from "../assets/markers/loading.svg";
import useBearStore from "../state/useGlobalStore";
// import { useState } from "react";
import { useState, useRef, useEffect } from "react";
import characterArr from "../database/fakeDB";
// import useBearStore from "../state/useGlobalStore";

function Home() {
  // const [clickOnMap, setClickOnMap] = useState([]);
  const [clickArr, setClickArr] = useState([]);
  const [posXY, setPosXY] = useState([]);
  // const { gameOver, setGameOver, showChoose, setShowChoose } = useBearStore();

  // // ==
  // const [characters, setCharacters] = useState(characterArr);
  // const scoreRef = useRef(0);

  // const ChooseCharacterHandler = (index) => {
  //   if (scoreRef.current < 3) {
  //     const newArr = [...characters];
  //     sendToServer(newArr[index]);
  //     newArr.splice(index, 1);
  //     setCharacters(newArr);
  //     scoreRef.current++;
  //   }
  //   if (scoreRef.current >= 3) {
  //     console.log("Game Over");
  //     setGameOver(true);
  //   }
  // };

  // const sendToServer = (item) => {
  //   console.log(`${item.name} has been sent to the server`);
  // };
  // // ==

  const getRect = () => {
    const map = document.querySelector(".rickMortyMap");
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
    posXY, setPosXY;
    setClickArr([...clickArr, theMark]);
  };

  //! New Code
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

  return (
    <section>
      <div className="mapContainer">
        <img
          src={map1}
          alt="Rick and more find crowd"
          className="rickMortyMap"
          onClick={() => {
            addMark();
            // handleMouseClick();
          }}
        />
        {clickArr.map((click, index) => {
          return (
            <img
              key={index}
              className="icons"
              style={{
                position: "absolute",
                left: `${click[0] - click[2].x - 40}px`,
                top: `${click[1] - click[2].y - 40}px`,
              }}
              src={loadingIcon}
            ></img>
          );
        })}
        {posXY.length > 0 && (
          <div
            className="menuDiv"
            style={{
              position: "absolute",
              left: `${posXY[0] + 80 - 40}px`,
              top: `${posXY[1] - posXY[2].y + 30 - 40}px`,
            }}
          >
            Menu
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
