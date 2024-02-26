import "../Users/User.scss";
import { useEffect, useState } from "react";
import DataTable from "../../../components/Admin/DataTable/DataTable";
import useButtonContext from "../../../hooks/useButtonContext";
import useAdminContext from "../../../hooks/useAdminContext";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
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
    field: "product",
    type: "string",
    inputMode: "number",
    headerName: "Nom du Produit",
    placeholder: "Votre Numéro",
    width: 200,
  },
  {
    field: "page",
    type: "string",
    inputMode: "number",
    headerName: "Catégorie",
    placeholder: "Votre Numéro",
    width: 120,
    disableExport: true,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 100,
    type: "string",
    disableExport: true,
  },
];

const Orders = () => {
  const [rows, setRows] = useState([]);
  const { show } = useButtonContext();
  const { order } = useAdminContext();

  useEffect(() => {
    if (order.length !== 0) {
      const newTable = order.map((tarker) => {
        var createdAt;
        createdAt = tarker.createdAt.slice(0, 10);
        return {
          id: tarker.id,
          name: tarker.user.name,
          email: tarker.user.email,
          phone: tarker.user.phone,
          product: tarker.product.title,
          page: tarker.product.page.page,
          createdAt,
        };
      });

      setRows(newTable);
    }
  }, [order, show]);

  return (
    <>
      <div className="users">
        <div className="info">
          <h1>Commandes</h1>
        </div>
        <DataTable slug="orders" columns={columns} rows={rows} />
      </div>
    </>
  );
};

export default Orders;
