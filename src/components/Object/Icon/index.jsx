import { Html } from "@react-three/drei";
import useButtonContext from "../../../hooks/useButtonContext";
import { useNavigate } from "react-router-dom";

function Icon() {
  const { data } = useButtonContext();
  const navigate = useNavigate();

  const handleClick = (icon) => {
    navigate(`/pageProd/${icon.ID_page}`);
  };

  return (
    <>
      {data?.length > 0 &&
        data.map((icon, index) => {
          const position = icon.position.split(",");
          const x = parseFloat(position[0]),
            y = parseFloat(position[1]),
            z = parseFloat(position[2]);
          return (
            <Html key={index} position={[x, y, z]}>
              <div
                className="divi"
                onClick={() => {
                  handleClick(icon);
                }}
              >
                <img src={icon.icon} alt={icon.page} className="imgi" />
              </div>
            </Html>
          );
        })}
    </>
  );
}

export default Icon;
