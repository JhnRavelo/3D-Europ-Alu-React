import "./Form.css";
import { Formik, Form } from "formik";
import SignupTemplate from "../Singup/SignupTemplate";
import FormContext from "./FormContext";
import { useEffect, useRef } from "react";
import { validate } from "../../../lib/utils/validationSchema";
import useButtonContext from "../../../hooks/useButtonContext";
import useAuth from "../../../hooks/useAuth";

const FormField = () => {
  const { open, selectedProduct } = useButtonContext();
  const { auth } = useAuth();
  const formRef = useRef();

  useEffect(() => {
    const form = formRef.current;

    if (open) {
      setTimeout(() => {
        form.classList.add("active");
      }, 200);
    } else {
      form.classList.remove("active");
    }
  }, [open]);

  const iniatialValues = {
    name: auth?.name,
    email: auth?.email,
    password: "",
    confirmPassword: "",
    phone: auth?.phone,
    checked: [selectedProduct],
    checkbox: true,
    loginMail: "",
    loginPassword: "",
    typeUser: "Particulier",
  };
  return (
    <section id="form" ref={formRef}>
      <div className="overlay"></div>
      <div className="multi-step-form">
        <Formik initialValues={iniatialValues} validationSchema={validate}>
          {({ errors, values, setFieldValue }) => (
            <FormContext.Provider value={[errors, values, setFieldValue]}>
              <Form>
                <SignupTemplate />
              </Form>
            </FormContext.Provider>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default FormField;
