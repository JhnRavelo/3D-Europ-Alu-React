import { Route, Routes } from "react-router-dom";
import Layout from "../pages/Page/Layout";
import Admin from "../pages/Admin";
import PrivateRoutes from "../components/Private/PrivateRoutes";
import CommePage from "../pages/Commercial/CommePage";
import PersistantLogin from "../components/Private/PersistantLogin";
import Home from "../pages/Acceuil/Home";
import Object from "../pages/Object";
import ProfilPage from "../pages/Profil/ProfilPage";

const prime = import.meta.env.VITE_PRIME.split(" ");

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PersistantLogin />}>
        <Route element={<PrivateRoutes prime={prime[1]} />}>
          <Route path="/commercial/" element={<CommePage />} />
        </Route>
        <Route index path="/" element={<Home />} />
        <Route index path="/produits/*" element={<Layout />} />
        <Route element={<PrivateRoutes prime={prime[0]} />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>
        <Route element={<PrivateRoutes prime={prime[2]} />}>
          <Route path="/profile" element={<ProfilPage />} />
        </Route>
        <Route index path="/modèle-3D" element={<Object/>} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
