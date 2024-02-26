import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import useButtonContext from "../../hooks/useButtonContext";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  const notifRef = useRef();
  const { dataPage, notif, commercialChat} = useButtonContext();
  const [notifCount, setNotifCount] = useState(0);
  const logout = useLogout()
  const handleOpenMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("visible");
  };

  const handleShowNotif = () => {
    notifRef.current.classList.toggle("visible");
  };

  useEffect(() => {
    if (notif?.length > 0) {
      setNotifCount(notif.length);
    }else{
      setNotifCount(0)
    }
  }, [notif, commercialChat]);

  return (
    <div className="navbar">
      <div className="user">
        <img src={dataPage?.userRead[0]?.avatar} alt="photos" />
        <span>{dataPage?.userRead[0]?.name}</span>
      </div>
      <button className="x" onClick={handleOpenMenu}>
        <FontAwesomeIcon
          className="xNotif"
          onClick={handleShowNotif}
          icon={faXmark}
        />
      </button>
      <div onClick={handleShowNotif} className="notication">
        {notifCount > 0 ? (
          <FontAwesomeIcon className="bell" icon={faBell} shake />
        ) : (
          <FontAwesomeIcon className="bell" icon={faBell} />
        )}
        {notifCount > 0 && <span>{notifCount}</span>}
      </div>
      <div ref={notifRef} className="cardNotif">
        <FontAwesomeIcon
          className="xNotif"
          onClick={handleShowNotif}
          icon={faXmark}
        />
        <div className="messNotif">
          {notif?.length > 0 &&
            notif.map((item, index) => (
              <span key={index}>
                {item.send.name} a envoyé {item.count}{" "}
                {item.count > 0 ? "messages" : "message"}
              </span>
            ))}
        </div>
      </div>
      <button className="deconnexion" onClick={()=>logout()}>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          flip
          style={{ marginRight: "5px" }}
        />
        Déconnexion
      </button>
    </div>
  );
};

export default Navbar;
