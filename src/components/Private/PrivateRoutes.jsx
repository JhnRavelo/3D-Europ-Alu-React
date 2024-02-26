import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import propTypes from "prop-types";

const PrivateRoutes = ({ prime }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role == prime ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

PrivateRoutes.propTypes = {
  prime: propTypes.string,
};

export default PrivateRoutes;
