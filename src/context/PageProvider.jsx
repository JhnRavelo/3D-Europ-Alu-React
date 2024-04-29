import { createContext, useState } from "react";
import propTypes from "prop-types";

const PageContext = createContext();

const PageProvider = ({ children }) => {
  const [pages, setPages] = useState([]);
  return (
    <PageContext.Provider value={{ pages, setPages }}>
      {children}
    </PageContext.Provider>
  );
};

PageProvider.propTypes = {
  children: propTypes.any,
};

export { PageProvider };

export default PageContext;
