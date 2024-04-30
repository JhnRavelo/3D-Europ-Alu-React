import { Fragment } from "react";
import Button from "../Button/Button";
import Gallery from "../Gallery/Gallery";
import Separation from "../Separation/Separation";
import propTypes from "prop-types";
import useParallax from "../../../hooks/useParallax";

const Template = ({ products, id }) => {
  useParallax(products, "float_right", id);
  return (
    <div className="container">
      <div className="row">
        {products.length > 0 &&
          products.map((product, index) => (
            <Fragment key={index}>
              <div className="fenetre__coulissante">
                <div
                  className={
                    index % 2 != 0 ? "presentation pres2" : "presentation"
                  }
                >
                  <div className="img__pres">
                    <img
                      className="float_right"
                      src={product.png}
                      alt={product.title}
                    />
                  </div>
                  <div className="desc">
                    <div className="button_intrested_start">
                      <h1 className="title">{product.title}</h1>
                      <p className="short__desc">{product.description}</p>

                      <Button />
                    </div>
                  </div>
                </div>
                <Gallery
                  gallery={product.gallery.split(",")}
                  indexCategory={index}
                />
              </div>
              {products.length > index + 1 && <Separation />}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

Template.propTypes = {
  products: propTypes.array,
  id: propTypes.number,
};

export default Template;
