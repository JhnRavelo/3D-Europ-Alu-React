import "../Users/User.scss";
import { useEffect, useState } from "react";
import Form from "../../../components/Admin/Form/Form";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import defaultAxios from "../../../api/axios";
import ModalDelete from "../../../components/Admin/ModalDelete/ModalDelete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
  },
  {
    field: "icon",
    headerName: "Icône",
    type:"file",
    width: 80,
    renderCell: (params) => {
      return (
        <img src={params.row.icon} alt="" className="imgprod"/>
      );
    },
  },{
    field: "home",
    headerName: "Home",
    type:"file",
    width: 80,
    renderCell: (params) => {
      return (
        <img src={params.row.home} alt="" className="imgprod"/>
      );
    },
  },
  {
    field: "page",
    type: "string",
    inputMode: "text",
    headerName: "Page",
    placeholder: "Votre Page",
    width: 80,
  },
  {
    field: "position",
    type: "string",
    inputMode: "numeric",
    headerName: "Position",
    placeholder: "Position de forme x,y,z",
    width: 150,
  },
  {
    field: "minYAngle",
    type: "string",
    inputMode: "numeric",
    headerName: "minYAngle",
    placeholder: "minYAngle de l'icône",
    width: 80,
  },
  {
    field: "maxYAngle",
    type: "string",
    inputMode: "numeric",
    headerName: "maxYAngle",
    placeholder: "maxYAngle de l'icône",
    width: 80,
  },
  {
    field: "minXAngle",
    type: "string",
    inputMode: "numeric",
    headerName: "minXAngle",
    placeholder: "minXAngle de l'icône",
    width: 80,
  },
  {
    field: "maxXAngle",
    type: "string",
    inputMode: "numeric",
    headerName: "maxXAngle",
    placeholder: "maxXAngle de l'icône",
    width: 80,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
  
];

const Pages = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteRow, setDeleteRow] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, [open]);

  const getAllUsers = async () => {
    try {
      const res = await defaultAxios.get("/page");
      const newTable = res.data.map((user) => {
        var 
        createdAt
        createdAt = user.createdAt.slice(0,10)
        return {
          id: user.ID_page,
          page:user.page,
          home:user.home,
          icon:user.icon,
          position:user.position,
          minYAngle:user.minYAngle,
          maxYAngle:user.maxYAngle,
          maxXAngle:user.maxXAngle,
          minXAngle:user.minXAngle,
          createdAt,
          url:user.url,

        };
      });
      
      setRows(newTable)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Pages</h1>
        <button onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faFileCirclePlus} beat/>
          Add New Page
        </button>
      </div>
      <DataTable slug="pages" columns={columns} rows={rows} setOpen={setOpen} setEditRow={(value)=> setEditRow(value)} setDeleteOpen={setDeleteOpen} setDeleteRow={setDeleteRow}/>

      {open && <Form slug="page" columns={columns} setOpen={setOpen} editRow={editRow} setEditRow={(value)=> setEditRow(value)} url="/page" />}
      {deleteOpen && (
        <ModalDelete
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
          deleteRow={deleteRow}
          url="/page"
          title="ce page"
        />
      )}
    </div>
  );
};

export default Pages;
