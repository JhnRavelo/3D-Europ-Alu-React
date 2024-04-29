import { Helmet } from "react-helmet-async";
import EuropExterior from "../../components/Object/EuropExterior";
import "./Object.css";
import Header from "../../components/Header/Header";

const Object = () => {
  return (
    <>
      <Helmet>
        <title>Modèle 3D - {"Europ'Alu Madagascar"}</title>
        <meta
          name="description"
          content="Modèle 3D d'un bâtiment avec les menuiseries aluminium : Fenêtre, Porte, Garde Corps, Baie,... et Habillages Façades"
        />
        <link rel="canonical" href="/modèle-3D" />
      </Helmet>
      <Header />
      <div className="container3D">
        <EuropExterior />
      </div>
    </>
  );
};

export default Object;
