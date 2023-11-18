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
    case "rickMortyMap": {
      return { ...state, gameGenre: "rickMortyMap" };
    }
    case "pokemonMap": {
      return { ...state, gameGenre: "pokemonMap" };
    }
    case "disneyMap": {
      return { ...state, gameGenre: "disneyMap" };
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
  MAPRM: "rickMortyMap",
  MAPPOKE: "pokemonMap",
  MAPDISNEY: "disneyMap",
};

export { reducer, ACTION };
