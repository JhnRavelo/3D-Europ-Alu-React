import Img from "../../assets/png/img.png";
import Send from "../../assets/png/envoyer-le-message.png";
import { Field, Form, Formik } from "formik";
import { validationMessage } from "../../lib/utils/validationSchema";
import propTypes from "prop-types";
import defaultAxios from "../../api/axios";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import useMessage from "../../hooks/useMessage";

const initialValues = {
  message: "",
  file: null,
};

const Input = () => {
  const { socket } = useSocket();
  const { auth } = useAuth();
  const { chatter, setSendMessage } = useMessage();

  const handleSendMessage = async (values, errors, setField) => {
    if (!errors.message && chatter?.ID_user && values.message != "") {
      try {
        const formData = new FormData();
        formData.append("text", values.message);
        formData.append("file", values?.file ? values.file : null);
        formData.append("sender", auth?.id);
        formData.append("receiver", chatter.ID_user);
        await defaultAxios.post("/message", formData);
        socket.emit("sendMessage", {
          text: values.message,
          receiver: chatter.ID_user,
          sender: auth?.id,
        });
        setField("file", null);
        setField("message", "");
        setSendMessage((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {chatter?.ID_user && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationMessage}
        >
          {({ values, setFieldValue, errors }) => (
            <Form>
              <div className="input">
                <Field
                  autoComplete="off"
                  name="message"
                  type="text"
                  placeholder="Envoyer un message ..."
                  onKeyDown={(e) => {
                    e.code === "Enter" &&
                      handleSendMessage(values, errors, setFieldValue);
                  }}
                />
                <div className="send">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    accept="image/png, .svg, .jpeg, .jpg, .webp"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("file", e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="file">
                    <img
                      src={Img}
                      alt="image de gallery"
                      title="image de gallery"
                      loading="eager"
                      height={"26px"}
                      width={"auto"}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      handleSendMessage(values, errors, setFieldValue);
                    }}
                  >
                    <img
                      src={Send}
                      alt="image de flèche"
                      title="image de flèche"
                      loading="eager"
                      height={"26px"}
                      width={"auto"}
                    />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

Input.propTypes = {
  sender: propTypes.array,
};

export default Input;
