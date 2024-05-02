import "./Cart.css";
import propTypes from "prop-types";

const Cart = ({ products }) => {
  return (
    <>
      <div className="pannier">
        <div className="titre__pannier">
          <h1>les produits qui vous ont intéressé:</h1>
        </div>
        {products &&
          products?.length > 0 &&
          products.map((product, index) => (
            <div className="cart-item" key={index}>
              <div className="title__cart__item">
                <h1>{product.product.title}</h1>
              </div>
              <div className="img__cart__item">
                <img src={product.product.png} alt="image du produit" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

Cart.propTypes = {
  products: propTypes.any,
};

export default Cart;
