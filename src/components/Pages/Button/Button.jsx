import { useRef } from "react";
import "./Button.css";
import useButtonContext from "../../../hooks/useButtonContext";

const Button = () => {
  const btnRef = useRef();
  const { setSelectedProduct, showForm } = useButtonContext();

  const handleClick = async () => {  
    showForm();
    setSelectedProduct(btnRef.current.parentElement.querySelector("h1").textContent);
  };

  return (
    <>
      <button ref={btnRef} onClick={() => handleClick()} className="show-modal">
        Intéressé ?
      </button>
    </>
  );
};

export default Button;
