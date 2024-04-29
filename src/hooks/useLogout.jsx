import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import useButtonContext from "./useButtonContext";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import useSocket from "./useSocket";

const prime = import.meta.env.VITE_PRIME.split(" ");

const useLogout = () => {
  const {
    setDataPage,
    setSelectedProduct,
    setCommercialChat,
    setMessages,
    setReceiver,
    setSender,
    setShow,
  } = useButtonContext();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      const res = await axiosPrivate.get("/auth/logout");
      if (res.data == "SUCCESS") {
        toast.info("Deconnexion");
        const randomId = Math.floor(Math.random() * 999999);
        socket.emit("logoutUser", { id: randomId, room: prime[0] });
      }
    } catch (error) {
      console.log(error);
    }

    setDataPage({
      traker: [],
      userRead: [],
    });
    setSelectedProduct("");
    setCommercialChat({});
    setAuth({});
    setMessages([]);
    setReceiver(null);
    setSender(null);
    setShow(false);
    navigate("/");
  };
  return logout;
};

export default useLogout;
