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

const Layout = () => {
  const {
    show,
    setBody,
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
    onAvatar,
    setOnAvatar,
    setData,
    dataPage,
    setNotif,
    onForm,
    setOnForm,
    onDelete,
    setOnDelete,
  } = useButtonContext();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        setOnMessage(data);
      });
      socket.on("receiveAvatar", (data) => {
        setOnAvatar(data);
      });
      socket.on("receiveForm", (data) => {
        setOnForm(data);
      });
      socket.on("receiveDelete", (data) => {
        setOnDelete(data);
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
  }, [
    show,
    sender,
    receiver,
    sendMessage,
    onMessage,
    onAvatar,
    onForm,
    onDelete,
    commercialChat
  ]);

  const fetchData = async () => {
    try {
      const data = await defaultAxios.get("/page");
      setData(data.data);
      const res = await axiosPrivate.get("/auth");
      if (res.data) {
        setBody({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
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
      } else {
        setBody({
          name: "",
          email: "",
          phone: "",
        });
      }
    } catch (error) {
      if (error) {
        setBody({
          name: "",
          email: "",
          phone: "",
        });
        console.log(error);
      }
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
