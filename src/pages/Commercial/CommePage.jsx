/* eslint-disable react-hooks/exhaustive-deps */
import "./CommePage.scss";
import "../../components/Messanger/style.scss";
import Home from "../../components/Messanger/Home";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import useMessage from "../../hooks/useMessage";

const CommePage = () => {
  const {
    setNotifs,
    setLastMessages,
    setMessages,
    setChatters,
    chatters,
    chatter,
    setSendMessage,
    sendMessage,
    setChatterSearch,
  } = useMessage();
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useSocket();
  const { auth } = useAuth();

  useEffect(() => {
    if (chatters.length > 0 && socket && auth?.id) {
      chatters.map((chatter) =>
        socket.emit("joinRoom", { room: chatter.ID_user })
      );
    }
    if (auth && socket) {
      socket.emit("joinRoom", { room: auth.id });
    }
  }, [chatters, socket, auth]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", () => {
        setSendMessage((prev) => !prev);
      });
    }
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const fetchLastmessages = await axiosPrivate.get("/message/getlast");
        setLastMessages(fetchLastmessages.data);
        const fetchUsers = await axiosPrivate.get("/message/getUsers");
        setChatters(fetchUsers.data);
        setChatterSearch(fetchUsers.data);
        if (chatter?.ID_user) {
          const fetchMessages = await axiosPrivate.post("/message/get", {
            receiver: chatter?.ID_user,
          });
          setMessages(fetchMessages.data);
        }
        const fetchNotifs = await axiosPrivate.get("/message/getNotif");
        setNotifs(fetchNotifs.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [sendMessage, chatter]);

  return <Home />;
};

export default CommePage;
