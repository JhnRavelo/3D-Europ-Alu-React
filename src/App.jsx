/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import useButtonContext from "./hooks/useButtonContext";
import defaultAxios from "./api/axios";
import usePage from "./hooks/usePage";

const server = import.meta.env.VITE_SERVER_PATH;

function App() {
  const { setSocket } = useButtonContext();
  const { setPages } = usePage();

  useEffect(() => {
    const socket = io(server);
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
