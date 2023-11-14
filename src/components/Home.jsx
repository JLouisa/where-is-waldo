import map1 from "../assets/maps/rickAndMorty.png";
import selectIcon from "../assets/dashed-circle.svg";
import checkedIcon from "../assets/checkbox-circle.svg";
import mistakeIcon from "../assets/mistake-circle.svg";

function Home() {
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

  const placeMarkers = () => {
    const arrPosXY = handleMouseMove();

    const marker = document.createElement("img");
    marker.src = checkedIcon;
    marker.classList.add("icons");
    marker.style.position = "absolute";

    const map = document.querySelector(".map");
    const rect = map.getBoundingClientRect();
    map.appendChild(marker);
    marker.style.left = arrPosXY[0] - rect.x - 30 + "px";
    marker.style.top = arrPosXY[1] - rect.y - 30 + "px";
  };

  return (
    <section>
      <div className="map">
        {/* <img src={selectIcon} alt="Rick and more find crowd" className="selectIcon icons" />
        <img src={checkedIcon} alt="Rick and more find crowd" className="checkedIcon icons" />
        <img src={mistakeIcon} alt="Rick and more find crowd" className="mistakeIcon icons" /> */}
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
