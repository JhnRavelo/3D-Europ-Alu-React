import "./Footer.css";
import LogoEuro from "../../../assets/Logo_aluhd.png";

const Footer = () => {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("#go-top");
    if (header) {
      header.classList.toggle("appear", this.window.scrollY > 400);
    }
  });

  const texthaut = "Europ' Alu 2018 ALL RIGHTS";
  const textbas = "RESERVED BY Ankasitrahina";

  return (
    <>
      <footer id="foot">
        <section id="contact" className="s-contact target-section">
          <div className="grid-overlay">
            <div></div>
          </div>

          <div className="row contact-main" data-aos="fade-up">
            <div className="col-full">
              <div className="logo__foot">
                <img className="m-auto mb-5" src={LogoEuro} alt="Logo" />
              </div>
              <div className="d__flex">
                <div className="contact">
                  <ul>
                    <li>
                      <pre>Andraharo : 034 03 11 786</pre>
                    </li>
                    <li>
                      <pre>Tamatave : 034 56 64 786</pre>
                    </li>
                    <li>
                      <pre>Majunga : 034 07 80 786</pre>
                    </li>
                    <li>
                      <pre>Nosy Be : 034 11 80 786</pre>
                    </li>
                  </ul>
                </div>
                <div className="droite">
                  <p className="contact-email">
                    <a href="mailto:#0">europ-alu@europ-alu.com</a>
                  </p>
                  <p className="contact-address">
                    {texthaut} <br />
                    {textbas}
                  </p>
                </div>
              </div>

              <ul className="contact-social">
                <li>
                  <a>
                    <i className="fa fa-facebook float_up mr-7"></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i className="fa fa-twitter float_up mr-5"></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i className="fa fa-linkedin float_up"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div id="go-top">
          <a title="Back to Top" href="#">
            <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
