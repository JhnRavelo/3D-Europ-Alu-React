import "./Home.scss";
import { Link } from "react-router-dom";
import Form from "../../components/Pages/Form/Form";
import useButtonContext from "../../hooks/useButtonContext";
import logoEuro from "../../assets/png/logo_ea.png";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { show, showForm } = useButtonContext();

  return (
    <>
      <Helmet>
        <title>Accueil</title>
        <meta
          name="description"
          content="Depuis 2005, Europ'Alu s'est imposée comme La référence de Madagascar en termes de menuiseries aluminium et d'habillage de façade."
        />
        <link rel="canonical" href="https://3d.europ-alu.com" />
      </Helmet>
      <div id="home__page">
        <div className="body"></div>
        <div className="flou"></div>
        <div className="header__home__page">
          {/* <div className="logo__home">
            <img
              src={logoEuro}
              alt="logo d'Europ'Alu Madagascar"
              width="240px"
              height="auto"
              title="logo d'Europ'Alu Madagascar"
              loading="eager"
            />
          </div> */}
        </div>
        <div className="body__home__page">
          <section className="intro" id="historique">
            {/* <h1 className="intro__h1">
              Innovation Continue <span>.</span>
            </h1>
            <p className="intro__p">
              La menuiserie aluminium qui révolutionne la construction à
              Madagascar, avec des produits de qualité, sur mesure et conformes
              aux normes européennes.
            </p> */}
            <div className="button button__intro">
              {/* <Link to="/modèle-3D">
                <div className="start">Commencer</div>
              </Link> */}
              <div
                className="start connect"
                onClick={() => {
                  showForm();
                }}
              >
                Se connecter
              </div>
            </div>
          </section>
        </div>
        {show && <Form />}
      </div>
    </>
  );
};

export default Home;
