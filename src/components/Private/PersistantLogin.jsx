import { useEffect, useState } from "react";
import useRefresh from "../../hooks/useRefresh";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

const PersistantLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistantLogin;
