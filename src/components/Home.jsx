import map1 from "../assets/maps/rickAndMorty.png";
import selectIcon from "../assets/markers/dashed-circle.svg";
import checkedIcon from "../assets/markers/checkbox-circle.svg";
import mistakeIcon from "../assets/markers/mistake-circle.svg";
import loadingIcon from "../assets/markers/loading.svg";

function Home() {
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
    checked = !checked;
    const marker = document.createElement("img");
    marker.classList.add("icons", "selectIcon");
    marker.style.position = "absolute";
    marker.src = loadingIcon;

    // Map HTML Element
    const map = document.querySelector(".map");
    const rect = map.getBoundingClientRect();
    // console.log(rect);
    map.appendChild(marker);
    marker.style.left = `${arrPosXY[0] - rect.x - 40}px`;
    marker.style.top = `${arrPosXY[1] - rect.y - 40}px`;

    setTimeout(() => {
      if (checked) {
        marker.src = checkedIcon;
      } else {
        marker.src = mistakeIcon;
      }
    }, 2000);
  };

  // 1920x1080
  //   {
  //     "x": 8,
  //     "y": 173.734375,
  //     "width": 1904,
  //     "height": 1086.46875,
  //     "top": 173.734375,
  //     "right": 1912,
  //     "bottom": 1260.203125,
  //     "left": 8
  // }

  //   960x540
  //   {
  //     "x": 8,
  //     "y": 106.84375,
  //     "width": 944,
  //     "height": 541.1875,
  //     "top": 106.84375,
  //     "right": 952,
  //     "bottom": 648.03125,
  //     "left": 8
  // }

  //  480x270
  //   {
  //     "x": 8,
  //     "y": 104,
  //     "width": 464,
  //     "height": 268.546875,
  //     "top": 104,
  //     "right": 472,
  //     "bottom": 372.546875,
  //     "left": 8
  // }

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
