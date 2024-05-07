/* eslint-disable react-hooks/exhaustive-deps */
import "./Product.css";
import { useEffect } from "react";
import Template from "../Template/Template";
import Habillage from "../Habillage/Habillage";
import defaultAxios from "../../../api/axios";
import useProduct from "../../../hooks/useProduct";
import useExtractPageId from "../../../hooks/useExtractPageId";

const Products = () => {
  const { products, setProducts } = useProduct();
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

  return (
    <section id="produits">
      {id != 7 ? (
        <Template id={id} products={products} />
      ) : (
        <Habillage id={id} products={products} />
      )}
    </section>
  );
};

export default Products;
