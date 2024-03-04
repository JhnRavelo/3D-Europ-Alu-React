/* eslint-disable react-hooks/exhaustive-deps */
import Chemins from "../../routers/Chemins";
import Grids from "./Grids/Grids";
import Header from "./Header/Header";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import Footer from "./Footer/Footer";
import FormField from "../Pages/Form/Form";
import useButtonContext from "../../hooks/useButtonContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import defaultAxios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
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
    socket,
    onMessage,
    setOnMessage,
    setData,
    dataPage,
    setNotif,
  } = useButtonContext();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        setOnMessage(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (commercialChat?.ID_user && socket) {
      socket.emit("joinRoom", { room: commercialChat.ID_user });
    }
    if (dataPage?.userRead[0]?.ID_user && socket) {
      socket.emit("joinRoom", { room: dataPage?.userRead[0].ID_user });
    }
  }, [commercialChat, socket, dataPage]);

  useEffect(() => {
    fetchData();
  }, [sender, receiver, sendMessage, onMessage, commercialChat, auth]);

  const fetchData = async () => {
    try {
      const data = await defaultAxios.get("/page");
      setData(data.data);
      if (auth?.name) {
        const page = await axiosPrivate.get("/traker");
        setDataPage(page.data);
        const commercial = await axiosPrivate.get("/auth/getCommercials");
        setCommercials(commercial.data);
        const lastmessage = await axiosPrivate.get("/message/getlast");
        setLastMessage(lastmessage.data);
        if (receiver) {
          const message = await axiosPrivate.post("/message/get", { receiver });
          setMessages(message.data);
        }
        const notif = await axiosPrivate.get("/message/getNotif");
        setNotif(notif.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollToTop />
      <div className="corps">
        <Header />
        {location.pathname != "/pageProd" && <Grids />}
        <Chemins />
        {!location.pathname.includes("profile") &&
          location.pathname != "/pageProd" && <Footer />}
      </div>
      {show && <FormField />}
    </>
  );
};

export default Layout;
