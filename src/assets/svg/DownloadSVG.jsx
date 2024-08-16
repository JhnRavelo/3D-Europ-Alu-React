import propTypes from "prop-types";

const DownloadSVG = ({ width, height, className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M12 6v10zm0-5c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1Zm5 11l-5 5l-5-5"
      />
    </svg>
  );
};

DownloadSVG.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  className: propTypes.string,
  onClick: propTypes.func,
};

export default DownloadSVG;
