import propTypes from "prop-types";
import logoEuro from "../../../assets/png/logo EUROP'ALU-5.png";

const GameContainer = ({ children, slug }) => {
  return (
    <div className="participation-container">
      <div className={"participation-content " + slug}>
        <div className="participation-img-container">
          <img src={logoEuro} alt="logo Europ'Alu" />
        </div>
        {children}
      </div>
    </div>
  );
};

GameContainer.propTypes = {
  children: propTypes.any,
  slug: propTypes.string,
};

export default GameContainer;
