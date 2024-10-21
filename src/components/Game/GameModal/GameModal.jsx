import "./gameModal.scss";
import propTypes from "prop-types";

const GameModal = ({ winnerName, prize, open }) => {
  return (
    <div className={open ? "game-modal show" : "game-modal"}>
      <div className="content">
        <img className="img" src="./gif/fireworks.gif" alt="gif" />
        <h4 className="title">Félicitations!</h4>
        <p>
          {winnerName} a gagné {prize?.name ? prize.name : ""}
        </p>
        {prize?.name.includes("%") ? (
          <div className="ticket-container">
          <div className="tixContainer">
            <a className="tix" href="#">
              <div className="tixInner">
                <span className="remise">
                  <strong>Remise</strong> -
                  {prize.name.split(" ")[prize.name.split(" ").length - 1]}
                </span>
              </div>
            </a>
          </div>
          </div>
        ) : (
          <img src={prize?.img} className="goodies"/>
        )}
      </div>
    </div>
  );
};

GameModal.propTypes = {
  winnerName: propTypes.string,
  prize: propTypes.object,
  open: propTypes.bool,
};

export default GameModal;
