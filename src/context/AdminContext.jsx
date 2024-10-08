import { createContext, useState } from "react";
import propTypes from "prop-types";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [top, setTop] = useState([]);
  const [nbUser, SetNbUser] = useState(null);
  const [nbProd, SetNbProd] = useState(null);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [commercial, setCommercial] = useState([]);
  const [year, setYear] = useState(() => {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  });
  const [years, setYears] = useState([]);
  const [log, setLog] = useState({});
  const [connect, setConnect] = useState(null);
  const [logout, setLogout] = useState(null);
  const [onInterested, setOnInterested] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
  const [products, setProducts] = useState(null);

  return (
    <AdminContext.Provider
      value={{
        commercial,
        setCommercial,
        products,
        setProducts,
        open,
        setOpen,
        top,
        setTop,
        nbUser,
        SetNbUser,
        nbProd,
        SetNbProd,
        order,
        setOrder,
        user,
        setUser,
        deleteOpen,
        setDeleteOpen,
        year,
        setYear,
        years,
        setYears,
        log,
        setLog,
        notifOpen,
        setNotifOpen,
        connect,
        setConnect,
        logout,
        setLogout,
        onInterested,
        setOnInterested,
        singleProduct,
        setSingleProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: propTypes.any,
};

export { AdminProvider };

export default AdminContext;
