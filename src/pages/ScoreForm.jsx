import PropTypes from "prop-types";

function ScoreForm({ state }) {
  return (
    <div className="scorePage">
      <div>
        <p>Your score is: {state.time / 100}s</p>
      </div>
      <form action="" method="POST">
        <label htmlFor="name">Name: </label>
        <br />
        <input type="text" name="name" id="name" />
        <br />
        <input type="submit" className="btn" value="submit" />
      </form>
    </div>
  );
}

ScoreForm.propTypes = {
  state: PropTypes.object,
  dispatch: PropTypes.func,
};

export default ScoreForm;
