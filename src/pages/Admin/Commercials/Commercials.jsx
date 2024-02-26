import "../Users/User.scss";
import { useEffect, useState } from "react";
import Form from "../../../components/Admin/Form/Form";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import ModalDelete from "../../../components/Admin/ModalDelete/ModalDelete";
import useAdminContext from "../../../hooks/useAdminContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    type: "file",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.avatar} alt="" />;
    },
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
  },
];

const Commercials = () => {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const {open, setOpen, commercial, deleteOpen, setDeleteOpen} = useAdminContext()

  useEffect(() => {
    if(commercial.length != 0){
      const newTable = commercial.map((user) => {
        var createdAt;
        createdAt = user.createdAt.slice(0, 10);
        return {
          id: user.ID_user,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt,
          connected: user.connected,
        };
      });

      setRows(newTable);
    }

  }, [open, deleteOpen, commercial]);

  return (
    <>
      <div className="users">
        <div className="info">
          <h1>Users</h1>
          <button onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faUserPlus} beat />
            Add New Commercial
          </button>
        </div>
        <DataTable
          slug="commercials"
          columns={columns}
          rows={rows}
          setOpen={setOpen}
          setEditRow={(value) => setEditRow(value)}
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
        />

        {open && (
          <Form
            slug="commercial"
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
          title="ce Commercial"
        />
      )}
    </>
  );
};

export default Commercials;
