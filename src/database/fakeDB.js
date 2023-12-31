import bethImg from "../assets/characters/rickMorty/beth.png";
import jerryImg from "../assets/characters/rickMorty/jerry.png";
import summerImg from "../assets/characters/rickMorty/summer.png";

const beth = {
  name: "Beth Smith",
  posX: [1530, 1600],
  posY: [435, 750],
  iconImg: bethImg,
};

const jerry = {
  name: "Jerry Smith",
  posX: [1160, 1240],
  posY: [250, 530],
  iconImg: jerryImg,
};

const summer = {
  name: "Summer Smith",
  posX: [1345, 1415],
  posY: [515, 1040],
  iconImg: summerImg,
};

export const leaderboardArr = [
  {
    _id: 1,
    name: "John",
    score: "100",
    date: Date.now(),
  },
  {
    _id: 2,
    name: "Jane",
    score: "110",
    date: Date.now(),
  },
  {
    _id: 3,
    name: "Adam",
    score: "115",
    date: Date.now(),
  },
  {
    _id: 4,
    name: "Eve",
    score: "200",
    date: Date.now(),
  },
  {
    _id: 5,
    name: "Jay",
    score: "210",
    date: Date.now(),
  },
];

const characterArr = [beth, jerry, summer];

export default characterArr;

// 1920x1080
//   {
//     "x": 8,
//     "y": 173.734375,
//     "width": 1904,
//     "height": 1086.46875,
//     "top": 173.734375,
//     "right": 1912,
//     "bottom": 1260.203125,
//     "left": 8
// }

//   960x540
//   {
//     "x": 8,
//     "y": 106.84375,
//     "width": 944,
//     "height": 541.1875,
//     "top": 106.84375,
//     "right": 952,
//     "bottom": 648.03125,
//     "left": 8
// }

//  480x270
//   {
//     "x": 8,
//     "y": 104,
//     "width": 464,
//     "height": 268.546875,
//     "top": 104,
//     "right": 472,
//     "bottom": 372.546875,
//     "left": 8
// }
