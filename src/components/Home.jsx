import map1 from "../assets/maps/rickAndMorty.png";
import selectIcon from "../assets/markers/dashed-circle.svg";
import checkedIcon from "../assets/markers/checkbox-circle.svg";
import mistakeIcon from "../assets/markers/mistake-circle.svg";
import loadingIcon from "../assets/markers/loading.svg";

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

  let checked = true;

  const placeMarkers = () => {
    const arrPosXY = handleMouseMove();
    checked = !checked;
    const marker = document.createElement("img");
    marker.src = loadingIcon;
    marker.classList.add("icons", "selectIcon");
    marker.style.position = "absolute";

    // Map HTML Element
    const map = document.querySelector(".map");
    const rect = map.getBoundingClientRect();
    map.appendChild(marker);
    marker.style.left = arrPosXY[0] - rect.x - 40 + "px";
    marker.style.top = arrPosXY[1] - rect.y - 40 + "px";
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
