import useAuth from "./useAuth";
import defaultAxios from "../api/axios";

const useRefresh = () => {
  const {setAuth} = useAuth()
  const refresh = async () => {
    const response = await defaultAxios.get("/refresh");
    setAuth(prev=>{
      return{
        ...prev, role: response.data.role ,accesToken: response.data.accesToken
      }
    })
    return response.data
  };
  return refresh;
};

export default useRefresh;
