import "./participation.scss";
import logoEuro from "../../assets/png/logo EUROP'ALU-5.png";
import { Field, Form, Formik } from "formik";
import {
  participationFields,
  participationInitialValues,
} from "../../assets/js/participations";
// import defaultAxios from "../../api/axios";

const Participation = () => {

  const handleSubmit = async (values) => {
    const formData = new FormData();
    const valuesEntries = Object.entries(values);
    valuesEntries.forEach(([key, value]) => {
      formData.append(`${key}`, value);
    });

    // try {
    //   const res = await defaultAxios.post("/participation", formData);

    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div className="participation-container">
      <div className="participation-content">
        <div className="participation-img-container">
          <img src={logoEuro} alt="logo Europ'Alu" />
        </div>
        <Formik
          initialValues={participationInitialValues}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form>
            {participationFields.map((field, index) => (
              <div key={index} className="participation-input-container">
                <div className="participation-input-icon">{field.SVG}</div>
                <Field
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <button type="submit">Participer au jeux</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Participation;
