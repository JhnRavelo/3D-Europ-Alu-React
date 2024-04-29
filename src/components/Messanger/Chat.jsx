import Messages from "./Messages";
import Input from "./Input";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import useButtonContext from "../../hooks/useButtonContext";
import { useEffect } from "react";

const Chat = () => {
  const location = useLocation();
  const { commercialChat, setSender, setReceiver, dataPage } =
    useButtonContext();

  const handleOpenMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("visible");
  };

  useEffect(() => {
    if (commercialChat?.name) {
      setReceiver(commercialChat.ID_user);
      setSender(dataPage?.userRead[0]?.ID_user);
    }
  }, [commercialChat, location, dataPage]);

  return (
    <div className="chat">
      <div className="chatInfo">
        {commercialChat?.avatar && <img src={commercialChat?.avatar} alt="" />}
        <span>{commercialChat?.name}</span>

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
