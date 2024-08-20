import "./ModalDelete.css";
import Trash from "../../../assets/png/poubelle.png";
import propTypes from "prop-types";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useSocket from "../../../hooks/useSocket";
import useAuth from "../../../hooks/useAuth";
import useMessage from "../../../hooks/useMessage";

const ModalDelete = ({
  setDeleteOpen,
  deleteRow,
  url,
  setDeleteRow,
  title,
}) => {
  const privateAxios = useAxiosPrivate();
  const { socket } = useSocket();
  const { auth } = useAuth();
  const { chatter, setSendMessage } = useMessage();

  const handleDelete = async () => {
    try {
      let res = await privateAxios.delete(`${url}/${deleteRow}`);

      if (url == "/message/delete") {
        res = await privateAxios.post(url, deleteRow);
      }

      if (res.data == "supprimé") {
        setDeleteOpen(false);
        setDeleteRow(null);
      } else if (res.data == "message supprimé") {
        setDeleteOpen(false);
        setSendMessage((prev) => !prev);
        socket.emit("sendMessage", {
          text: deleteRow,
          receiver: chatter.ID_user,
          sender: auth?.id,
        });
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
              if (setDeleteRow) {
                setDeleteRow(null);
              }
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
              Supprimer
            </button>
            <button
              className="cancel"
              onClick={() => {
                setDeleteOpen(false);
                if (setDeleteRow) {
                  setDeleteRow(null);
                }
              }}
            >
              Annuler
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
