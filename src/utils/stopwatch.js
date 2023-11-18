const Stopwatch = () => {
  let startTime;
  let elapsedTime = 0;
  let intervalId;

  const start = () => {
    startTime = Date.now() - (elapsedTime || 0);
    intervalId = setInterval(updateTime, 1000);
  };

  const stop = () => {
    clearInterval(intervalId);
  };

  const reset = () => {
    clearInterval(intervalId);
    elapsedTime = 0;
    updateTime();
  };

  const updateTime = () => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    if (document.getElementById("stopwatch").innerText) {
      document.getElementById("stopwatch").innerText = `${formattedTime} seconds`;
    } else {
      stop();
      reset();
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    return String(totalSeconds);
  };

  const getTime = () => {
    return Math.round(elapsedTime / 1000);
  };

  return { start, reset, stop, getTime };
};

export default Stopwatch;
