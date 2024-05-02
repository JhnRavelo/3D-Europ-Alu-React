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
    <div className="chat">
      <div className="chatInfo">
        {chatter?.avatar && (
          <img src={chatter?.avatar} alt="image du compte profil" />
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
    </div>
  );
};

export default Chat;
