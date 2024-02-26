import { ErrorMessage } from "formik";
import propTypes from "prop-types";
import folderImg from "../../../assets/png/folder.png";
import fileImg from "../../../assets/png/gallery.png";

const FileField = ({ name, accept, setFieldValue, folder, value }) => {

  if (!folder) {
    return (
      <>
        <input
          style={{ display: "none" }}
          id={name}
          type="file"
          name={name}
          accept={accept}
          onChange={(e) => {
            if (e.target.files) {
              setFieldValue(name, e.target.files[0]);
            }
          }}
        />
        <label htmlFor={name} className="labelInput">
          <img src={fileImg} alt="" />
          <span style={value[name] && {fontSize:"9px"}}>{value[name] ? value[name].name : "Ajouter Image"}</span>
        </label>
        <ErrorMessage component={"p"} className="error" name={name} />
      </>
    );
  } else {
    return (
      <>
        <input
          style={{ display: "none" }}
          id="fileFolder"
          type="file"
          name={name}
          accept={accept}
          onChange={(e) => {
            if (e.target.files) {
              setFieldValue(name, e.target.files);
            }
          }}
          webkitdirectory=""
          mozdirectory=""
          directory=""
        />
        <label htmlFor="fileFolder" className="labelInput">
          <img src={folderImg} alt="" />
          <span style={value[name] && {fontSize:"9px"}}>
            {value[name] ? value[name][0].webkitRelativePath.split("/")[0] : "Ajouter Image"}
          </span>
        </label>
        <ErrorMessage component={"p"} className="error" name={name} />
      </>
    );
  }
};

FileField.propTypes = {
  name: propTypes.string,
  accept: propTypes.string,
  setFieldValue: propTypes.func,
  folder: propTypes.bool,
  value: propTypes.any,
};

export default FileField;
