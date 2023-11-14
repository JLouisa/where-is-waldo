import map1 from "../assets/maps/rickAndMorty.png";
import selectIcon from "../assets/dashed-circle.svg";
import checkedIcon from "../assets/checkbox-circle.svg";

function Home() {
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("mousemove", handleMouseMove);
  });

  function handleMouseMove() {
    const e = window.event;

    const posX = e.clientX;
    const posY = e.clientY;
    console.log(`PosX: ${posX}, PosY: ${posY}`);
  }

  return (
    <section>
      <div>
        <img src={checkedIcon} alt="Rick and more find crowd" className="selectionIcon" />
        <img src={map1} alt="Rick and more find crowd" className="rickMortyMap" onClick={handleMouseMove} />
      </div>
    </section>
  );
}

export default Home;
