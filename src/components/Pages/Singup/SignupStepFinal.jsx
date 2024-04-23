import {
  faChevronDown,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import FormContext from "../Form/FormContext";
import { ErrorMessage, Field } from "formik";
import { addTraker } from "../../../lib/service/Trakers";
import useAuth from "../../../hooks/useAuth";
import useButtonContext from "../../../hooks/useButtonContext";
import defaultAxios from "../../../api/axios";
import useProductContext from "../../../hooks/useProductContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const prime = import.meta.env.VITE_PRIME.split(" ");

const SignupStepFinal = () => {
  const { selectedProduct, showForm, socket } = useButtonContext();
  const formContext = useContext(FormContext);
  const btnListRef = useRef();
  const btnSubmitRef = useRef();
  const checkboxRef = useRef([]);
  const [productSelected, setproductSelected] = useState(selectedProduct);
  const { setAuth, auth } = useAuth();
  const { dataFetch } = useProductContext();
  const errors = formContext[0];
  const location = useLocation();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(null);

  checkboxRef.current = [];
  const { name, email, phone, checked } = formContext[1];

  useEffect(() => {
    var btnSubmit = btnSubmitRef.current;
    if (errors.checked || errors.checkbox) {
      btnSubmit.classList.add("desabledBtn");
    } else {
      btnSubmit.classList.remove("desabledBtn");
    }
  }, [errors]);

  const handleListClick = () => {
    const btnList = btnListRef.current;
    btnList.classList.toggle("open");
  };

  const addtoRefsCheck = (el) => {
    if (el && !checkboxRef.current.includes(el)) {
      checkboxRef.current.push(el);
    }
  };
  const handleClickList = () => {
    const arrayChecked = [];
    checkboxRef.current.map((checkbox) => {
      arrayChecked.push(checkbox.childNodes[0].checked);
      if (checkbox.childNodes[0].checked) {
        setproductSelected(checkbox.childNodes[1].textContent);
      }
    });
    const count = arrayChecked.reduce((acc, currentValue) => {
      if (currentValue === true) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    if (!arrayChecked.includes(true)) {
      setproductSelected("Aucun produit selectionné");
    } else if (count > 1) {
      setproductSelected(`${count} produits selectionnés`);
    }
  };

  const onSubmit = async () => {
    try {
      let res, track;
      if (!auth?.name) {
        res = await defaultAxios.post("/auth", formContext[1]);
        if (res.data.success) {
          setAuth({
            role: res.data.role,
            accessToken: res.data.accessToken,
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            avatar: res.data.avatar,
            id: res.data.id,
          });
          if (checked[0] !== "") {
            track = await addTraker(formContext[1]);
          }
        } else {
          setRegisterError(res.data.message);
        }
      } else {
        if (checked[0] !== "") {
          track = await addTraker(formContext[1]);
        }
      }

      socket.emit("UserInterested", {
        body: auth,
        value: formContext[1],
        room: prime[0],
      });

      if (res?.data?.success && location.pathname != "/") {
        showForm();
        toast.success("Votre compte a bien été créé.");
      }
      if (res?.data?.success && location.pathname == "/") {
        showForm();
        toast.success("Votre compte a bien été créé.");
        navigate("/pageProd");
      }

      if (track?.success && location.pathname != "/") {
        showForm();
        toast.success("Votre produit a bien été ajouté");
      }
    } catch (error) {
      toast.error("Erreur du server");
      console.log(error);
    }
  };

  return (
    <>
      <div className="pre-info">
        <div className="nom">
          <FontAwesomeIcon icon={faUser} className="fa fa-user" />
          <p id="nom">{name}</p>
        </div>
        <div className="email">
          <FontAwesomeIcon icon={faEnvelope} className="fa fa-user" />
          <p id="email">{email}</p>
        </div>
        <div className="phone">
          <FontAwesomeIcon icon={faPhone} className="fa fa-user" />
          <p id="phone">{phone}</p>
        </div>
      </div>
      {dataFetch && location.pathname.includes("page") && (
        <div className="menu-deroulant">
          <label>Produits qui vous Intérèssent :</label>

          <div className="container">
            <div
              className="select-btn"
              ref={btnListRef}
              onClick={handleListClick}
            >
              <span className="btn-text">{productSelected}</span>
              <span className="arrow-dwn">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="fa-solid fa-chevron-down"
                />
              </span>
            </div>

            <ul className="list-items">
              {dataFetch.map((product, index) => {
                return (
                  <Fragment key={index}>
                    <label className="item" ref={addtoRefsCheck}>
                      <Field
                        className="checkbox"
                        type="checkbox"
                        name="checked"
                        value={product.title}
                        onClick={handleClickList}
                      />
                      <span className="item-text">{product.title}</span>
                    </label>
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <ErrorMessage
        name="checked"
        component={"p"}
        className="notSelectedProduit"
      />

      <div className="check">
        {!auth?.name && (
          <label>
            <Field id="acceptCheckbox" type="checkbox" name="checkbox" />
            {"Cette action va vous créer un compte chez Europ'Alu"}
          </label>
        )}
      </div>
      <div className="buttons">
        <button
          ref={btnSubmitRef}
          id="submitBtn"
          type="button"
          className="form-button signin-button"
          onClick={onSubmit}
        >
          Envoyer
        </button>
      </div>
      <ErrorMessage
        component={"p"}
        name="checkbox"
        className="errorNotChecked"
      />
      {registerError && <p className="errorNotChecked">{registerError}</p>}
    </>
  );
};

export default SignupStepFinal;
