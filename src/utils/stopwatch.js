// stopwatch.js

export const Stopwatch = () => {
  let startTime;
  let isRunning = false;
  let elapsedTime = 0;
  let intervalId;

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
    } else {
      startTime = Date.now() - (elapsedTime || 0);
      intervalId = setInterval(updateTime, 100);
    }

    isRunning = !isRunning;
  };

  const reset = () => {
    clearInterval(intervalId);
    elapsedTime = 0;
    updateTime();
    isRunning = false;
  };

  const updateTime = () => {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("stopwatch").innerText = formattedTime;
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `00:${formattedMinutes}:${formattedSeconds}`;
  };

  return { startStop, reset };
};
