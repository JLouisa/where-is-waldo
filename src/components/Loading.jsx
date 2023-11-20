import loading from "../assets/loading.svg";

function Loading() {
  return (
    <div style={(loadingStyle, loadingColorStyle)}>
      <img src={loading} alt="Spin loader"></img>
    </div>
  );
}

export default Loading;

const loadingStyle = {
  padding: "2em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loadingColorStyle = {
  height: "5rem",
  width: "auto",
};
