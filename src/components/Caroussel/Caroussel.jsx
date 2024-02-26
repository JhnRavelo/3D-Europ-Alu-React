import "./Caroussel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"


const Caroussel = ({
  children: slides,
  autoslide = false,
  autoSlideInterval = 5000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoslide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div id="caroussel">
      <div
        className="slide"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      <div className="buttonChevron">
        <button onClick={prev}>
          <FontAwesomeIcon className="chevron" icon={faChevronLeft} fade/>
        </button>
        <button onClick={next}>
          <FontAwesomeIcon className="chevron" icon={faChevronRight} fade/>
        </button>
      </div>

      <div className="indicator">
        <div className="circles">
          {slides.map((_, i) => (
            <div
              onClick={() => {
                setCurr(i);
              }}
              key={i}
              className={`
                circle 
                ${curr === i ? "opacity" : "h"}
                `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Caroussel.propTypes = {
  children: PropTypes.node, 
  autoslide: PropTypes.any,
  autoSlideInterval: PropTypes.any,
};

export default Caroussel;
