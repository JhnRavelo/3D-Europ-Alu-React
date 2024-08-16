import propTypes from "prop-types";
import "./options.scss";
import { Fragment, useRef } from "react";

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
                  if (e.target.files) {
                    setFieldValue(option.name, e.target.files);
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
