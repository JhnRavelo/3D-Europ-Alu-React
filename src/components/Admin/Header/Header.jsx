import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoEuro from "../../../assets/png/Logo_Euro.png";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import useAdminContext from "../../../hooks/useAdminContext";
import { useEffect, useRef, useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const { years, setYear, year, log, setNotifOpen, notifOpen } =
    useAdminContext();
  const { auth } = useAuth();
  const selectDate = useRef();
  const chevron = useRef();
  const notifRef = useRef();
  const [notif, setNotif] = useState(0);
  const [notifCompte, setNotifCompte] = useState(0);
  const [notifProduct, setNotifProduct] = useState(0);
  const [compteDate, setCompteDate] = useState("");
  const [productDate, setProductDate] = useState("");

  const handleVisibleSelectYear = () => {
    selectDate.current.classList.toggle("visible");
    chevron.current.classList.toggle("up");
  };

  const handleShowNotification = () => {
    notifRef.current.classList.toggle("showed");
    setNotif(0);
    if (notifOpen == true) {
      setNotifOpen(false);
    } else {
      setNotifOpen(true);
    }
  };

  const handleClickYear = (value) => {
    setYear(value.year);
    selectDate.current.classList.toggle("visible");
    chevron.current.classList.toggle("up");
  };

  useEffect(() => {
    if (log?.unReadLogNb) {
      setNotif(log?.unReadLogNb[0].count);
    } else {
      setNotif(0);
    }
    if (log?.productInterestedByYear) {
      setNotifProduct(log?.productInterestedByYear[0]?.count);
    } else {
      setNotifProduct(0);
    }
    if (log?.userCreatedByYear) {
      setNotifCompte(log?.userCreatedByYear[0]?.count);
    } else {
      setNotifCompte(0);
    }
    if (log?.listProductInterestedByYear) {
      log?.listProductInterestedByYear.map((item) => {
        if (item.user) {
          setCompteDate(item.date);
        } else {
          setProductDate(item.date);
        }
      });
    } else {
      setCompteDate("");
      setProductDate("");
    }
  }, [log]);

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoEuro} alt="logo" />
        <span>{"Europ'Alu"}</span>
      </div>
      {(pathname == "/admin/" ||
        pathname.includes("/admin/product/") ||
        pathname.includes("/admin/log")) && (
        <div className="date">
          <div className="selected__date">
            <h2 onClick={handleVisibleSelectYear}>Année {year}</h2>
            <FontAwesomeIcon
              ref={chevron}
              className="chevron"
              icon={faChevronDown}
              onClick={handleVisibleSelectYear}
            />
          </div>
          <div ref={selectDate} className="select__date">
            <Formik initialValues={{ year: year }}>
              {({ values }) => (
                <Form>
                  {years.length !== 0 &&
                    years.map((item, index) => (
                      <label
                        key={index}
                        onClick={() => handleClickYear(values)}
                      >
                        <Field name="year" type="radio" value={item.year} />
                        année {item.year}
                      </label>
                    ))}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <div className="icons">
        <div ref={notifRef} className="log">
          <Link to="/admin/log">
            <div className="journal" onClick={handleShowNotification}>
              <div>
                <h2>{"Nouveaux comptes crées"}</h2>
                <span> {notifCompte} </span>
              </div>
              <h2 className="date">{compteDate}</h2>
            </div>
          </Link>
          <Link to="/admin/log">
            <div className="journal" onClick={handleShowNotification}>
              <div>
                <h2>{"Derniers produits intéressés"}</h2>
                <span> {notifProduct} </span>
              </div>
              <h2 className="date">{productDate}</h2>
            </div>
          </Link>
        </div>
        <div className="notification" onClick={handleShowNotification}>
          {notif == 0 ? (
            <FontAwesomeIcon icon={faBell} className="bellIcon" />
          ) : (
            <FontAwesomeIcon icon={faBell} className="bellIcon" shake />
          )}
          {notif !== 0 && <span> {notif} </span>}
        </div>
        <div className="user">
          <img src={auth?.avatar} alt="" className="userIcon" />
          <span>{auth?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
