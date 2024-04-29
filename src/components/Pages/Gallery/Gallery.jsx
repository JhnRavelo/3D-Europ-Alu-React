import "./Gallery.css";
import { useEffect, useRef } from "react";
import propTypes from "prop-types";
import "../../../assets/css/jquery.fancybox.css";
import "../../../assets/js/jquery.fancybox.min.js";
import useExtractPageId from "../../../hooks/useExtractPageId.jsx";

const Gallery = ({ gallery, indexCategory }) => {
  const galleryRef = useRef();
  const id = useExtractPageId();
  useEffect(() => {
    if (id == 7) {
      galleryRef.current.classList.add("container");
    }
  }, [id]);

  return (
    <>
      <div className="gallery" ref={galleryRef}>
        <section id="portfolio">
          <div className="row portfolio-content">
            <div id="folio-wrap" className="bricks-wrapper">
              {gallery.map((url, index) => {
                return (
                  <div key={index} className="brick folio-item">
                    <a data-fancybox={`gallery${indexCategory}`} href={url}>
                      <img src={url} alt="gallery" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

Gallery.propTypes = {
  indexCategory: propTypes.number,
  gallery: propTypes.any,
};

export default Gallery;
