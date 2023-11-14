import logo from "/favicon.png";

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
        <div className="menuLinks">
          <a href="">Leaderboard</a>
          <a href="">Game Rules</a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
