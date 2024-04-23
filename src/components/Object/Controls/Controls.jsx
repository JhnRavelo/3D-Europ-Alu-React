import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { imgAnimation } from "../../../lib/utils/imgAnimation";
import useButtonContext from "../../../hooks/useButtonContext";
import { useState } from "react";

const Controls = () => {
  const controlsRef = useRef();
  const { data } = useButtonContext();
  const [maxDistance, setMaxDistance] = useState(10);
  const [maxDistanceDisplay, setMaxDistanceDisplay] = useState(7);
  const [minDistanceDispaly, setMinDistanceDisplay] = useState(5);

  useFrame(() => {
    const deviceWidth = window.innerWidth;
    const azimuth = controlsRef.current.getAzimuthalAngle();
    const polar = controlsRef.current.getPolarAngle();
    const distance = controlsRef.current.getDistance();
    if (deviceWidth < 900) {
      setMaxDistance(20);
      setMaxDistanceDisplay(13);
      setMinDistanceDisplay(4);
    }else {
      setMaxDistance(10);
      setMaxDistanceDisplay(7);
      setMinDistanceDisplay(5);
    }

    if (data?.length > 0) {
      data.map((item, index) => {
        imgAnimation(
          item.minXAngle,
          item.maxXAngle,
          item.maxYAngle,
          index,
          polar,
          azimuth,
          maxDistanceDisplay,
          minDistanceDispaly,
          distance
        );
      });
    }
  });
  return (
    <OrbitControls
      ref={controlsRef}
      maxDistance={maxDistance}
      minDistance={2}
      enablePan={false}
      maxPolarAngle={Math.PI / 2}
      rotateSpeed={1}
    />
  );
};

export default Controls;
