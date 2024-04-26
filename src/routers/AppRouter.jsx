import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Admin from "../pages/Admin";
import PrivateRoutes from "../components/Private/PrivateRoutes";
import CommePage from "../pages/Commercial/CommePage";
import PersistantLogin from "../components/Private/PersistantLogin";
import Home from "../pages/Acceuil/Home";

const prime = import.meta.env.VITE_PRIME.split(" ");

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PersistantLogin />}>
        <Route element={<PrivateRoutes prime={prime[1]} />}>
          <Route path="/commercial/" element={<CommePage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/pageProd/*" element={<Layout />} />
        <Route element={<PrivateRoutes prime={prime[0]} />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
