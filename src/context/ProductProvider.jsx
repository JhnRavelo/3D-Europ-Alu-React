import { createContext, useState } from "react";
import propTypes from "prop-types";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: propTypes.any,
};

export { ProductProvider };

export default ProductContext;
