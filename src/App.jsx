import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/App.css";

function App({ state, dispatch }) {
  return (
    <>
      <Nav state={state} dispatch={dispatch} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

App.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

export default App;
