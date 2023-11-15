import logo from "/favicon.png";
import characterArr from "../database/fakeDB";
// import PropTypes from "prop-types";

function Nav() {
  return (
    <nav>
      <div className="nav1">
        <img src={logo} alt="loupe icon" className="logoImage"></img>
        <h1>Where is Waldo Game</h1>
        <div className="menuLinks">
          <a href="">Leaderboard</a>
          <a href="">Game Rules</a>
        </div>
      </div>
      <div className="nav2">
        <img src={logo} alt="loupe icon" className="logoImage"></img>
        <h1>Where is Waldo Game</h1>
        <div className="charactersDiv">
          {characterArr.map((character, index) => {
            return <img key={index} src={character.url} className="characterImg"></img>;
          })}
        </div>
        {/* <div className="menuLinks">
          <a href="">Leaderboard</a>
          <a href="">Game Rules</a>
        </div> */}
      </div>
    </nav>
  );
}

// Nav.propTypes = {
//   characterArr: PropTypes.array,
// };

export default Nav;
