import "./Product.css";
import propTypes from "prop-types";
import { useEffect } from "react";
import Template from "../Template/Template";
import Habillage from "../Habillage/Habillage";
import { useParams } from "react-router-dom";
import defaultAxios from "../../../api/axios";
import useProductContext from "../../../hooks/useProductContext";

const Products = () => {
  const { dataFetch, setDataFetch } = useProductContext();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await defaultAxios.get(`/product/getProduct/${id}`);

      setDataFetch(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section id="produit">
        {id != 7 ? (
          <Template
            id={id}
            products={dataFetch}
            productslenght={Object.keys(dataFetch).length}
            title={id}
          />
        ) : (
          <Habillage
            id={id}
            products={dataFetch}
            productslenght={Object.keys(dataFetch).length}
            title={id}
          />
        )}
      </section>
    </>
  );
};

Products.propTypes = {
  index: propTypes.number,
};
export default Products;
