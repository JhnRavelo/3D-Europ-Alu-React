import "../Users/User.scss";
import { useEffect, useState } from "react";
import Form from "../../../components/Admin/Form/Form";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import defaultAxios from "../../../api/axios";
import ModalDelete from "../../../components/Admin/ModalDelete/ModalDelete";
import "./Product.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
  },
  {
    field: "png",
    headerName: "Image",
    type: "file",
    width: 80,
    renderCell: (params) => {
      return <img src={params.row.png} alt="" className="imgprod" />;
    },
  },
  {
    field: "page",
    headerName: "Page",
    inputMode: "string",
    placeholder: "Votre produit",
    type: "string",
    width: 90,
  },
  {
    field: "title",
    headerName: "Nom du produit",
    inputMode: "text",
    placeholder: "Votre produit",
    type: "string",
    width: 120,
  },
  {
    field: "description",
    type: "textArea",
    inputMode: "text",
    headerName: "Description",
    placeholder: "Description du produit",
    width: 250,
  },
  {
    field: "pub",
    headerName: "Publicité",
    type: "file",
    width: 80,
    renderCell: (params) => {
      return <img src={params.row.pub} alt="" className="imgprod" />;
    },
  },
  {
    field: "gallery",
    type: "file",
    headerName: "Gallery",
    width: 200,
    renderCell: (params) => {
      const galleries = params.row.gallery.split(",");
      return (
        <div className="galleryContainer">
          {galleries.map((gallery, index) => (
            <img src={gallery} alt="" key={index} className="imgprod" />
          ))}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, [open, deleteOpen]);

  const getAllProducts = async () => {
    try {
      const res = await defaultAxios.get("/product");
      const newTable = res.data.map((product) => {
        var createdAt;
        createdAt = product.createdAt.slice(0, 10);
        return {
          id: product.ID_product,
          page: product.page.page,
          png: product.png,
          title: product.title,
          description: product.description,
          pub: product.pub,
          gallery: product.gallery,
          createdAt,
        };
      });

      setRows(newTable);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Produits</h1>
        <button onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} beat />
          Add New Produit
        </button>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={rows}
        setOpen={setOpen}
        setEditRow={(value) => setEditRow(value)}
        setDeleteOpen={setDeleteOpen}
        setDeleteRow={setDeleteRow}
      />

      {open && (
        <Form
          slug="product"
          columns={columns}
          setOpen={setOpen}
          editRow={editRow}
          setEditRow={(value) => setEditRow(value)}
          url="/product"
        />
      )}
      {deleteOpen && (
        <ModalDelete
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
          deleteRow={deleteRow}
          url="/product"
          title="ce produit"
        />
      )}
    </div>
  );
};

export default Products;
