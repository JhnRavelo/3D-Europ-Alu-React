import propTypes from "prop-types";

const DocumentSVG = ({ width, height, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 17 16"
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d="M2 0v16h13V4.024L9 4V.062zm11 13H4v-1h9zm0-2H4v-1h9zm0-4v1H4V7z" />
        <path d="M10 0v2.844h4.752z" />
      </g>
    </svg>
  );
};

DocumentSVG.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  className: propTypes.string,
};

export default DocumentSVG;
