import "./Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useAdminContext from "../../../hooks/useAdminContext";
import FormAdd from "../../../components/Admin/Form/Form";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";

const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    type: "file",
  },
  {
    field: "name",
    type: "string",
    inputMode: "text",
    headerName: "Nom",
    placeholder: "Votre Nom",
  },
];

const Profile = () => {
  const { data, setOpen, open } = useAdminContext();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div id="profile">
        <h1>Profile</h1>
        <div className="edit__admin">
          <h2>Modifier votre profile</h2>
          <button className="edit__profile" onClick={handleClick}>
            <FontAwesomeIcon icon={faEdit} beat />
            éditer
          </button>
        </div>
        <div className="admin__card">
          <div className="admin__img">
            <img src={data.avatar} alt="sary" />
          </div>
          <div className="info__admin">
            <h1 className="admin__name">{data.name}</h1>
            <h2 className="admin__email">{data.email}</h2>
            <h1 className="user__admin">- Administrateur</h1>
          </div>
        </div>
        <button className="logout__button" onClick={handleLogOut}>
          <FontAwesomeIcon icon={faSignOutAlt} flip />
          Se déconnecter
        </button>
      </div>
      {open && (
        <FormAdd
          slug="profile"
          columns={columns}
          setOpen={setOpen}
          editRow={data}
          url="/auth/User"
        />
      )}
    </>
  );
};

export default Profile;
