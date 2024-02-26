import { Fragment } from "react";
import Button from "../Button/Button";
import Gallery from "../Gallery/Gallery";
import Separation from "../Separation/Separation";
import propTypes from "prop-types";
import { useEffect, useRef } from "react";
import SimpleParallax from "simple-parallax-js";

const Template = ({ products, productslenght, title, id }) => {
  const fentetreRef = useRef();
  const presRefs = useRef([]);
  const imgRefs = useRef([]);

  useEffect(() => {
    imgRefs.current = [];
    presRefs.current = [];
  }, [id]);

  const addtoRefsImg = (el) => {

    if (el && !imgRefs.current.includes(el)) {
      imgRefs.current.push(el);
    }
  };

  useEffect(() => {
    
    if (
      imgRefs.current.length == products.length &&
      title != 7 &&
      imgRefs.current
    ) {

      for (let i = 0; i < imgRefs.current.length; i++) {
        if(!imgRefs.current[i].className.includes("simple-parallax-initialized")) {
          new SimpleParallax(imgRefs.current[i], {
            overflow: true,
            orientation: "up",
            scale: 1.8,
          });
        }
      }
    }
  }, [imgRefs, title, products]);

  return (
    <div className="container">
      <div className="row" ref={fentetreRef}>
        {products.length > 0 &&
          products.map((product, index) => {
            const addtoRefsPres = (el) => {
              if (el && !presRefs.current.includes(el)) {
                presRefs.current.push(el);
              }

              if (index % 2 != 0 && presRefs.current[index]) {
                presRefs.current[index].classList.add("pres2");
              }
            };

            return (
              <Fragment key={index}>
                <div className="fenetre__coulissante">
                  <div ref={addtoRefsPres} className="presentation">
                    <div className="img__pres">
                      <img
                        ref={addtoRefsImg}
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
                {productslenght > index + 1 && <Separation />}
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

Template.propTypes = {
  products: propTypes.array,
  productslenght: propTypes.number,
  title: propTypes.string,
  id: propTypes.number
};

export default Template;
