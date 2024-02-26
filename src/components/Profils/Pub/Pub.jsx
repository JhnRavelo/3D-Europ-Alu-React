import "./Pub.scss";
import Caroussel from "../../Caroussel/Caroussel";
import pub1 from "../../../assets/pub/pub1.jpg";
import pub2 from "../../../assets/pub/pub2.jpg";
import pub3 from "../../../assets/pub/pub3.jpg";

const slides = [pub1, pub2, pub3];

const Pub = () => {
  return (
    <div className="pub">
     <Caroussel autoslide={true}> 
        {slides.map((s, index) => (
          <img src={s} key={index}/>
        ))}
      </Caroussel> 
    </div>
  );
};

export default Pub;
