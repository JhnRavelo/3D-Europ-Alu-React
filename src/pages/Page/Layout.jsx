/* eslint-disable react-hooks/exhaustive-deps */
import Grids from "../../components/Layout/Grids/Grids";
import Header from "../../components/Header/Header";
import ScrollToTop from "../../components/Layout/ScrollToTop/ScrollToTop";
import Footer from "../../components/Layout/Footer/Footer";
import FormField from "../../components/Pages/Form/Form";
import useButtonContext from "../../hooks/useButtonContext";
import ProductRouter from "../../routers/ProductRouter";

const Layout = () => {
  const { show } = useButtonContext();

  return (
    <>
      <ScrollToTop />
      <div className="corps">
        <Header />
        <Grids />
        <ProductRouter />
        <Footer />
      </div>
      {show && <FormField />}
    </>
  );
};

export default Layout;
