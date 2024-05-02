/* eslint-disable react-hooks/exhaustive-deps */
import "./ProfilPage.css";
import "./ProfilPage.scss";
import { useState } from "react";
import UserProfileCard from "../../components/Profils/UserProfileCard/UserProfileCard";
import Cart from "../../components/Profils/Cart/Cart";
import Chat from "../../components/Messanger/Chat";
import Pub from "../../components/Profils/Pub/Pub";
import handleLastMessage from "../../lib/utils/handleLastMessage";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import handleClassNewMessage from "../../lib/utils/handleClassNewMessage";
import useSocket from "../../hooks/useSocket";
import useProfil from "../../hooks/useProfil";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useMessage from "../../hooks/useMessage";
import Header from "../../components/Header/Header";

const ProfilPage = () => {
  const [chatOrCart, setChatOrCart] = useState("vide");
  const { socket } = useSocket();
  const { productInterestedByUser, setProductInterestedByUser } = useProfil();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [lastMessageDisplay, setLastMessageDisplay] = useState([]);
  const [classNewMessage, setClassNewMessage] = useState([]);
  const [countMessage, setCountMessage] = useState([]);
  const {
    setNotifs,
    setLastMessages,
    setMessages,
    setChatter,
    setChatters,
    chatters,
    chatter,
    notifs,
    lastMessages,
    setSendMessage,
    sendMessage,
  } = useMessage();

  const handleOpenMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("visible");
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", () => {
        setSendMessage((prev) => !prev);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (chatter?.ID_user && socket) {
      socket.emit("joinRoom", { room: chatter.ID_user });
    }
    if (auth && socket) {
      socket.emit("joinRoom", { room: auth?.id });
    }
  }, [chatter, socket, auth]);

  useEffect(() => {
    (async () => {
      try {
        if (auth?.name) {
          const fetchTrackers = await axiosPrivate.get("/traker");
          setProductInterestedByUser(fetchTrackers.data);
          const chatters = await axiosPrivate.get("/auth/getCommercials");
          setChatters(chatters.data);
          const fetchLastMessages = await axiosPrivate.get("/message/getlast");
          setLastMessages(fetchLastMessages.data);
          if (chatter?.ID_user) {
            const fetchMessages = await axiosPrivate.post("/message/get", {
              receiver: chatter?.ID_user,
            });
            setMessages(fetchMessages.data);
          }
          const fetchNotifs = await axiosPrivate.get("/message/getNotif");
          setNotifs(fetchNotifs.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [auth, chatter, sendMessage]);

  useEffect(() => {
    handleLastMessage(chatters, lastMessages, setLastMessageDisplay);
    handleClassNewMessage(
      setClassNewMessage,
      chatters,
      notifs,
      setCountMessage
    );
  }, [lastMessages, chatters, notifs, chatter]);

  return (
    <>
      <Header />
      <div className="profile__page" style={{ animation: "tonga .6s ease" }}>
        <div className="profile__box">
          <UserProfileCard setScreen={setChatOrCart} />
        </div>
        <div className="card__box">
          {chatOrCart === "cart" ? (
            <Cart products={productInterestedByUser} />
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
                    <FontAwesomeIcon
                      className="chevronChat"
                      icon={faChevronRight}
                    />
                  </button>
                </div>

                <div className="listeComm">
                  {chatters.length > 0 &&
                    chatters.map((item, index) => (
                      <div
                        className="chats"
                        key={index}
                        onClick={() => {
                          setChatter(item);
                          handleOpenMenu();
                        }}
                      >
                        <div className="userChat">
                          <img
                            src={item?.avatar}
                            alt={"image du profil commerciale" + item?.name}
                          />
                          <div className="userChatInfo">
                            <span>{item?.name}</span>
                            <p className={classNewMessage[index]}>
                              {lastMessageDisplay[index]}
                            </p>
                          </div>
                          {countMessage[index] > 0 && (
                            <span className="notif newMessage">
                              {" "}
                              {countMessage[index]}{" "}
                            </span>
                          )}
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
