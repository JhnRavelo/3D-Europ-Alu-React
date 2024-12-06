import { toast } from "react-toastify";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import FormContext from "../Form/FormContext";
import defaultAxios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useButtonContext from "../../../hooks/useButtonContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useSocket from "../../../hooks/useSocket";

const prime = import.meta.env.VITE_PRIME.split(" ");

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const [visible, setVisible] = useState(false);
  const loginMailRef = useRef();
  const loginPasswordRef = useRef();
  const location = useLocation();
  const { setAuth } = useAuth();
  const formContext = useContext(FormContext);
  const { showForm } = useButtonContext();
  const btnLoginRef = useRef();
  const { loginMail, loginPassword } = formContext[1];
  const errors = formContext[0];
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname;
  const { socket } = useSocket();

  useEffect(() => {
    const btnLogin = btnLoginRef.current;
    if (
      !loginMail ||
      !loginPassword ||
      errors.loginMail ||
      errors.loginPassword ||
      (loginError &&
        loginMailRef.current == loginMail &&
        loginPasswordRef.current == loginPassword)
    ) {
      btnLogin.classList.add("desabledBtn");
    } else {
      btnLogin.classList.remove("desabledBtn");
    }
  }, [loginMail, loginPassword, errors, loginError]);

  const handleLogin = async () => {
    const body = { loginMail: loginMail, loginPassword: loginPassword };
    loginMailRef.current = loginMail;
    loginPasswordRef.current = loginPassword;
    try {
      const res = await defaultAxios.post("/auth/login", body);

      if (res.data.success) {
        let role = res.data.user.role;
        setAuth(res.data.user);
        if (from) {
          navigate(from, { replace: true });
        } else {
          if (role == prime[0]) {
            navigate("/admin/user");
          } else if (role == prime[2] && location.pathname == "/") {
            navigate("/profile");
          } else if (role == prime[1]) {
            navigate("/commercial/");
          }
        }
        showForm();
        socket.emit("joinRoom", {
          room: prime[0],
        });
        socket.emit("connectUser", {
          loginMail: loginMail,
          room: prime[0],
        });
        toast.success("Vous êtes connecté.");
      } else {
        setLoginError(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Connexion impossible");
    }
  };

  const handleEnterPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const allInputs = document.querySelectorAll(".user-input");
      const currentInput = event.target;

      const currentIndex = Array.from(allInputs).indexOf(currentInput);

      if (currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
      } else {
        handleLogin();
      }
    }
  };

  return (
    <>
      <div className="fields">
        <div className="username">
          <FontAwesomeIcon icon={faEnvelope} className="fa fa-envelope" />
          <Field
            type="loginMail"
            name="loginMail"
            className="user-input loginMail-input"
            placeholder="Adresse email"
            inputMode="loginMail"
            autoComplete="off"
            onKeyPress={handleEnterPressed}
          />
        </div>
        {loginError ? (
          <p className="error login-name-error">{loginError}</p>
        ) : errors.loginMail ? (
          <p className="error login-name-error">{errors.loginMail}</p>
        ) : null}

        <div className="username" style={{ marginTop: "15px" }}>
          <FontAwesomeIcon icon={faKey} className="fa" />
          <Field
            type={visible ? "text" : "password"}
            name="loginPassword"
            inputMode="password"
            className="user-input loginPassword-input"
            placeholder="Mot de passe"
            autoComplete="off"
          />
          {visible ? (
            <AiOutlineEye
              className="absolute right-6 top-10 cursor-pointer"
              size={25}
              onClick={() => setVisible(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-6 top-10 cursor-pointer"
              size={25}
              onClick={() => setVisible(true)}
            />
          )}
        </div>
        {loginError ? (
          <p className="error login-name-error">{loginError}</p>
        ) : errors.loginPassword ? (
          <p className="error login-name-error">{errors.loginPassword}</p>
        ) : null}
      </div>

      <div className="buttons">
        <button
          type="button"
          ref={btnLoginRef}
          id="login-btn"
          className="form-button signin-button"
          onClick={handleLogin}
        >
          Se connecter
        </button>
      </div>
    </>
  );
};

export default Login;
