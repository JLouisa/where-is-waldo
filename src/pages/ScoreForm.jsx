import useGlobalStore from "../state/useGlobalStore";
import ConfettiWin from "../components/ConfettiWin";

function ScoreForm() {
  const { gameOverTime } = useGlobalStore();
  return (
    <>
      <div className="scorePage" style={scorePageStyle}>
        <div>
          <p>
            Your score is: <strong>{gameOverTime / 100}s</strong>
          </p>
        </div>
        <form action="" method="POST" style={formStyles}>
          <label htmlFor="name" style={labelStyles}>
            What is your name:
          </label>
          <br />
          <input type="text" name="name" id="name" style={inputStyles} />
          <br />
          <input type="submit" className="btn" value="Submit" style={buttonStyles} />
        </form>
      </div>
      <ConfettiWin />
    </>
  );
}

export default ScoreForm;

// CSS
const scorePageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const formStyles = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const labelStyles = {
  display: "block",
  marginBottom: "8px",
};

const inputStyles = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  marginBottom: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyles = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
