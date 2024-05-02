import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import useMessage from "../../hooks/useMessage";

const Navbar = () => {
  const notifRef = useRef();
  const { notifs, chatter } = useMessage();
  const [notifCount, setNotifCount] = useState(0);
  const { auth } = useAuth();
  const logout = useLogout();
  const handleOpenMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("visible");
  };

  const handleShowNotif = () => {
    notifRef.current.classList.toggle("visible");
  };

  useEffect(() => {
    if (notifs?.length > 0) {
      setNotifCount(notifs.length);
    } else {
      setNotifCount(0);
    }
  }, [notifs, chatter]);

  return (
    <div className="navbar">
      <div className="user">
        <img src={auth?.avatar} alt="photos" />
        <span>{auth?.name}</span>
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
          {notifs?.length > 0 &&
            notifs.map((item, index) => (
              <span key={index}>
                {item.send.name} a envoyé {item.count}{" "}
                {item.count > 0 ? "messages" : "message"}
              </span>
            ))}
        </div>
      </div>
      <button className="deconnexion" onClick={() => logout()}>
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
