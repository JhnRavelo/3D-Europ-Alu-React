import { createContext, useState } from "react";
import propTypes from "prop-types";

const ButtonContext = createContext();

const ButtonProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [open, setOpen] = useState(false);

  const showForm = () => {
    if (show === false) {
      setShow(true);
      setOpen(true);
      const corps = document.querySelector(".corps");
      const userIcon = document.querySelector(".login__logout");
      if (corps) {
        corps.classList.add("none");
      }
      if (userIcon) {
        userIcon.style.pointerEvents = "none";
      }
    } else {
      setOpen(false);
      setTimeout(() => {
        setShow(false);
      }, 200);
      const corps = document.querySelector(".corps");
      const userIcon = document.querySelector(".login__logout");
      if (corps) {
        corps.classList.remove("none");
      }
      if (userIcon) {
        userIcon.style.pointerEvents = "all";
      }
    }
  };

  return (
    <ButtonContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        showForm,
        show,
        setShow,
        open,
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};

ButtonProvider.propTypes = {
  children: propTypes.any,
};

export { ButtonProvider };

export default ButtonContext;
