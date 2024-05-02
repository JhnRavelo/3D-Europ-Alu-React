import useAuth from "./useAuth";
import defaultAxios from "../api/axios";

const useRefresh = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await defaultAxios.get("/refresh");
    setAuth(response.data.user);
    return response.data.user;
  };
  return refresh;
};

export default useRefresh;
