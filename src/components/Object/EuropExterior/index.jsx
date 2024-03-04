import { Canvas } from "@react-three/fiber";
import { AroundLight, HemiLight, ToplLight } from "../Light";
import { Tone } from "../Postprocessing";
import Icon from "../Icon";
import Controls from "../Controls/Controls";
import { useRef } from "react";
import Loading from "../../Loading/Loading";
import { Europ2 } from "../Models/Europ2";

function EuropExterior() {
  const controlsRef = useRef();

  return (
    <>
      <Canvas
        ref={controlsRef}
        camera={{
          fov: 45,
          near: 0.1,
          far: 20,
          position: [0.1207495869371528, 1.7967386171333914, 6.74719555004217],
        }}
      >
        <Tone />
        <Europ2 />
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
