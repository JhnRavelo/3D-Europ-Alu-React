import { createContext, useState } from "react";
import propTypes from "prop-types";

const ParticipantContext = createContext();

const ParticipantProvider = ({ children }) => {
  const [participant, setParticipant] = useState();

  return (
    <ParticipantContext.Provider value={{ participant, setParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
};

ParticipantProvider.propTypes = {
  children: propTypes.any,
};

export { ParticipantProvider };

export default ParticipantContext;
