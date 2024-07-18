/* eslint-disable react-hooks/exhaustive-deps */
import "./Product.css";
import { useEffect } from "react";
import Template from "../Template/Template";
import Habillage from "../Habillage/Habillage";
import defaultAxios from "../../../api/axios";
import useProduct from "../../../hooks/useProduct";
import useExtractPageId from "../../../hooks/useExtractPageId";
import { useLocation } from "react-router-dom";

const Products = () => {
  const { products, setProducts } = useProduct();
  const location = useLocation();
  const id = useExtractPageId();
  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const res = await defaultAxios.get(`/product/getProduct/${id}`);
          setProducts(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [id]);

  useEffect(() => {
    const hash = location.hash;
    const timeoutId = setTimeout(() => {
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);

  return (
    <section id="produits">
      {id != 7 ? (
        <Template products={products} />
      ) : (
        <Habillage products={products} />
      )}
    </section>
  );
};

export default Products;
