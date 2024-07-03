/* eslint-disable react-hooks/exhaustive-deps */
import "./Home.css";
import { useEffect, useState } from "react";
import useExtractPageId from "../../../hooks/useExtractPageId";
import usePage from "../../../hooks/usePage";
import { Helmet } from "react-helmet-async";
import useProduct from "../../../hooks/useProduct";
import { useParams } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState({});
  const [allProducts, setAllProducts] = useState("");
  const [title, setTitle] = useState("");
  const id = useExtractPageId();
  const { pages } = usePage();
  const { products } = useProduct();
  const { link } = useParams();

  useEffect(() => {
    if (id && pages && products) {
      const page = pages.find((page) => page.ID_page == id);
      setPage(page);
      const allProducts = products.map((product) => product.title);
      setAllProducts(allProducts.join(", "));
      const title =
        id == 5 || id == 6 || id == 10 || id == 11
          ? "Menuiserie aluminium " + page?.page
          : id == 7
          ? "Habillages Façades"
          : page?.page;
      setTitle(title);
    }
  }, [id, pages, products]);

  return (
    <>
      <Helmet>
        <title>{page?.page + " - Europ'Alu Madagascar"}</title>
        <meta
          name="description"
          content={
            id != 7
              ? (
                  "Menuiserie Aluminium pour " +
                  page?.page +
                  " comme: " +
                  allProducts
                ).slice(0, 170)
              : ("Habillages Façades comme: " + allProducts).slice(0, 170)
          }
        />
        <link rel="canonical" href={`https://3d.europ-alu.com/produits/${link}`} />
        <meta
          name="keywords"
          content={
            "europ'alu, menuiserie aluminium, habillage façade, produit aluminium, europ'alu 3D, " +
            allProducts
          }
        />
      </Helmet>
      <section id="home" style={{ backgroundImage: `url(${page?.home})` }}>
        <div className="overlay"></div>
        <div className="demi-overlay"></div>
        <div className="gradient-overlay"></div>
        <div className="home-content-table">
          <div className="home-content-tablecell">
            <div className="row">
              <div className="col-twelve">
                <h1 className="animate-intro">{title}</h1>
                <h2 className="animate-intro">
                  Architecture Moderne <br />
                  et Innovante
                </h2>
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
