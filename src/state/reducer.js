const reducer = (state, action) => {
  switch (action.type) {
    // Start and Stop the timer
    case "stopwatchStart": {
      return { ...state, isRunning: true };
    }
    case "stopwatchStop": {
      return { ...state, isRunning: false };
    }
    // Start and Stop the game (switch to map)
    case "startGame": {
      return { ...state, startGame: true };
    }
    case "stopGame": {
      return { ...state, startGame: false };
    }
    // Choosing the map
    case "gameRM": {
      return { ...state, gameGenre: "rm" };
    }
    case "gamePoke": {
      return { ...state, gameGenre: "poke" };
    }
    case "mixed": {
      return { ...state, gameGenre: "mixed" };
    }
    // Default selection
    default: {
      throw new Error();
    }
  }
};

const ACTION = {
  STOPWATCH_START: "stopwatchStart",
  STOPWATCH_STOP: "stopwatchStop",
  startGame: "startGame",
  stopGame: "stopGame",
  GAMERM: "gameRM",
  GAMEPOKE: "gamePoke",
  MIXED: "mixed",
  TIME: "time",
};

export { reducer, ACTION };
