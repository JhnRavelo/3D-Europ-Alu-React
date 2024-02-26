import "./SignupType.scss";
import particular from "../../../assets/particular.png";
import entreprise from "../../../assets/entreprise.png";
import { useContext, useState } from "react";
import { ErrorMessage, Field} from "formik";
import FormContext from "../Form/FormContext";

const SignupType = () => {
  const formContext = useContext(FormContext);
  const [choixUser, setChoixUser] = useState(formContext[1].typeUser);
  const changeField = formContext[2]

  const handleChoixUser = (choix) => {
    setChoixUser(choix);
    changeField("typeUser", choix)
  };

  return (
    <>
      <div className="type" role="group" aria-labelledby="my-radio-group">
        <label
          onClick={() => handleChoixUser("Entreprise")}
          className={choixUser === "Entreprise" ? "selected" : ""}
        >
          <Field
            className="input__type"
            type="radio"
            name="typeUser"
            value="Entreprise"
            id="entreprise"
            // checked={choixUser === "Entreprise"}
          />
          <img src={entreprise} alt="logoentre" />
          <span>Entreprise</span>
        </label>
        <label
          onClick={() => handleChoixUser("Particulier")}
          className={choixUser === "Particulier" ? "selected" : ""}
        >
          <Field
            className="input__type"
            type="radio"
            name="typeUser"
            value="Particulier"
            id="particuler"
          />
          <img src={particular} alt="logopart" />
          <span>Particulier</span>
        </label>
      </div>
      <div>
        <ErrorMessage className="error" name="type" component={"p"} />
      </div>
    </>
  );
};

export default SignupType;
