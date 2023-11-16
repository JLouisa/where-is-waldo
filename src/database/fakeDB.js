import bethImg from "../assets/characters/beth.png";
import jerryImg from "../assets/characters/jerry.png";
import summerImg from "../assets/characters/summer.png";

const beth = {
  name: "Beth Smith",
  posX: [1530, 1600],
  posY: [435, 750],
  url: bethImg,
};

const jerry = {
  name: "Jerry Smith",
  posX: [1160, 1240],
  posY: [250, 530],
  url: jerryImg,
};

const summer = {
  name: "Summer Smith",
  posX: [1345, 1415],
  posY: [740, 970],
  url: summerImg,
};

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
