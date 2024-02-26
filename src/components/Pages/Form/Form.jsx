import "./Form.css";
import { Formik, Form } from "formik";
import SignupTemplate from "../Singup/SignupTemplate";
import FormContext from "./FormContext";
import { useEffect, useRef } from "react";
import { validate } from "../../../lib/utils/validationSchema";
import useButtonContext from "../../../hooks/useButtonContext";

const FormField = () => {
  const { open, selectedProduct, body } = useButtonContext();
  const formRef = useRef();
  
  const { name, email, phone } = body;

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
    name,
    email,
    password: "",
    confirmPassword: "",
    phone,
    checked: [selectedProduct],
    checkbox: true,
    loginMail: "",
    loginPassword: "",
    typeUser:"Particulier",
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
