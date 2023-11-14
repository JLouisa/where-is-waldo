import logo from "../assets/logo.svg";

function Nav() {
  return (
    <nav>
      <img src={logo} alt="loupe icon" className="logoImage"></img>
      <h1>Where is Waldo Game</h1>
      <div className="menuLinks">
        <a href="">Leaderboard</a>
        <a href="">Game Rules</a>
      </div>
    </nav>
  );
}

export default Nav;
