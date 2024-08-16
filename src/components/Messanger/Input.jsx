// import Img from "../../assets/png/img.png";
import Send from "../../assets/png/envoyer-le-message.png";
import { Field, Form, Formik } from "formik";
import { validationMessage } from "../../lib/utils/validationSchema";
import propTypes from "prop-types";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import useMessage from "../../hooks/useMessage";
import "./input.scss";
import PlusSVG from "../../assets/svg/PlusSVG";
import { useRef } from "react";
import Options from "./Options";
import { messageOptions } from "../../assets/js/options";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const initialValues = {
  message: "",
  file: null,
  img: null,
};

const Input = () => {
  const { socket } = useSocket();
  const { auth } = useAuth();
  const { chatter, setSendMessage } = useMessage();
  const plusRef = useRef();
  const optionsRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleSendMessage = async (values, errors, setField) => {
    if (
      (!errors.message || !errors.img || !errors.file) &&
      chatter?.ID_user &&
      auth?.id
    ) {
      try {
        const formData = new FormData();
        formData.append("text", values.message);

        if (values?.file && values.file?.length > 0) {
          for (let index = 0; index < values.file.length; index++) {
            formData.append("file", values.file[index]);
          }
        }

        if (values?.img && values.img?.length > 0) {
          for (let index = 0; index < values.img.length; index++) {
            formData.append("img", values.img[index]);
          }
        }
        formData.append("sender", auth?.id);
        formData.append("receiver", chatter.ID_user);
        await axiosPrivate.post("/message", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        socket.emit("sendMessage", {
          text: values.message,
          receiver: chatter.ID_user,
          sender: auth?.id,
        });
        setField("file", null);
        setField("img", null);
        setField("message", "");
        setSendMessage((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDisplayOptions = () => {
    optionsRef.current.classList.toggle("active");
    if (plusRef.current.className.includes("rotated")) {
      plusRef.current.classList.remove("rotated");
      plusRef.current.classList.add("return");
    } else {
      plusRef.current.classList.remove("return");
      plusRef.current.classList.add("rotated");
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
                  <div
                    className="plus-svg"
                    onClick={() => handleDisplayOptions()}
                    ref={plusRef}
                  >
                    <PlusSVG width="45" height="45" />
                  </div>
                  <Options
                    options={messageOptions}
                    setFieldValue={setFieldValue}
                    optionsRef={optionsRef}
                    handleChange={handleDisplayOptions}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleSendMessage(values, errors, setFieldValue);
                    }}
                    className={
                      values?.message || values?.file || values?.img
                        ? "button-send active"
                        : "button-send"
                    }
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
