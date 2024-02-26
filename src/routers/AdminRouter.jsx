import { Route, Routes } from "react-router-dom";
import Home from "../pages/Admin/Home/Home";
import Products from "../pages/Admin/Products/Product";
import Users from "../pages/Admin/Users/Users";
import Pages from "../pages/Admin/Pages/Pages";
import Orders from "../pages/Admin/Orders/Orders";
import Commercials from "../pages/Admin/Commercials/Commercials";
import Profile from "../pages/Admin/Profile/Profile";
import PrivateRoutes from "../components/Private/PrivateRoutes";
import Log from "../pages/Admin/Log/Log";
import Product from "../pages/Admin/Product/Product"

const prime = import.meta.env.VITE_PRIME.split(" ");

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes prime={prime[0]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/page" element={<Pages />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/commercial" element={<Commercials />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/log" element={<Log />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRouter;
