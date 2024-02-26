import "./TopProduct.scss";
import useAdminContext from "../../../hooks/useAdminContext";

const TopProduct = () => {
  const {top} = useAdminContext()
  
  return (
    <div className="topBox">
      <h1>Top Produits</h1>
      <div className="list">
        {top.map((prod, index) => {
          return (
            <div className="listItem" key={index}>
              <div className="user">
                <img src={prod.product.png} alt="" />
                <div className="userTexts">
                  <span className="productCategorie">{prod.product.page.page}</span>
                  <span className="email">{prod.product.title}</span>
                </div>
              </div>
              <span className="amount">{prod.count} fois</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopProduct;
