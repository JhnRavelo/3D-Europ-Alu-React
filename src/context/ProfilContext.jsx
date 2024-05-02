import { createContext, useState } from "react";
import propTypes from "prop-types";

const ProfilContext = createContext();

const ProfilProvider = ({ children }) => {
  const [productInterestedByUser, setProductInterestedByUser] = useState([]);

  return (
    <ProfilContext.Provider
      value={{ productInterestedByUser, setProductInterestedByUser }}
    >
      {children}
    </ProfilContext.Provider>
  );
};

ProfilProvider.propTypes = {
  children: propTypes.any,
};

export { ProfilProvider };

export default ProfilContext;
