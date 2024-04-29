/* eslint-disable react-hooks/exhaustive-deps */
import "./CommePage.scss";
import "../../components/Messanger/style.scss";
import Home from "../../components/Messanger/Home";
import useButtonContext from "../../hooks/useButtonContext";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useSocket from "../../hooks/useSocket";

const CommePage = () => {
  const {
    show,
    setDataPage,
    setCommercials,
    setMessages,
    sender,
    receiver,
    sendMessage,
    setLastMessage,
    commercialChat,
    onMessage,
    setOnMessage,
    onAvatar,
    search,
    dataPage,
    setNotif,
  } = useButtonContext();
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useSocket();

  useEffect(() => {
    if (commercialChat?.ID_user && socket) {
      socket.emit("joinRoom", { room: commercialChat.ID_user });
    }
    if (dataPage?.userRead[0]?.ID_user && socket) {
      socket.emit("joinRoom", { room: dataPage?.userRead[0].ID_user });
    }
  }, [commercialChat, socket, dataPage]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        setOnMessage(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    fetchData();
  }, [show, sender, receiver, sendMessage, onMessage, onAvatar, search]);

  const fetchData = async () => {
    try {
      const page = await axiosPrivate.get("/traker");
      setDataPage(page.data);
      const lastmessage = await axiosPrivate.get("/message/getlast");
      setLastMessage(lastmessage.data);
      const user = await axiosPrivate.get("/message/getUsers");
      setCommercials(user.data);
      if (receiver) {
        const message = await axiosPrivate.post("/message/get", { receiver });
        setMessages(message.data);
      }
      const notif = await axiosPrivate.get("/message/getNotif");
      setNotif(notif.data);
    } catch (error) {
      console.log(error);
    }
  };

  return <Home />;
};

export default CommePage;
