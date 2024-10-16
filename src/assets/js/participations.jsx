import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const participationFields = [
  {
    type: "text",
    name: "fullName",
    placeholder: "Veuillez mettre votre nom complet",
    header: "Nom complet",
    SVG: <FontAwesomeIcon icon={faUser} />
  },
  {
    type: "text",
    name: "email",
    placeholder: "Veuillez mettre votre adresse email",
    header: "Adresse email",
    SVG: <FontAwesomeIcon icon={faEnvelope} />
  },
  {
    type: "text",
    name: "phone",
    placeholder: "Veuillez mettre votre numéro de téléphone",
    header: "Numéro de téléphone",
    SVG: <FontAwesomeIcon icon={faPhone} />
  },
];

export const participationInitialValues = {
  fullName: "",
  email: "",
  phone: "",
}
