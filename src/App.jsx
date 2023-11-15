import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/App.css";

function App({ characterArr }) {
  return (
    <>
      <Nav characterArr={characterArr} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

App.propTypes = {
  characterArr: PropTypes.array,
};

export default App;
