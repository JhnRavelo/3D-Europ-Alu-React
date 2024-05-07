import { useEffect, useState } from "react";
import handleLastMessage from "../../lib/utils/handleLastMessage";
import handleClassNewMessage from "../../lib/utils/handleClassNewMessage";
import useMessage from "../../hooks/useMessage";

const Chats = () => {
  const {
    chatters,
    lastMessages,
    setChatter,
    sendMessage,
    notifs,
    chatter,
    chatterSearch,
  } = useMessage();
  const [lastMessageDisplay, setLastMessageDisplay] = useState([]);
  const [classNewMessage, setClassNewMessage] = useState([]);
  const [countMessage, setCountMessage] = useState([]);

  useEffect(() => {
    handleLastMessage(chatters, lastMessages, setLastMessageDisplay);
    handleClassNewMessage(
      setClassNewMessage,
      chatters,
      notifs,
      setCountMessage
    );
  }, [lastMessages, chatters, sendMessage, notifs, chatter]);

  return (
    <section id="chats" className="chats">
      {chatterSearch.length > 0 &&
        chatterSearch.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setChatter(item);
            }}
          >
            <div className="userChat">
              <img
                src={item?.avatar}
                alt={"photo de profil " + item?.name}
                title={"photo de profil " + item?.name}
                loading="eager"
                width={"50px"}
                height={"50px"}
              />
              <div className="userChatInfo">
                <span>{item?.name}</span>
                <p className={classNewMessage[index]}>
                  {lastMessageDisplay?.length > 0 && lastMessageDisplay[index]}
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
    </section>
  );
};

export default Chats;
