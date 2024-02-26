import "./UserProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useRef, useState } from "react";
import avatars from "../../../assets/json/avatar.json";
import propTypes from "prop-types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UserProfileCard = ({ data, handleSetCart, handleSetChat }) => {
  const showChangeAvatarRef = useRef();
  const listeAvatarRef = useRef();
  const [imgProfile, setImgProfile] = useState(avatars[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const privateAxios = useAxiosPrivate();

  const showChangeAvatar = () => {
    listeAvatarRef.current.classList.toggle("showed");
  };

  useEffect(() => {
    if (data?.userRead?.length != 0) {
      setEmail(data.userRead[0].email);
      setPhone(data.userRead[0].phone);
      setName(data.userRead[0].name);
      setImgProfile(data.userRead[0].avatar);
    }
  }, [data]);

  const handleClick = (e) => {
    if (e.target.src.includes("Avatar-Profile")) {
      setImgProfile(avatars[1]);
      handleFetch(1);
    } else if (e.target.src.includes("user-profile")) {
      setImgProfile(avatars[2]);
      handleFetch(2);
    } else if (e.target.src.includes("woman-business")) {
      setImgProfile(avatars[3]);
      handleFetch(3);
    } else if (e.target.src.includes("woman-users")) {
      setImgProfile(avatars[4]);
      handleFetch(4);
    }
  };

  const handleFetch = async (index) => {
    try {
      await privateAxios.put("/auth/avatar", {
        avatar: avatars[index],
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
                <img src={imgProfile} alt="avatar" />
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
                        <img onClick={handleClick} src={avatar} alt="avatar" />
                      </a>
                    </Fragment>
                  );
                }
              })}
            </div>
            <div className="name">{name}</div>
            <div className="email">{email}</div>
            <div className="number">{phone}</div>
          </div>

          <div className="buttons">
            <button onClick={handleSetChat}>Message</button>
            <button onClick={handleSetCart}>Pannier</button>
          </div>
        </div>
      </div>
    </>
  );
};

UserProfileCard.propTypes = {
  data: propTypes.any,
  handleSetCart: propTypes.func,
  handleSetChat: propTypes.func,
};

export default UserProfileCard;
