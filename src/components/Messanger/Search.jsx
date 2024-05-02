import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useMessage from "../../hooks/useMessage";

const Search = () => {
  const { chatters, setChatterSearch, chatterSearch } = useMessage();
  const [search, setSearch] = useState();

  return (
    <div className="search">
      <div className="searchForm">
        <div className="input">
          <input
            type="text"
            placeholder="Rechercher client"
            onChange={(e) => {
              setSearch(e.target.value);
              const filteredItems = chatters.filter((chatter) =>
                chatter.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setChatterSearch(filteredItems);

              if (e.target.value == "") {
                setChatterSearch(chatters);
              }
            }}
            value={search}
          />
          <div className="iconRecherche">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        {chatterSearch.length == 0 && (
          <span className="errorMessage">Client introuvable !!</span>
        )}
      </div>
    </div>
  );
};

export default Search;
