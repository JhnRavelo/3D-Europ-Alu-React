/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import defaultAxios from "./api/axios";
import usePage from "./hooks/usePage";
import useSocket from "./hooks/useSocket";

const url = import.meta.env.VITE_SERVER_PATH;

function App() {
  const { setSocket } = useSocket();
  const { setPages } = usePage();

  useEffect(() => {
    const socket = io(url);
    setSocket(socket);
    (async () => {
      try {
        const fetchPages = await defaultAxios.get("/page");
        setPages(fetchPages.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <AppRouter />
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
