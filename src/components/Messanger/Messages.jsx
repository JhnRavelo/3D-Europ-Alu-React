import { useEffect } from "react";
import Message from "./Message";
import { useState } from "react";
import useMessage from "../../hooks/useMessage";
import "./messages.scss";
import { useParams } from "react-router-dom";

const Messages = () => {
  const { messages, sendMessage } = useMessage();
  const [m, setM] = useState([]);
  const [startIndex, setStartIndex] = useState(10);
  const { link } = useParams();

  useEffect(() => {
    if (messages) {
      let displayMessages;
      messages.length > 10
        ? (displayMessages = messages.slice(
            messages.length - startIndex < 0 ? 0 : messages.length - startIndex,
            messages.length
          ))
        : (displayMessages = messages);
      setM(displayMessages);
    }
  }, [messages, sendMessage, startIndex]);

  useEffect(() => {
    setStartIndex(10);
  }, [link]);

  return (
    <>
      <div className="messages">
        {m.length > 0 && (
          <>
            {m.length != messages.length && (
              <button
                className="btn-plus-messages"
                onClick={() => setStartIndex((prev) => prev + 10)}
              >
                Messages plus anciens
              </button>
            )}
            {m.map((item, index) => (
              <Message message={item} key={index} start={startIndex} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Messages;
