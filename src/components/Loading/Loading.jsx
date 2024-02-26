import { useProgress } from "@react-three/drei";
import "./Loading.css";

const Loading = () => {
  const { progress } = useProgress();
  return (
    <>
      { progress != 100 &&
        <div className="loading">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      }
    </>
  );
};

export default Loading;
