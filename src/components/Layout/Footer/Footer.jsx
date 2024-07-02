import "./Footer.css";
import LogoEuro from "../../../assets/png/Logo_aluhd.png";

const Footer = () => {
  window.addEventListener("scroll", function () {
    const header = document.querySelector("#go-top");
    if (header) {
      header.classList.toggle("appear", this.window.scrollY > 400);
    }
  });

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
                <img
                  className="m-auto mb-5"
                  src={LogoEuro}
                  alt="Logo Europ'Alu Madagascar"
                  title="Logo Europ'Alu Madagascar"
                  loading="eager"
                  width={"25vw"}
                  height={"auto"}
                />
              </div>
              <div className="d__flex">
                <div className="contact">
                  <ul>
                    <li>
                      <a href="tel: 0340311786">
                        <pre>Andraharo : 034 03 11 786</pre>
                      </a>
                    </li>
                    <li>
                      <a href="tel: 0380902786">
                        <pre>Ankorondrano : 038 09 02 786</pre>
                      </a>
                    </li>
                    <li>
                      <a href="tel: 0345664786">
                        <pre>Tamatave : 034 56 64 786</pre>
                      </a>
                    </li>
                    <li>
                      <a href="tel: 0341420786">
                        <pre>Diego : 034 14 20 786</pre>
                      </a>
                    </li>
                    <li>
                      <a href="tel: 0340780786">
                        <pre>Majunga : 034 07 80 786</pre>
                      </a>
                    </li>
                    <li>
                      <a href="tel: 0341180786">
                        <pre>Nosy Be : 034 11 80 786</pre>
                      </a>
                    </li>
                    <li>
                      <a href="tel: 0345664786">
                        <pre>Tuléar : 034 56 64 786</pre>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="droite">
                  <p className="contact-email">
                    <a href="mailto:europ-alu@europ-alu.com">
                      europ-alu@europ-alu.com
                    </a>
                  </p>
                  <p className="contact-address">
                    {"Europ' Alu 2024 ALL RIGHTS"} <br />
                    {"RESERVED BY RAZAFINDRANORO Cedrico Elsior Arinony"}
                  </p>
                </div>
              </div>
              <ul className="contact-social">
                <li>
                  <a
                    href="https://www.facebook.com/europalumadagascar"
                    title="Facebook Europ'Alu Madagascar"
                  >
                    <i className="fa fa-facebook float_up mr-7"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/alu_europ"
                    title="Twitter Europ'Alu Madagascar"
                  >
                    <i className="fa fa-twitter float_up mr-5"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/europalu-madagascar"
                    title="LinkedIn Europ'Alu Madagascar"
                  >
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
