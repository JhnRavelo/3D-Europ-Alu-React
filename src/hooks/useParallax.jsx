import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SimpleParallax from "simple-parallax-js";

const useParallax = (products, imgClass) => {
  const { link } = useParams();
  useEffect(() => {
    if (products && products?.length > 0 && link && imgClass) {
      const images = document.querySelectorAll("." + imgClass);
      const imgRefs = [...images];
      if (imgRefs && products?.length == imgRefs.length) {
        for (let i = 0; i < imgRefs.length; i++) {
          if (
            !imgRefs[i].className.includes("simple-parallax-initialized") &&
            !link.includes("habillage") &&
            !products.find((product) => product.title.includes("Panneau"))
          ) {
            new SimpleParallax(imgRefs[i], {
              overflow: true,
              orientation: "up",
              scale: 1.8,
            });
          } else if (
            !imgRefs[i]?.parentNode?.className.includes(
              "simple-parallax-initialized"
            ) &&
            !imgRefs[i].className.includes("simple-parallax-initialized") &&
            link.includes("habillage") &&
            products.find((product) => product.title.includes("Panneau"))
          ) {
            new SimpleParallax(imgRefs[i], {
              scale: 1.5,
            });
          }
        }
      }
    }
  }, [products, imgClass, link]);
};

export default useParallax;
