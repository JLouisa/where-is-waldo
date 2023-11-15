import map1 from "../assets/maps/rickAndMorty.png";
// import selectIcon from "../assets/markers/dashed-circle.svg";
import checkedIcon from "../assets/markers/checkbox-circle.svg";
import mistakeIcon from "../assets/markers/mistake-circle.svg";
import loadingIcon from "../assets/markers/loading.svg";
import ChooseCharacter from "../components/ChooseCharacter";
import characterArr from "../database/fakeDB";
import { useState } from "react";

function Home() {
  const [clickedMarkers, setClickedMarkers] = useState(characterArr);
  // const marker = document.createElement("img");
  // marker.classList.add("icons", "selectIcon");
  // marker.style.position = "absolute";

  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("mousemove", handleMouseMove);
  });

  const handleMouseMove = () => {
    const e = window.event;

    const posX = e.clientX;
    const posY = e.clientY;
    console.log(`PosX: ${posX}, PosY: ${posY}`);
    return [posX, posY];
  };

  let checked = true;

  const placeMarkers = () => {
    const arrPosXY = handleMouseMove();
    // const ChooseCharacterMenu = ChooseCharacter();
    // console.log(ChooseCharacterMenu);
    checked = !checked;
    const markerDiv = document.createElement("div");
    const marker = document.createElement("img");
    markerDiv.classList.add("iconDiv");
    marker.classList.add("icons", "selectIcon");
    markerDiv.style.position = "absolute";
    marker.src = loadingIcon;

    // Map HTML Element
    const map = document.querySelector(".map");
    const rect = map.getBoundingClientRect();
    // console.log(rect);
    map.appendChild(markerDiv);
    markerDiv.appendChild(marker);
    markerDiv.style.left = `${arrPosXY[0] - rect.x - 40}px`;
    markerDiv.style.top = `${arrPosXY[1] - rect.y - 40}px`;

    setTimeout(() => {
      if (checked) {
        marker.src = checkedIcon;
      } else {
        marker.src = mistakeIcon;
      }
    }, 2000);
  };

  return (
    <section>
      <div className="map">
        <img
          src={map1}
          alt="Rick and more find crowd"
          className="rickMortyMap"
          onClick={() => {
            handleMouseMove();
            placeMarkers();
          }}
        />
      </div>
    </section>
  );
}

export default Home;
