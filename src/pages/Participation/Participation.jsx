import "./participation.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  participationFields,
  participationInitialValues,
} from "../../assets/js/participations";
import { validationParticipation } from "../../lib/utils/validationSchema";
// import defaultAxios from "../../api/axios";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import GameContainer from "../../components/Game/GameContainer/GameContainer";
import useParticipant from "../../hooks/useParticipant";

const Participation = () => {
  const { setParticipant } = useParticipant();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    setParticipant(values);
    // const formData = new FormData();
    // const valuesEntries = Object.entries(values);
    // valuesEntries.forEach(([key, value]) => {
    //   formData.append(`${key}`, value);
    // });
    navigate("/roulette");

    // try {
    //   const res = await defaultAxios.post("/participation", formData);

    //   if (res.data.success) {
    //     localStorage.setItem("partjeux", res.data.id);
    //   } else toast.error(res.data.message);
    // } catch (error) {
    //   toast.error("Erreur serveur introuvable!");
    //   console.log(error);
    // }
  };
  return (
    <>
      <Helmet>
        <title>Jeux - {"Europ'Alu Madagascar"}</title>
        <meta
          name="description"
          content="Formulaire pour le jeux créer par Europ'Alu pour donner des prix à ses clients."
        />
        <link rel="canonical" href="https://3d.europ-alu.com/jeux" />
      </Helmet>
      <GameContainer slug="form">
        <Formik
          initialValues={participationInitialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationParticipation}
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
                <ErrorMessage
                  name={field.name}
                  className="error"
                  component="p"
                />
              </div>
            ))}
            <button type="submit">Participer au jeux</button>
          </Form>
        </Formik>
      </GameContainer>
    </>
  );
};

export default Participation;
