import { createContext, useState } from "react";
import propTypes from "prop-types";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [chatter, setChatter] = useState({});
  const [chatters, setChatters] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [sendMessage, setSendMessage] = useState(false);
  const [chatterSearch, setChatterSearch] = useState([]);

  return (
    <MessageContext.Provider
      value={{
        chatter,
        setChatter,
        messages,
        setMessages,
        lastMessages,
        setLastMessages,
        chatters,
        setChatters,
        notifs,
        setNotifs,
        sendMessage,
        setSendMessage,
        chatterSearch,
        setChatterSearch,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
  children: propTypes.any,
};

export { MessageProvider };

export default MessageContext;
