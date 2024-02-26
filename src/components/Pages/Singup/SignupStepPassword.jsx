import { ErrorMessage, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const SignupStepPassword = () => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  return (
    <>
      <div className="fields">
        <div className="username">
          <FontAwesomeIcon icon={faKey} className="fa fa-user" />
          <Field
            type={visiblePass ? "text" : "password"}
            className="user-input"
            name="password"
            autoComplete="off"
            required
            placeholder="Mot de passe"
          />
          {visiblePass ? (
            <AiOutlineEye
              className="absolute right-6 top-10 cursor-pointer"
              size={25}
              onClick={() => setVisiblePass(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-6 top-10 cursor-pointer"
              size={25}
              onClick={() => setVisiblePass(true)}
            />
          )}
        </div>
        <ErrorMessage
          className="error name-error"
          name="password"
          component={"p"}
        />
        <div className="username" style={{ marginTop: "15px" }}>
          <FontAwesomeIcon icon={faKey} className="fa fa-user" />
          <Field
            type={visibleConfirm ? "text" : "password"}
            className="user-input"
            name="confirmPassword"
            autoComplete="off"
            required
            inputMode="password"
            placeholder="Confirmez votre mot de passe"
          />
          {visibleConfirm ? (
            <AiOutlineEye
              className="absolute right-6 top-10 cursor-pointer"
              size={25}
              onClick={() => setVisibleConfirm(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-6 top-10 cursor-pointer"
              size={25}
              onClick={() => setVisibleConfirm(true)}
            />
          )}
        </div>
        <ErrorMessage
          className="error name-error"
          name="confirmPassword"
          component={"p"}
        />
      </div>
    </>
  );
};

export default SignupStepPassword;
