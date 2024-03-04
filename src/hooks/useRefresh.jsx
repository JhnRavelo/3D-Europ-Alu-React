import useAuth from "./useAuth";
import defaultAxios from "../api/axios";

const useRefresh = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await defaultAxios.get("/refresh");
    setAuth({
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      avatar: response.data.avatar,
      role: response.data.role,
      accessToken: response.data.accessToken,
      id: response.data.id,
    });
    return response.data;
  };
  return refresh;
};

export default useRefresh;
