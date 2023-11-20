import PropTypes from "prop-types";
import ConfettiWin from "../components/ConfettiWin";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalStore from "../state/useGlobalStore";

function ScoreForm({ state }) {
  const [loadingMsg, setLoadingMsg] = useState([]);
  const navigateTo = useNavigate();
  const { postFetch } = useFetch();
  const { getTime, setGetTime } = useGlobalStore();
  const [done, setDone] = useState(false);

  const postScore = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const score = getTime;
    const leaderboard = {
      name: name,
      score: score,
      map: state.gameGenre,
    };

    console.log(leaderboard);
    const response = await postFetch("/leaderboard", leaderboard);
    setLoadingMsg(response.data);
    if (response.data.ok === "ok") {
      setTimeout(() => {
        setGetTime(0);
        setDone(true);
      }, 750);
    }
  };

  useEffect(() => {
    if (state.gameGenre === "home") {
      navigateTo("/home");
    }
  });

  useEffect(() => {
    if (done) navigateTo("/leaderboard");
    return () => setDone(false);
  }, [done, navigateTo]);

  return (
    <>
      {loadingMsg.message !== undefined && (
        <div style={loadingMsg.ok === "ok" ? textAlingCenterMsg : textAlingCenterError}>{loadingMsg.message}</div>
      )}
      <div className="scorePage" style={scorePageStyle}>
        <div>
          <h2 style={textAlingCenter}>You found the 3 characters!</h2>
          <p style={textAlingCenter}>
            Your score is: <strong>{getTime}</strong> seconds
          </p>
        </div>
        <form action="" method="POST" style={formStyles} onSubmit={postScore}>
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

ScoreForm.propTypes = {
  getTime: PropTypes.number,
  state: PropTypes.object,
};

export default ScoreForm;

// CSS
const textAlingCenterMsg = {
  textAlign: "center",
  color: "darkgreen",
};

const textAlingCenterError = {
  textAlign: "center",
  color: "red",
};

const textAlingCenter = {
  textAlign: "center",
};

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
