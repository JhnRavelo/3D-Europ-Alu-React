/* eslint-disable react-hooks/exhaustive-deps */
import "./participation.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  participationFields,
  participationInitialValues,
} from "../../assets/js/participations";
import { validationParticipation } from "../../lib/utils/validationSchema";
import defaultAxios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import GameContainer from "../../components/Game/GameContainer/GameContainer";
import useParticipant from "../../hooks/useParticipant";
import { useEffect } from "react";
import useGetParticipation from "../../hooks/useGetParticipation";

const Participation = () => {
  const { setParticipant } = useParticipant();
  const navigate = useNavigate();
  const getParticipation = useGetParticipation();

  const handleSubmit = async (values) => {
    setParticipant(values);

    try {
      const res = await defaultAxios.post("/participation", values);

      if (res.data.success) {
        navigate("/roulette");
      } else toast.error(res.data.message);
    } catch (error) {
      toast.error("Erreur serveur introuvable!");
      console.log(error);
    }
  };

  useEffect(() => {
    getParticipation("/roulette");
  }, []);

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
