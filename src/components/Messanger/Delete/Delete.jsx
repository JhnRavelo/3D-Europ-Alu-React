import DeleteSVG from "../../../assets/svg/DeleteSVG";
import useAuth from "../../../hooks/useAuth";
import propTypes from "prop-types";
import "./delete.scss";
import { useState } from "react";
import ModalDelete from "../../Admin/ModalDelete/ModalDelete";

const Delete = ({ id, idUser, file }) => {
  const { auth } = useAuth();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      {idUser == auth?.id ? (
        <div
          className={
            file && file?.includes("message/file/")
              ? "delete-container delete-file"
              : file &&
                (file?.includes("message/photo/") || file?.includes("/file/"))
              ? "delete-container delete-img"
              : "delete-container delete-txt"
          }
        >
          <DeleteSVG
            width="25"
            height="25"
            onClick={() => setDeleteOpen(true)}
          />
        </div>
      ) : null}
      {deleteOpen && (
        <ModalDelete
          setDeleteOpen={setDeleteOpen}
          deleteRow={{ id, file }}
          url="/message/delete"
          title="cet élément"
        />
      )}
    </>
  );
};

Delete.propTypes = {
  id: propTypes.number,
  idUser: propTypes.number,
  file: propTypes.string,
};

export default Delete;
