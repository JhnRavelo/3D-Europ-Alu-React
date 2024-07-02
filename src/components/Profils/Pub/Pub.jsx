import "./Pub.scss";
import Caroussel from "../../Caroussel/Caroussel";
import pub1 from "../../../assets/pub/pub1.webp";
import pub2 from "../../../assets/pub/pub2.webp";
import pub3 from "../../../assets/pub/pub3.webp";

const slides = [pub1, pub2, pub3];

const Pub = () => {
  return (
    <div className="pub">
      <Caroussel autoslide={true}>
        {slides.map((s, index) => (
          <div className="slide-img" key={index}>
            <img
              src={s}
              loading="eager"
              alt={"image publicité de nos produits " + index}
            />
          </div>
        ))}
      </Caroussel>
    </div>
  );
};

export default Pub;
