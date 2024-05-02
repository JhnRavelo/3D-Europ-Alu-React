import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import useButtonContext from "./useButtonContext";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import useMessage from "../hooks/useMessage";
import useSocket from "./useSocket";
import useProfil from "./useProfil";

const prime = import.meta.env.VITE_PRIME.split(" ");

const useLogout = () => {
  const { setShow, setSelectedProduct } = useButtonContext();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const { setProductInterestedByUser } = useProfil();
  const {
    setChatter,
    setChatters,
    setMessages,
    setLastMessages,
    setNotifs,
    setChatterSearch,
  } = useMessage();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setProductInterestedByUser([]);
    setSelectedProduct("");
    setChatter({});
    setAuth({});
    setMessages([]);
    setChatters([]);
    setLastMessages([]);
    setShow(false);
    setNotifs([]);
    setChatterSearch([]);
    try {
      const res = await axiosPrivate.get("/auth/logout");
      if (res.data == "SUCCESS") {
        toast.info("Déconnexion");
        const randomId = Math.floor(Math.random() * 999999);
        socket.emit("logoutUser", { id: randomId, room: prime[0] });
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };
  return logout;
};

export default useLogout;
