import { createContext, useState } from "react";
import propTypes from "prop-types";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: propTypes.any,
};

export { SocketProvider };

export default SocketContext;
