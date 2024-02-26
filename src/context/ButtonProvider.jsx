import { createContext, useState } from "react";
import propTypes from "prop-types";

const ButtonContext = createContext();

const ButtonProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [body, setBody] = useState({ name: "", email: "", phone: "" });
  const [open, setOpen] = useState(false);
  const [dataPage, setDataPage] = useState({
    traker: [],
    userRead: [],
  });
  const [data, setData] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const [commercialChat, setCommercialChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [sendMessage, setsendMessage] = useState(false);
  const [lastMessage, setLastMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const [onMessage, setOnMessage] = useState(null);
  const [onAvatar, setOnAvatar] = useState(null);
  const [onForm, setOnForm] = useState(null);
  const [onDelete, setOnDelete] = useState(null);
  const [search, setSearch] = useState(false);
  const [notif, setNotif] = useState([]);

  const showForm = () => {
    if (show === false) {
      setShow(true);
      setOpen(true);
      const corps = document.querySelector(".corps");
      const userIcon = document.querySelector(".login__logout");
      if (corps) {
        corps.classList.add("none");
      }
      if (userIcon) {
        userIcon.style.pointerEvents = "none";
      }
    } else {
      setOpen(false);
      setTimeout(() => {
        setShow(false);
      }, 200);
      const corps = document.querySelector(".corps");
      const userIcon = document.querySelector(".login__logout");
      if (corps) {
        corps.classList.remove("none");
      }
      if (userIcon) {
        userIcon.style.pointerEvents = "all";
      }
    }
  };

  return (
    <ButtonContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        body,
        setBody,
        showForm,
        show,
        setShow,
        open,
        dataPage,
        setDataPage,
        commercials,
        setCommercials,
        commercialChat,
        setCommercialChat,
        messages,
        setMessages,
        sender,
        setSender,
        receiver,
        setReceiver,
        sendMessage,
        setsendMessage,
        lastMessage,
        setLastMessage,
        socket,
        setSocket,
        onMessage,
        setOnMessage,
        onAvatar,
        setOnAvatar,
        search,
        setSearch,
        data,
        setData,
        notif,
        setNotif,
        onForm,
        setOnForm,
        onDelete,
        setOnDelete,
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};

ButtonProvider.propTypes = {
  children: propTypes.any,
};

export { ButtonProvider };

export default ButtonContext;
