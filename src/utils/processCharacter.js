import bethImg from "../assets/characters/rickMorty/beth.png";
import jerryImg from "../assets/characters/rickMorty/jerry.png";
import summerImg from "../assets/characters/rickMorty/summer.png";
import frankensteinMonsterImg from "../assets/characters/rickMorty/frankensteinMonster.png";
import hamSamuraiImg from "../assets/characters/rickMorty/hamSamurai.png";
import pencilImg from "../assets/characters/rickMorty/pencil.png";
import flamingoImg from "../assets/characters/rickMorty/flamingo.png";

const processor = () => {
  class Characters {
    constructor(name, posX, posY, map, iconImg) {
      (this.name = name), (this.posXY = [posX, posY]), (this.map = map), (this.iconImg = iconImg);
    }
  }

  const imageDB = {
    "Beth Smith": bethImg,
    "Jerry Smith": jerryImg,
    "Summer Smith": summerImg,
    Pencil: pencilImg,
    "Ham Samurai": hamSamuraiImg,
    Flamingo: flamingoImg,
    FrankenSteinMonster: frankensteinMonsterImg,
  };

  const processCharacter = (fetchArr) => {
    const arr = [...fetchArr];
    console.log("arr");
    console.log(arr);
    const formattedArr = arr.map((item) => {
      const character = new Characters(item.character, item.posX, item.posY, item.map, imageDB[item.character]);
      return character;
    });

    return formattedArr;
  };
  return { processCharacter };
};

export default processor;
