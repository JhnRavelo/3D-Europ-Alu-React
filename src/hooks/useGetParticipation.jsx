import { useNavigate } from "react-router-dom";
import defaultAxios from "../api/axios";
import useParticipant from "./useParticipant";
import { toast } from "react-toastify";

const useGetParticipation = () => {
  const navigate = useNavigate();
  const { setParticipant } = useParticipant();
  const { location } = useParticipant();
  return async (url) => {
    try {
      const res = await defaultAxios.get("/participation");

      if (res.data.success === true) {
        setParticipant(res.data.user);
        if (url == "/roulette") {
          navigate(url);
        }
      } else if (res.data.success == "other") {
        navigate("/");
        toast.info(res.data.message);
      } else {
        if (
          location != "/jeux" &&
          res.data.message != "Vous ne vous êtes pas identifier"
        ) {
          toast.error(res.data.message);
        }
        if (url == "/jeux") {
          navigate(url);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGetParticipation;
