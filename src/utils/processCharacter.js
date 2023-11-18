import bethImg from "../assets/characters/rickMorty/beth.png";
import jerryImg from "../assets/characters/rickMorty/jerry.png";
import summerImg from "../assets/characters/rickMorty/summer.png";
import frankensteinMonsterImg from "../assets/characters/rickMorty/frankensteinMonster.png";
import hamSamuraiImg from "../assets/characters/rickMorty/hamSamurai.png";
import pencilImg from "../assets/characters/rickMorty/pencil.png";
import flamingoImg from "../assets/characters/rickMorty/flamingo.png";
import blastoiseImg from "../assets/characters/pokemon/blastoise.png";
import charmanderImg from "../assets/characters/pokemon/charmander.png";
import mewImg from "../assets/characters/pokemon/mew.png";
import pidgeyImg from "../assets/characters/pokemon/pidgey.png";
import snorlaxImg from "../assets/characters/pokemon/snorlax.png";
import weedleImg from "../assets/characters/pokemon/weedle.png";
import babyYodaImg from "../assets/characters/disney/babyYoda.png";
import CaptainAmericaImg from "../assets/characters/disney/CaptainAmerica.png";
import goofyImg from "../assets/characters/disney/goofy.png";
import homerImg from "../assets/characters/disney/homer.png";
import kermitImg from "../assets/characters/disney/kermit.png";
import simbaImg from "../assets/characters/disney/simba.png";

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
    Blastoise: blastoiseImg,
    Charmander: charmanderImg,
    Mew: mewImg,
    Pidgey: pidgeyImg,
    Snorlax: snorlaxImg,
    Weedle: weedleImg,
    "Baby Yoda": babyYodaImg,
    "Caption America": CaptainAmericaImg,
    Goofy: goofyImg,
    "Homer Simpson": homerImg,
    Kermit: kermitImg,
    Simba: simbaImg,
  };

  const processCharacter = (fetchArr) => {
    const arr = [...fetchArr];
    const formattedArr = arr.map((item) => {
      const character = new Characters(item.character, item.posX, item.posY, item.map, imageDB[item.character]);
      return character;
    });

    return formattedArr;
  };
  return { processCharacter };
};

export default processor;
