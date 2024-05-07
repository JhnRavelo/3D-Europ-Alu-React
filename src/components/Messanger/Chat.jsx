/* eslint-disable react-hooks/exhaustive-deps */
import Messages from "./Messages";
import Input from "./Input";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import useMessage from "../../hooks/useMessage";

const Chat = () => {
  const location = useLocation();
  const { chatter } = useMessage();
  const handleOpenMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("visible");
  };

  return (
    <section id="message" className="chat">
      <div className="chatInfo">
        {chatter?.avatar && (
          <img
            src={chatter?.avatar}
            alt="image du compte profil client"
            title="image du compte profil client"
            loading="eager"
            height={"53px"}
            width={"53px"}
          />
        )}
        <span>{chatter?.name}</span>
        <button className="menuIcon" onClick={handleOpenMenu}>
          {location.pathname.includes("commercial") && (
            <FontAwesomeIcon className="burger" icon={faBars} />
          )}
          {location.pathname.includes("profile") && (
            <FontAwesomeIcon className="chevronChat" icon={faChevronLeft} />
          )}
        </button>
      </div>
      <Messages />
      <Input />
    </section>
  );
};

export default Chat;
