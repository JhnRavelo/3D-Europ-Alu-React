import "./ProfilPage.css";
import "./ProfilPage.scss";
import { useState } from "react";
import UserProfileCard from "../../components/Profils/UserProfileCard/UserProfileCard";
import Cart from "../../components/Profils/Cart/Cart";
import useButtonContext from "../../hooks/useButtonContext";
import Chat from "../../components/Messanger/Chat";
import Pub from "../../components/Profils/Pub/Pub";
import handleLastMessage from "../../lib/utils/handleLastMessage";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import handleClassNewMessage from "../../lib/utils/handleClassNewMessage";

const ProfilPage = () => {
  const [chatOrCart, setChatOrCart] = useState("vide");
  const { dataPage, commercials, setCommercialChat, lastMessage , onMessage, notif, commercialChat, setReceiver} =
    useButtonContext();
    const [lastMessageDisplay, setLastMessageDisplay] = useState([]);
    const [classNewMessage, setClassNewMessage] = useState([])
  const [countMessage, setCountMessage] = useState([])

  const handleSetCart = () => {
    setChatOrCart("cart");
  };
  const handleSetChat = () => {
    setChatOrCart("chat");
  };

  const handleOpenMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("visible");
  };

  useEffect(() => {
    handleLastMessage(commercials, lastMessage, setLastMessageDisplay);
    handleClassNewMessage(setClassNewMessage, commercials, notif, setCountMessage)
  }, [lastMessage, commercials, onMessage, notif, commercialChat]);

  return (
    <>
      <div className="profile__page" style={{ animation: "tonga .6s ease" }}>
      {/* <div className="profilOverlay"></div> */}
        <div className="profile__box">
          <UserProfileCard
            data={dataPage}
            handleSetCart={handleSetCart}
            handleSetChat={handleSetChat}
          />
        </div>
        <div className="card__box">
          {chatOrCart === "cart" ? (
            <Cart data={dataPage} />
          ) : chatOrCart === "chat" ? (
            <div className="chatUser">
              <div className="chatOverlay"></div>
              <Chat />
              <div className="sidebar">
                <div className="navbar">
                  <div className="user">
                    <span>{"Commerciales"}</span>
                  </div>
                  <button className="x" onClick={handleOpenMenu}>
                    <FontAwesomeIcon className="chevronChat" icon={faChevronRight} />
                  </button>
                </div>

                <div className="listeComm">
                  {commercials.length > 0 &&
                    commercials.map((item, index) => (
                      <div
                        className="chats"
                        key={index}
                        onClick={() => {
                          setCommercialChat(item);
                          handleOpenMenu();
                          setReceiver(item.ID_user)
                        }}
                      >
                        <div className="userChat">
                          <img src={item?.avatar} alt="" />
                          <div className="userChatInfo">
                            <span>{item?.name}</span>
                            <p className={classNewMessage[index]}>{lastMessageDisplay[index]}</p>
                          </div>
                          {countMessage[index]>0 && <span className="notif newMessage"> {countMessage[index]} </span>}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <Pub />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilPage;
