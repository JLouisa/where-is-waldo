const reducer = (state, action) => {
  switch (action.type) {
    // Start and Stop the game (switch to map)
    case "startGame": {
      return { ...state, startGame: true };
    }
    case "stopGame": {
      return { ...state, startGame: false };
    }
    // Choosing the map
    case "home": {
      return { ...state, gameGenre: "home" };
    }
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
  startGame: "startGame",
  stopGame: "stopGame",
  HOME: "home",
  GAMERM: "gameRM",
  GAMEPOKE: "gamePoke",
  MIXED: "mixed",
};

export { reducer, ACTION };
