import "./ModalDelete.css";
import Trash from "../../../assets/poubelle.png";
import propTypes from "prop-types";
// import defaultAxios from "../../../api/axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ModalDelete = ({
  setDeleteOpen,
  deleteRow,
  url,
  setDeleteRow,
  title,
}) => {
  const privateAxios = useAxiosPrivate();
  const handleDelete = async () => {
    try {
      const res = await privateAxios.delete(`${url}/${deleteRow}`);

      if (res.data == "supprimé") {
        setDeleteOpen(false);
        setDeleteRow(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="champDelete">
        <div className="delete__overlay"></div>

        <div className="delet__modal">
          <div
            className="x__mark"
            onClick={() => {
              setDeleteOpen(false);
              setDeleteRow(null);
            }}
          >
            X
          </div>
          <div className="modal__trash">
            <img src={Trash} alt="" />
          </div>
          <h1 className="delete__h1">Suppression</h1>
          <p className="delete__p">
            Êtes-vous sûr de vouloir supprimer {title} ?
          </p>
          <div className="button__delete">
            <button className="suppr" onClick={() => handleDelete()}>
              Delete
            </button>
            <button
              className="cancel"
              onClick={() => {
                setDeleteOpen(false);
                setDeleteRow(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

ModalDelete.propTypes = {
  setDeleteOpen: propTypes.func,
  deleteRow: propTypes.any,
  url: propTypes.string,
  setDeleteRow: propTypes.any,
  title: propTypes.string,
};

export default ModalDelete;
