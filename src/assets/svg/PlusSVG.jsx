import propTypes from "prop-types";

const PlusSVG = ({ width, height, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 12h6m6 0h-6m0 0V6m0 6v6"
      />
    </svg>
  );
};

PlusSVG.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  className: propTypes.string,
};

export default PlusSVG;
