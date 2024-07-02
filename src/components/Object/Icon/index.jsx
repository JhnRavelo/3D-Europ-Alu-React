import { Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import usePage from "../../../hooks/usePage";

function Icon() {
  const {pages} = usePage()
  const navigate = useNavigate();

  const handleClick = (icon) => {
    const link = icon.page.toLowerCase().split(" ").join("-")
    navigate(`/produits/${link}`);
  };

  return (
    <>
      {pages?.length > 0 &&
        pages.map((icon, index) => {
          const position = icon.position.split(",");
          const x = parseFloat(position[0]),
            y = parseFloat(position[1]),
            z = parseFloat(position[2]);
          const alt = icon?.ID_page != 7 ? `menuiserie aluminium ${icon?.page}` : icon?.page
          return (
            <Html key={index} position={[x, y, z]}>
              <div
                className="icon-container"
                onClick={() => {
                  handleClick(icon);
                }}
              >
                <img src={icon.icon} alt={alt} title={alt} className="icon" />
              </div>
            </Html>
          );
        })}
    </>
  );
}

export default Icon;
