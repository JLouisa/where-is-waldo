function GameRules() {
  return (
    <div style={GameRulesStyles}>
      <p>
        <strong>Game Title</strong>: &ldquo;Where&apos;s Waldo?&ldquo;
      </p>
      <p>
        <strong>Objective</strong>: The goal of the game is to find the characters in a crowded and chaotic scene
        inspired by the Rick and Morty, Pokemon and Disney universe.
      </p>
      <p>
        <strong>Rules</strong>: Starting Point: The player starts with a detailed illustration featuring various
        characters, objects, and scenes from the different Universes. Find the Characters: they will be hidden within
        the illustration among other characters and elements.
      </p>
      <p>
        <strong>Zoom and Pan</strong>: Players can zoom in and pan around the illustration to get a closer look at
        different parts of the scene.
      </p>
      <p>
        <strong>Time Limit</strong>: Set a time limit for each round to increase the challenge. Players must find Rick
        and Morty within the given time.
      </p>
      <p>
        <strong>Point System</strong>: Assign points based on the speed of finding the three Characters. Faster finds
        earn more points.
      </p>
      <p>
        <strong>Leaderboard</strong>: Keep a leaderboard to track and display the scores of players who successfully
        find three characters in different Universes in the shortest time.
      </p>
      <p>
        <strong>Winning</strong>: The player with the highest score at the end of the game or the one who successfully
        completes all levels in the shortest time is declared the winner.
      </p>
      <p>
        This &ldquo;Where&apos;s Waldo?&ldquo; game adds a fun and challenging twist to the classic search-and-find
        concept, engaging players with the beloved characters and multiple universes.
      </p>
    </div>
  );
}

export default GameRules;

const GameRulesStyles = {
  margin: "2em",
};
