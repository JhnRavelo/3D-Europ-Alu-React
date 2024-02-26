import "./User.scss";
import { useEffect, useState } from "react";
import Form from "../../../components/Admin/Form/Form";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ModalDelete from "../../../components/Admin/ModalDelete/ModalDelete";
import useButtonContext from "../../../hooks/useButtonContext";
import useAdminContext from "../../../hooks/useAdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
    disableExport: true,
  },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img} alt="" />;
    },
    disableExport: true,
  },
  {
    field: "name",
    type: "string",
    inputMode: "text",
    headerName: "Nom",
    placeholder: "Votre Nom",
    width: 200,
  },
  {
    field: "type",
    type: "string",
    inputMode: "text",
    headerName: "Type",
    placeholder: "Type de User",
    width: 90,
  },
  {
    field: "email",
    type: "email",
    inputMode: "email",
    headerName: "Email",
    placeholder: "Votre Email",
    width: 200,
  },
  {
    field: "password",
    type: "password",
    inputMode: "password",
    headerName: "Mot de passe",
    placeholder: "Votre mot de passe",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    inputMode: "number",
    headerName: "Phone",
    placeholder: "Votre Numéro",
    width: 120,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
  {
    field: "connected",
    headerName: "Connected",
    width: 90,
    type: "boolean",
    disableExport: true,
  },
];

const Users = () => {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const { show } = useButtonContext();
  const { open, setOpen, user, deleteOpen, setDeleteOpen } = useAdminContext();

  useEffect(() => {
    if (user.length != 0) {
      const newTable = user.map((user) => {
        var createdAt;
        createdAt = user.createdAt.slice(0, 10);
        return {
          id: user.ID_user,
          img: user.avatar,
          name: user.name,
          type: user.type,
          email: user.email,
          phone: user.phone,
          createdAt,
          connected: user.connected,
        };
      });

      setRows(newTable);
    }
  }, [open, deleteOpen, show, user]);

  return (
    <>
      <div className="users">
        <div className="info">
          <h1>Users</h1>
          <button onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faUserPlus} beat />
            Add New User
          </button>
        </div>
        <DataTable
          slug="users"
          columns={columns}
          rows={rows}
          setOpen={setOpen}
          setEditRow={(value) => setEditRow(value)}
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
        />

        {open && (
          <Form
            slug="user"
            columns={columns}
            setOpen={setOpen}
            editRow={editRow}
            setEditRow={(value) => setEditRow(value)}
            url="/auth/User"
          />
        )}
      </div>
      {deleteOpen && (
        <ModalDelete
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
          deleteRow={deleteRow}
          url="/auth/User"
          title="cet utilisateur"
        />
      )}
    </>
  );
};

export default Users;
