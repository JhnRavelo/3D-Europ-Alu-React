import { ErrorMessage, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import propTypes from "prop-types";
import userForm from "../../../assets/json/userForm.json";
import { useEffect, useRef } from "react";
import SignupType from "./SignupType";

const icon = [faUser, faEnvelope, "", faPhone];

const SignupStepTemplate = ({ index }) => {
  const fieldRef = useRef();

  useEffect(() => {
    const fieldError = fieldRef.current.childNodes[1];

    if (fieldError) {
      fieldError.style.display = "none";
    }
  }, [index]);

  const handleClick = () => {
    const fieldError = fieldRef.current.childNodes[1];

    if (fieldError) {
      fieldError.style.display = "block";
    }
  };

  return (
    <>
      {index == 0 && <SignupType />}
      <div className="fields" ref={fieldRef}>
        <div className="username" onClick={handleClick}>
          <FontAwesomeIcon icon={icon[index]} className="fa fa-user" />
          <Field
            type={userForm[index].type}
            className="user-input"
            name={userForm[index].name}
            autoComplete="off"
            required
            inputMode={userForm[index].inputMode}
            placeholder={userForm[index].placeholder}
          />
        </div>
        <ErrorMessage
          className="error name-error"
          name={userForm[index].name}
          component={"p"}
        />
      </div>
    </>
  );
};

SignupStepTemplate.propTypes = {
  index: propTypes.number,
};

export default SignupStepTemplate;
