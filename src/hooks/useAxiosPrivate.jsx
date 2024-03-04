import { privateAxios } from "../api/axios";
import { useEffect } from "react";
import useRefresh from "./useRefresh";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken.accessToken}`;
          return privateAxios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxios.interceptors.request.eject(requestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return privateAxios;
};

export default useAxiosPrivate;
