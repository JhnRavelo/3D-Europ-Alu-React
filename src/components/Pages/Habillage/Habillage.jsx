import "./Habillage.css";
import { Fragment } from "react";
import Button from "../Button/Button";
import Gallery from "../Gallery/Gallery";
import propTypes from "prop-types";
import Separation from "../Separation/Separation";
import useParallax from "../../../hooks/useParallax";

const Habillage = ({ products, id }) => {
  useParallax(products, "image_parallaxe", id);
  return (
    <>
      <div className="panneau_composite">
        {products.map((product, index) => (
          <Fragment key={index}>
            <div
              className={
                index % 2 != 0
                  ? "Habillage_presenatation pres2"
                  : "Habillage_presenatation"
              }
            >
              <div className="pres">
                <img
                  className="image_parallaxe"
                  src={product.png}
                  alt={product.title}
                />
              </div>
              <div className="description">
                <div className="desc_box">
                  <div className="button_intrested_start">
                    <h1 className="title">{product.title}</h1>
                    <p className="short__desc">{product.description}</p>
                    <Button />
                  </div>
                </div>
              </div>
            </div>
            <div className="separation">
              <div className="grid-overlay">
                <div></div>
              </div>
            </div>
            <Gallery
              gallery={product.gallery.split(",")}
              indexCategory={index}
            />
            {products.length > index + 1 && <Separation />}
          </Fragment>
        ))}
      </div>
    </>
  );
};

Habillage.propTypes = {
  id: propTypes.number,
  products: propTypes.array,
};

export default Habillage;
