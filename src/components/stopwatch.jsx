import { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import "../styles/stopwatch.css";

const Stopwatch = ({ state }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (state.isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [state.isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // if (state.isRunning) {
  //   setGameOverTime(time);
  // }

  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time" id="stopwatch">
        {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

Stopwatch.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Stopwatch;
