/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import "./Form.scss";
import propTypes from "prop-types";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  validate,
  validationPage,
  validationProduct,
} from "../../../lib/utils/validationSchema";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import defaultAxios, { privateAxios } from "../../../api/axios";
import FileField from "./FileField";
import ListCheckboxField from "./ListCheckboxField";
import useButtonContext from "../../../hooks/useButtonContext";

const prime = import.meta.env.VITE_PRIME.split(" ");

const userInitialValue = {
  name: "",
  email: "",
  phone: "",
  password: "",
  type: [],
};

const commercialInitialValue = {
  name: "",
  email: "",
  phone: "",
  password: "",
  avatar: null,
};

const pageInitialValue = {
  page: "",
  home: null,
  icon: null,
  position: "",
  minYAngle: "",
  maxYAngle: "",
  maxXAngle: "",
  minXAngle: "",
};

const productInitialValue = {
  page: "",
  png: null,
  title: "",
  description: "",
  pub: null,
  gallery: null,
};

const FormContent = ({ btn, editRow, slug }) => {
  const { errors } = useFormikContext();

  useEffect(() => {
    const btnSubmit = btn.current;
    if (slug == "user" && !editRow) {
      if (
        errors.name ||
        errors.email ||
        errors.password ||
        errors.type ||
        errors.phone
      ) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    } else if (slug == "profile") {
      if (errors.name) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    } else if (slug == "commercial" && !editRow) {
      if (
        errors.name ||
        errors.email ||
        errors.password ||
        errors.avatar ||
        errors.phone
      ) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    } else if (slug == "commercial" && editRow) {
      if (errors.name || errors.updateEmail || errors.phone) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    } else if (slug == "user" && editRow) {
      if (errors.name || errors.updateEmail || errors.type || errors.phone) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    } else if (slug == "product" && editRow) {
      if (errors.page || errors.title || errors.description) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    } else if (slug == "page" && editRow) {
      if (
        errors.page ||
        errors.position ||
        errors.minXAngle ||
        errors.maxXAngle ||
        errors.minYAngle ||
        errors.maxYAngle
      ) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    } else {
      if (Object.keys(errors).length !== 0) {
        btnSubmit.classList.add("desabledBtn");
      } else {
        btnSubmit.classList.remove("desabledBtn");
      }
    }
  }, [errors, editRow, slug, btn]);
};

const FormAdd = (props) => {
  const validateRef = useRef();
  const btnSubmitRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [btnName, setbtnName] = useState("Envoyer");
  const [formTitle, setFormTitle] = useState("Ajouter nouveau");
  const valueRef = useRef();
  const folderRef = useRef();
  const listPageRef = useRef([]);
  const {socket} = useButtonContext()

  useEffect(() => {
    handleTitle();
    handleListPage();
  }, []);

  const handleInitialValue = () => {
    var initial;
    if (props.editRow) {
      const value = props.editRow;
      if (props.slug == "user") {
        initial = {
          name: value.name,
          updateEmail: value.email,
          phone: value.phone,
          updatePassword: "",
          type: [value.type],
        };
      } else if (props.slug == "commercial") {
        initial = {
          name: value.name,
          updateEmail: value.email,
          phone: value.phone,
          updatePassword: "",
          avatar: null,
        };
      } else if (props.slug == "page") {
        initial = {
          page: value.page,
          home: null,
          icon: null,
          position: value.position,
          minYAngle: value.minYAngle,
          maxYAngle: value.maxYAngle,
          maxXAngle: value.maxXAngle,
          minXAngle: value.minXAngle,
        };
      } else if (props.slug == "product") {
        initial = {
          page: [value.page],
          png: null,
          title: value.title,
          description: value.description,
          pub: null,
          gallery: null,
        };
      } else if (props.slug == "profile") {
        initial = {
          name: value.name,
          avatar: null,
        };
      }
    } else {
      if (props.slug == "user") {
        initial = userInitialValue;
      } else if (props.slug == "commercial") {
        initial = commercialInitialValue;
      } else if (props.slug == "page") {
        initial = pageInitialValue;
      } else if (props.slug == "product") {
        initial = productInitialValue;
      }
    }
    return initial;
  };

  valueRef.current = handleInitialValue();

  const onSubmit = async (values) => {
    socket.emit("formAdd", {values})
    try {
      if (props.slug == "profile") {
        const formData = new FormData();
        formData.append("id", props.editRow.id);
        formData.append("name", values.name);
        if (values.avatar) {
          formData.append("avatar", values.avatar);
        }

        const res = await privateAxios.put(`${props.url}/pro`, formData);
        await defaultAxios.put(`${props.url}/upload`, formData);

        if (res.data == "Utilisateur modifié") {
          props.setOpen(false);
        }
      }

      if (props.editRow) {
        if (props.slug == "user" || props.slug == "commercial") {
          const formData = new FormData();
          formData.append("id", props.editRow.id);
          formData.append("name", values.name);
          if (props.slug == "commercial") {
            formData.append("role", prime[1]);
          } else if (props.slug == "user") {
            formData.append("type", values.type);
          }
          formData.append("updateEmail", values.updateEmail);
          if (values.updatePassword !== "") {
            formData.append("updatePassword", values.updatePassword);
          }
          if (values.avatar) {
            formData.append("avatar", values.avatar);
          }
          formData.append("phone", values.phone);

          const res = await privateAxios.put(`${props.url}`, formData);
          await defaultAxios.put(
            `${props.url}/upload`,
            formData
          );

          if (res.data == "Utilisateur modifié") {
            props.setOpen(false);
            props.setEditRow(null);
          }
        } else if (props.slug == "page") {
          const formData = new FormData();
          formData.append("id", props.editRow.id);
          formData.append("home", values.home);
          formData.append("icon", values.icon);
          formData.append("page", values.page);
          formData.append("position", values.position);
          formData.append("minYAngle", values.minYAngle);
          formData.append("maxYAngle", values.maxYAngle);
          formData.append("maxXAngle", values.maxXAngle);
          formData.append("minXAngle", values.minXAngle);

          const res = await privateAxios.put(`${props.url}`, formData);

          await defaultAxios.put(
            `${props.url}/upload`,
            formData
          );

          if (res.data == `Page modifié`) {
            props.setOpen(false);
            props.setEditRow(null);
          }
        } else if (props.slug == "product") {
          const formData = new FormData();
          formData.append("id", props.editRow.id);
          formData.append("page", values.page);
          formData.append("png", values.png);
          formData.append("pub", values.pub);
          formData.append("description", values.description);
          formData.append("title", values.title);
          if (values?.gallery?.length) {
            for (let i = 0; i < values.gallery.length; i++) {
              formData.append("gallery", values.gallery[i]);
            }
          }
          const res = await axiosPrivate.put(`${props.url}`, formData);

          await defaultAxios.put("/product/upload", formData);
          if (res.data == "Produit modifié") {
            props.setOpen(false);
            props.setEditRow(null);
          }
        }
      } else {
        if (props.slug == "user" || props.slug == "commercial") {
          const formData = new FormData();
          formData.append("name", values.name);
          if (props.slug == "commercial") {
            formData.append("role", prime[1]);
          } else {
            formData.append("type", values.type);
          }
          formData.append("email", values.email);
          formData.append("password", values.password);
          formData.append("avatar", values.avatar);
          formData.append("phone", values.phone);

          const res = await privateAxios.post(`${props.url}`, formData);
          await defaultAxios.put(
            `${props.url}/upload`,
            formData
          );

          if (res.data == `Utilisateur ajouté`) {
            props.setOpen(false);
            props.setEditRow(null);
          }
        } else if (props.slug == "page") {
          const formData = new FormData();
          formData.append("home", values.home);
          formData.append("icon", values.icon);
          formData.append("page", values.page);
          formData.append("position", values.position);
          formData.append("minYAngle", values.minYAngle);
          formData.append("maxYAngle", values.maxYAngle);
          formData.append("maxXAngle", values.maxXAngle);
          formData.append("minXAngle", values.minXAngle);

          const res = await privateAxios.post(`${props.url}`, formData);

          await defaultAxios.post(
            `${props.url}/upload`,
            formData
          );

          if (res.data == `Page ajouté`) {
            props.setOpen(false);
            props.setEditRow(null);
          }
        } else if (props.slug == "product") {
          const formData = new FormData();
          formData.append("page", values.page);
          formData.append("png", values.png);
          formData.append("pub", values.pub);
          formData.append("description", values.description);
          formData.append("title", values.title);
          for (let i = 0; i < values.gallery.length; i++) {
            formData.append("gallery", values.gallery[i]);
          }
          const res = await privateAxios.post(`${props.url}`, formData);
  
          await defaultAxios.post(
            `${props.url}/upload`,
            formData
          );

          if (res.data == "Produit ajouté") {
            props.setOpen(false);
            props.setEditRow(null);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTitle = () => {
    if (props.editRow) {
      setFormTitle("Modifier");
      setbtnName("Modifier");
    } else {
      setFormTitle("Ajouter nouveau");
      setbtnName("Envoyer");
    }
  };

  const handleValidate = () => {
    if (props.slug == "user" || props.slug == "commercial") {
      return validate;
    } else if (props.slug == "page") {
      return validationPage;
    } else if (props.slug == "product") {
      return validationProduct;
    }
  };

  const handlePassword = () => {
    if (props.editRow) {
      return {
        placeholder: "ne changera pas si vide",
        name: "updatePassword",
      };
    } else {
      return {
        placeholder: "Mot de passe",
        name: "password",
      };
    }
  };
  const handleEmail = () => {
    var mail;
    if (props.editRow) {
      mail = "updateEmail";
    } else {
      mail = "email";
    }
    return mail;
  };

  const handleListPage = async () => {
    listPageRef.current = [];
    try {
      if (props.slug == "product") {
        const res = await defaultAxios.get("/page");

        res.data.map((res) => {
          if (res?.page) {
            listPageRef.current.push(res.page);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  validateRef.current = handleValidate();
  emailRef.current = handleEmail();
  passwordRef.current = handlePassword();

  return (
    <div className="add">
      <div className="modal">
        <span
          className="close"
          onClick={() => {
            if (props.slug == "profile") {
              props.setOpen(false);
            } else {
              props.setOpen(false);
              props.setEditRow(null);
            }
          }}
        >
          X
        </span>
        <h1>
          {formTitle} {props.slug}
        </h1>
        <Formik
          validationSchema={validateRef.current}
          initialValues={valueRef.current}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <FormContent
                btn={btnSubmitRef}
                slug={props.slug}
                editRow={props.editRow}
              />
              {props.columns
                .filter(
                  (item) =>
                    item.field !== "id" &&
                    item.field !== "img" &&
                    item.field !== "connected" &&
                    item.field !== "createdAt"
                )
                .map((column, index) => {
                  // handlePlaceholder(column)
                  if (column.headerName == "Type") {
                    return (
                      <Fragment key={index}>
                        <ListCheckboxField
                          type={values.type}
                          title="Type"
                          arrays={["Entreprise", "Particulier"]}
                          name="type"
                        />
                      </Fragment>
                    );
                  } else if (
                    column.field == "page" &&
                    props.slug == "product"
                  ) {
                    return (
                      <Fragment key={index}>
                        <ListCheckboxField
                          type={values.page ? values.page : ""}
                          title="Page"
                          arrays={
                            listPageRef.current ? listPageRef.current : []
                          }
                          name="page"
                        />
                      </Fragment>
                    );
                  } else if (column.field == "email") {
                    return (
                      <div className="item" key={index}>
                        <label>{column.headerName}</label>
                        <Field
                          type={column.type}
                          name={emailRef.current}
                          inputMode={column.inputMode}
                          placeholder={column.placeholder}
                        />
                        <ErrorMessage
                          name={emailRef.current}
                          component={"p"}
                          className="error"
                        />
                      </div>
                    );
                  } else if (column.field == "password") {
                    return (
                      <div className="item" key={index}>
                        <label>{column.headerName}</label>
                        <Field
                          type={column.type}
                          name={passwordRef.current.name}
                          inputMode={column.inputMode}
                          placeholder={passwordRef.current.placeholder}
                        />
                        <ErrorMessage
                          name={passwordRef.current.name}
                          component={"p"}
                          className="error"
                        />
                      </div>
                    );
                  } else if (
                    column.field == "home" ||
                    column.field == "icon" ||
                    column.field == "png" ||
                    column.field == "pub" ||
                    column.field == "gallery" ||
                    column.field == "avatar"
                  ) {
                    if (column.field !== "gallery") {
                      folderRef.current = false;
                    } else {
                      folderRef.current = true;
                    }
                    return (
                      <div className="item" key={index}>
                        <label>{column.headerName}</label>
                        <FileField
                          name={column.field}
                          setFieldValue={setFieldValue}
                          accept={"image/png, .svg, .jpeg, .jpg, .webp"}
                          folder={folderRef.current}
                          value={values}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="item" key={index}>
                        <label>{column.headerName}</label>
                        <Field
                          type={column.type}
                          name={column.field}
                          inputMode={column.inputMode}
                          placeholder={column.placeholder}
                        />
                        <ErrorMessage
                          name={column.field}
                          component={"p"}
                          className="error"
                        />
                      </div>
                    );
                  }
                })}
              <button
                ref={btnSubmitRef}
                onClick={() => {
                  onSubmit(values);
                }}
                type="button"
                className="desabledBtn"
              >
                {btnName}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

FormAdd.propTypes = {
  setOpen: propTypes.any,
  columns: propTypes.any,
  slug: propTypes.string,
  editRow: propTypes.any,
  setEditRow: propTypes.any,
  url: propTypes.string,
};

export default FormAdd;
