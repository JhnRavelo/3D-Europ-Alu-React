import { Canvas } from "@react-three/fiber";
import { AroundLight, HemiLight, ToplLight } from "../Light";
// import { Tone } from "../Postprocessing";
import Icon from "../Icon";
import Controls from "../Controls/Controls";
import Loading from "../../Loading/Loading";
import { Europ3 } from "../Models/Europ3";
import { useEffect, useState } from "react";

function EuropExterior() {
  const [position, setPosition] = useState([
    0.1207495869371528, 1.7967386171333914, 6.74719555004217,
  ]);
  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 900) {
      setPosition([0.21125456236270693, 2.143441231316623, 12.80439518887682]);
    } else {
      setPosition([0.1207495869371528, 1.7967386171333914, 6.74719555004217]);
    }
  }, []);

  return (
    <>
      <Canvas
        camera={{
          fov: 55,
          near: 0.1,
          far: 20,
          position: position,
        }}
      >
        {/* <Tone /> */}
        <Europ3 />
        <Icon />
        <AroundLight />
        <ToplLight />
        <HemiLight />
        <Controls />
      </Canvas>
      <Loading />
    </>
  );
}

export default EuropExterior;
