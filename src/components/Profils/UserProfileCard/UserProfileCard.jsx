import "./UserProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useRef, useState } from "react";
import avatars from "../../../assets/json/avatar.json";
import propTypes from "prop-types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

const UserProfileCard = ({ setScreen }) => {
  const showChangeAvatarRef = useRef();
  const listeAvatarRef = useRef();
  const { auth, setAuth } = useAuth();
  const [imgProfile, setImgProfile] = useState(
    auth && auth?.avatar ? auth.avatar : avatars[0]
  );
  const privateAxios = useAxiosPrivate();

  const showChangeAvatar = () => {
    listeAvatarRef.current.classList.toggle("showed");
  };

  const handleClick = (e) => {
    avatars.map((avatar) => {
      if (e.target.src.includes(avatar)) {
        setImgProfile(avatar);
        handleFetch(avatar);
      }
    });
  };

  const handleFetch = async (avatar) => {
    try {
      await privateAxios.put("/auth/avatar", {
        avatar,
      });
      setAuth((prev) => {
        return {
          ...prev,
          avatar: avatar,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="upc">
        <div className="wrapper">
          <div className="gauche">
            <div className="img-area">
              <div className="inner-area">
                <img
                  src={imgProfile}
                  alt="avatar du compte profil"
                  loading="eager"
                />
              </div>
              <div
                className="changeImg"
                ref={showChangeAvatarRef}
                onClick={showChangeAvatar}
              >
                <FontAwesomeIcon className="plusIcon" icon={faPlus} />
              </div>
            </div>

            <div ref={listeAvatarRef} className="social-icons">
              {avatars.map((avatar, index) => {
                if (index !== 0) {
                  return (
                    <Fragment key={index}>
                      <a>
                        <img
                          onClick={handleClick}
                          src={avatar}
                          alt={"image profil à choisir " + avatar}
                          loading="eager"
                        />
                      </a>
                    </Fragment>
                  );
                }
              })}
            </div>
            <div className="name">{auth?.name}</div>
            <div className="email">{auth?.email}</div>
            <div className="number">{auth?.phone}</div>
          </div>

          <div className="buttons">
            <button onClick={() => setScreen("chat")}>Message</button>
            <button onClick={() => setScreen("cart")}>Pannier</button>
          </div>
        </div>
      </div>
    </>
  );
};

UserProfileCard.propTypes = {
  data: propTypes.any,
  setScreen: propTypes.func,
};

export default UserProfileCard;
