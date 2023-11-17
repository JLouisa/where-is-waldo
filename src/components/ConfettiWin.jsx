import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

function ConfettiWin() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}

export default ConfettiWin;
