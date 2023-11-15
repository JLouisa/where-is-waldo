import { useState, useRef } from "react";
import characterArr from "../database/fakeDB";
import useBearStore from "../state/useGlobalStore";

function ChooseCharacter() {
  const [characters, setCharacters] = useState(characterArr);
  //   const [showChoose, setShowChoose] = useState(false);
  const { gameOver, setGameOver, showChoose, setShowChoose } = useBearStore();
  const scoreRef = useRef(0);

  const ChooseCharacterHandler = (index) => {
    if (scoreRef.current < 3) {
      const newArr = [...characters];
      sendToServer(newArr[index]);
      newArr.splice(index, 1);
      setCharacters(newArr);
      scoreRef.current++;
    }
    if (scoreRef.current >= 3) {
      console.log("Game Over");
      setGameOver(true);
    }
  };

  const sendToServer = (item) => {
    console.log(`${item.name} has been sent to the server`);
  };

  return (
    <div
      className="chooseContainer"
      onClick={() => {
        if (!gameOver) {
          setShowChoose(!showChoose);
        } else {
          console.log("Game already over");
        }
      }}
    >
      {showChoose && (
        <div className="chooseDiv">
          {characters.map((character, index) => {
            return (
              <div
                className="characterDiv"
                key={index + character.name}
                onClick={() => {
                  ChooseCharacterHandler(index);
                }}
              >
                <img src={character.url} alt={character.name} className="chooseCharacter" />
                <span>{character.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChooseCharacter;
