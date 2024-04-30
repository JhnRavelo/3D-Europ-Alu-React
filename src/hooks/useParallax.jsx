import { useEffect } from "react";
import SimpleParallax from "simple-parallax-js";

const useParallax = (products, imgClass, id) => {
  useEffect(() => {
    if (products && products?.length > 0 && id && imgClass) {
      const images = document.querySelectorAll("." + imgClass);
      const imagesRef = [...images]
      if (imagesRef && imagesRef.length == products.length) {
        for (let i = 0; i < imagesRef.length; i++) {
          if (
            !imagesRef[i].className.includes("simple-parallax-initialized") &&
            id != 7
          ) {
            console.log("PARALLAX");
            new SimpleParallax(imagesRef[i], {
              overflow: true,
              orientation: "up",
              scale: 1.8,
            });
          } else if (
            !imagesRef[i].className.includes("simple-parallax-initialized") &&
            id == 7
          ) {
            console.log("HABIL PARALLAX");
            new SimpleParallax(imagesRef[i], {
              scale: 1.5,
            });
          }
        }
      }
    }
  }, [products, imgClass, id]);
};

export default useParallax;
