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
          products.map((product, index) => {
            const title = "Menuiserie aluminium " + product.title;
            return (
              <section id={product.title} key={index}>
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
                        alt={title}
                        title={title}
                        loading="eager"
                      />
                    </div>
                    <div className="desc">
                      <div className="button_intrested_start">
                        <h3 className="title">{product.title}</h3>
                        <p className="short__desc">{product.description}</p>
                        <Button />
                      </div>
                    </div>
                  </div>
                  <Gallery
                    gallery={product.gallery.split(",")}
                    indexCategory={index}
                    title={product.title}
                  />
                </div>
                {products.length > index + 1 && <Separation />}
              </section>
            );
          })}
      </div>
    </div>
  );
};

Template.propTypes = {
  products: propTypes.array,
  id: propTypes.number,
};

export default Template;
