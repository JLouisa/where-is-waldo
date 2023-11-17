import { useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/stopwatch.css";
import { ACTION } from "../state/reducer";

const Stopwatch = ({ state, dispatch }) => {
  // const [state.time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (state.isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => dispatch({ type: ACTION.TIME }), 10);
    }
    return () => clearInterval(intervalId);
  }, [state.isRunning, state.time, dispatch]);

  // Hours calculation
  const hours = Math.floor(state.time / 360000);

  // Minutes calculation
  const minutes = Math.floor((state.time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((state.time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = state.time % 100;

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

Stopwatch.propTypes = {
  isRunning: PropTypes.bool,
  setIsRunning: PropTypes.func,
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Stopwatch;
