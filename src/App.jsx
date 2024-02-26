/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import useButtonContext from "./hooks/useButtonContext";

function App() {
  const { setSocket } = useButtonContext();

  useEffect(() => {
    const socket = io("/");
    setSocket(socket);
  }, []);
  return (
    <>
      <AppRouter />
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
