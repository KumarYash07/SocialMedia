const WelcomeMessage = ({ onGetPostClick }) => {
  return (
    <>
      <center className="Welcome-message">
        <h2>There is no post available.</h2>
        <button
          type="button"
          className="btn btn-info"
          onClick={onGetPostClick}
        >
          Get Posts from Server.
        </button>
      </center>
    </>
  );
};

export default WelcomeMessage;
