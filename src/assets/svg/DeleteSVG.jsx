import propTypes from "prop-types";

const DeleteSVG = ({ width, height, className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      onClick={onClick}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
      />
    </svg>
  );
};

DeleteSVG.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func,
};

export default DeleteSVG;
