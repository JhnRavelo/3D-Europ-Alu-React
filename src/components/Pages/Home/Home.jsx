/* eslint-disable react-hooks/exhaustive-deps */
import "./Home.css";
import { useEffect, useState } from "react";
import useExtractPageId from "../../../hooks/useExtractPageId";
import usePage from "../../../hooks/usePage";

const Home = () => {
  const [page, setPage] = useState({});
  const id = useExtractPageId();
  const { pages } = usePage();

  useEffect(() => {
    if (id && pages) {
      const page = pages.find((page) => page.ID_page == id);
      setPage(page);
    }
  }, [id, pages]);

  return (
    <>
      <section id="home" style={{ backgroundImage: `url(${page?.home})` }}>
        <div className="overlay"></div>
        <div className="demi-overlay"></div>
        <div className="gradient-overlay"></div>

        <div className="home-content-table">
          <div className="home-content-tablecell">
            <div className="row">
              <div className="col-twelve">
                <h3 className="animate-intro">{page?.page}</h3>
                <h1 className="animate-intro">
                  Architecture Moderne <br />
                  et Innovante
                </h1>

                <div className="more animate-intro">
                  <a className="smoothscroll button stroke" href="#produit">
                    Nos produits
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scrolldown">
          <a href="#produit" className="scroll-icon smoothscroll">
            Défiler
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
