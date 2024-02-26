import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useButtonContext from "../../hooks/useButtonContext";

const Search = () => {
  const [username, setUsername] = useState();
  const { commercials, setCommercials, search, setSearch } = useButtonContext();

  return (
    <div className="search">
      <div className="searchForm">
        <div className="input">
          <input
            type="text"
            placeholder="Rechercher client"
            onChange={(e) => {
              setUsername(e.target.value);
              const filteredItems = commercials.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setCommercials(filteredItems);
             
              if (e.target.value == "") {
               
                if (search) {
                  setSearch(false);
                } else {
                  setSearch(true);
                }
              }
            }}
            value={username}
          />
          <div className="iconRecherche">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        {commercials.length == 0 && (
          <span className="errorMessage">Client introuvable !!</span>
        )}
      </div>
    </div>
  );
};

export default Search;
