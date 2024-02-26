import { useEffect } from "react";
import useButtonContext from "../../hooks/useButtonContext";
import Message from "./Message";
import { useState } from "react";

const Messages = () => {
  const { messages, onMessage } = useButtonContext();
  const [m, setM] = useState([]);

  useEffect(() => {
    if (messages) {
      setM(messages);
    }
  }, [messages, onMessage]);

  return (
    <div className="messages">
      {m.length > 0 &&
        m.map((item, index) => <Message message={item} key={index} />)}
    </div>
  );
};

export default Messages;
