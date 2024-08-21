import propTypes from "prop-types";
import "./options.scss";
import { Fragment, useRef } from "react";
import { toast } from "react-toastify";

const Options = ({ setFieldValue, options, optionsRef, handleChange }) => {
  const inputRef = useRef();
  return (
    <div className="options" ref={optionsRef}>
      {options?.length > 0
        ? options.map((option, index) => (
            <Fragment key={index}>
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputRef}
                id={option.name}
                accept={option.accept}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    
                    for (
                      let index = 0;
                      index < e.target.files.length;
                      index++
                    ) {
                      if (e.target.files[index].size < 50 * 1024 * 1024) {
                        setFieldValue(option.name, e.target.files);
                      } else {
                        toast.error("Erreur le fichier est plus grand 50Mo");
                        setFieldValue(option.name, null);
                        break;
                      }
                    }
                  }
                }}
                multiple
              />
              <label
                htmlFor={option.name}
                className="option"
                onClick={() => {
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                  handleChange();
                }}
              >
                {option.svg}
                <span>{option.text}</span>
              </label>
            </Fragment>
          ))
        : null}
    </div>
  );
};

Options.propTypes = {
  setFieldValue: propTypes.any,
  options: propTypes.array,
  optionsRef: propTypes.any,
  handleChange: propTypes.func,
};

export default Options;
