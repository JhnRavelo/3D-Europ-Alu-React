import "./Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useAdminContext from "../../../hooks/useAdminContext";
import FormAdd from "../../../components/Admin/Form/Form";
import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";

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
  const { setOpen, open } = useAdminContext();
  const { auth } = useAuth();
  const logout = useLogout();

  return (
    <>
      <div id="profile">
        <h1>Profile</h1>
        <div className="edit__admin">
          <h2>Modifier votre profile</h2>
          <button className="edit__profile" onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faEdit} beat />
            éditer
          </button>
        </div>
        <div className="admin__card">
          <div className="admin__img">
            <img src={auth.avatar} alt="sary" />
          </div>
          <div className="info__admin">
            <h1 className="admin__name">{auth.name}</h1>
            <h2 className="admin__email">{auth.email}</h2>
            <h1 className="user__admin">- Administrateur</h1>
          </div>
        </div>
        <button className="logout__button" onClick={() => logout()}>
          <FontAwesomeIcon icon={faSignOutAlt} flip />
          Se déconnecter
        </button>
      </div>
      {open && (
        <FormAdd
          slug="profile"
          columns={columns}
          setOpen={setOpen}
          editRow={auth}
          url="/auth/User"
        />
      )}
    </>
  );
};

export default Profile;
