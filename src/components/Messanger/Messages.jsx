import { useEffect } from "react";
import Message from "./Message";
import { useState } from "react";
import useMessage from "../../hooks/useMessage";

const Messages = () => {
  const { messages, sendMessage } = useMessage();
  const [m, setM] = useState([]);

  useEffect(() => {
    if (messages) {
      setM(messages);
    }
  }, [messages, sendMessage]);

  return (
    <div className="messages">
      {m.length > 0 &&
        m.map((item, index) => <Message message={item} key={index} />)}
    </div>
  );
};

export default Messages;
