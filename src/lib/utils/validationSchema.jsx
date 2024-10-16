import * as Yup from "yup";

const phoneRegEx =
  /^((\+\d{1,3}(-|)?\(?\d\)?(-|)?\d{1,3})|(\(?\d{2,3}\)?))(-|)?(\d{3,4})(-|)?(\d{4})((x|ext)\d{1,5}){0,1}(?=\d{1,10}$)/;

const validate = Yup.object({
  name: Yup.string().required("Vous devez mettre votre nom"),
  email: Yup.string()
    .required("Vous devez mettre votre adresse email")
    .email(`l'adresse email est invalide`),
  password: Yup.string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères")
    .matches(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule"
    )
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Le mot de passe doit être le même")
    .required("Le mot de passe doit être confirmer"),
  phone: Yup.string()
    .matches(phoneRegEx, "Numéro de téléphone invalide")
    .required("Le numéro de téléphone est requis"),
  checked: Yup.array()
    .of(Yup.string())
    .min(1, "Vous devez selectionner au moins un produit"),
  checkbox: Yup.boolean()
    .oneOf([true], "Veillez accepter la création de compte")
    .required("Veillez accepter la création de compte"),
  loginMail: Yup.string()
    .required("Vous devez mettre votre adresse email")
    .email(`l'adresse email est invalide`),

  loginPassword: Yup.string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères")
    .matches(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule"
    )
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
    .required("Le mot de passe est requis"),
  type: Yup.array()
    .of(Yup.string())
    .min(1, "Selectionnez un type")
    .max(1, "Selectionnez seulement un type"),
  updatePassword: Yup.string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères")
    .matches(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule"
    )
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  updateEmail: Yup.string()
    .required("Vous devez mettre votre adresse email")
    .email(`l'adresse email est invalide`),
  typeUser: Yup.string().required("Vous devez choisir"),
  avatar: Yup.mixed().required("Requis"),
});

const validationPage = Yup.object({
  page: Yup.string().required("Page est requis"),
  home: Yup.mixed().required("Home est requis"),
  icon: Yup.mixed().required("Icône est requis"),
  position: Yup.string()
    .required("Position requis")
    .matches(
      /^(-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?)$/,
      "Doit être de forme x,y,z"
    ),
  minYAngle: Yup.string()
    .required("Requis")
    .matches(/^-?\d+(\.\d+)?$/, "Doit être un nombre, peut être décimal"),
  maxYAngle: Yup.string()
    .required("Requis")
    .matches(/^-?\d+(\.\d+)?$/, "Doit être un nombre, peut être décimal"),
  maxXAngle: Yup.string()
    .required("Requis")
    .matches(/^-?\d+(\.\d+)?$/, "Doit être un nombre, peut être décimal"),
  minXAngle: Yup.string()
    .required("Requis")
    .matches(/^-?\d+(\.\d+)?$/, "Doit être un nombre, peut être décimal"),
});

const validationProduct = Yup.object({
  png: Yup.mixed().required("Requis"),
  pub: Yup.mixed().required("Requis"),
  gallery: Yup.mixed().required("Requis"),
  page: Yup.array()
    .of(Yup.string())
    .min(1, "Selectionnez une page")
    .max(1, "Selectionnez seulement un type"),
  description: Yup.string().required("Requis"),
  title: Yup.string().required("Requis"),
});

export const validationParticipation = Yup.object({
  fullName: Yup.string().required("Vous devez mettre votre nom"),
  email: Yup.string()
    .required("Vous devez mettre votre adresse email")
    .email(`l'adresse email est invalide`),
  phone: Yup.string()
    .matches(phoneRegEx, "Numéro de téléphone invalide")
    .required("Le numéro de téléphone est requis"),
});

export { validate, validationPage, validationProduct };
