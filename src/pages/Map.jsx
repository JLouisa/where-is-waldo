import map1 from "../assets/maps/rickAndMorty.png";
import ChooseCharacter from "../components/ChooseCharacter";
import loadingIcon from "../assets/markers/loading.svg";
import useBearStore from "../state/useGlobalStore";
import { useState } from "react";

function Home() {
  const [clickOnMap, setClickOnMap] = useState([]);
  const { gameOver, setGameOver, showChoose, setShowChoose } = useBearStore();

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
      <div className="map">
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
              <div key={index} className="chooseContainer">
                <div>{marker}</div>
                <ChooseCharacter />
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Home;
