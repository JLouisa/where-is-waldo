import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/App.css";

function App({ isRunning }) {
  return (
    <>
      <Nav isRunning={isRunning} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

App.propTypes = {
  isRunning: PropTypes.bool,
};

export default App;
