import { FacebookShareButton } from "react-share";
import "./gameModal.scss";
import propTypes from "prop-types";

const GameModal = ({ winnerName, prize, open }) => {
  return (
    <div className={open ? "game-modal show" : "game-modal"}>
      <div className="content">
        <img className="img" src="./gif/fireworks.gif" alt="gif" />
        <h4 className="title">Félicitations!</h4>
        <p className="winner-text">
          {winnerName} a gagné {prize?.name ? prize.name : ""}
        </p>
        <img src={prize?.img} className="goodies" />
        <p className="facebook-text">
          Partagez votre victoire avec vos amis sur{" "}
        </p>
        <FacebookShareButton
          url="https://3d.europ-alu.com/jeux"
          className="facebook-container"
        >
          <span>facebook</span>
        </FacebookShareButton>
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
