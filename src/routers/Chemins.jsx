import { Route, Routes } from "react-router-dom";
import Page from "../pages/Page/Page";
import ProfilPage from "../pages/Profil/ProfilPage";
import PrivateRoutes from "../components/Private/PrivateRoutes";
import Object from "../pages/Object";

const prime = import.meta.env.VITE_PRIME.split(" ");

const Chemins = () => {
  return (
    <Routes>
      <Route path="/:id" element={<Page />} />
        <Route element={<PrivateRoutes prime={prime[2]} />}>
          <Route path="/profile" element={<ProfilPage />} />
        </Route>
      <Route path="/" element={<Object />} />
    </Routes>
  );
};

export default Chemins;
