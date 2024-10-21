import { Helmet } from "react-helmet-async";
import GameContainer from "../../components/Game/GameContainer/GameContainer";
import wheelAudio from "../../assets/audio/Wheel.mp3";
import fireworksAudio from "../../assets/audio/Fireworks.mp3";
import openModalAudio from "../../assets/audio/Modal.mp3";
import "./roulette.scss";
import { useRef, useState } from "react";
import { prizes } from "../../assets/js/roulette";
import GameModal from "../../components/Game/GameModal/GameModal";
import { useNavigate } from "react-router-dom";
import useParticipant from "../../hooks/useParticipant";

const Roulette = () => {
  const rouletteRef = useRef();
  const btnRef = useRef();
  const [prize, setPrize] = useState();
  const [open, setOpen] = useState();
  const { participant } = useParticipant();
  const audio = new Audio(wheelAudio);
  const audioModal = new Audio(openModalAudio);
  const audioResult = new Audio(fireworksAudio);
  const navigate = useNavigate();
  localStorage.getItem("partjeux");

  const handleSpin = () => {
    if (btnRef.current && rouletteRef.current) {
      const numberOfSpin = Math.ceil(Math.random() * 4000) + 2000;
      btnRef.current.style.pointerEvents = "none";
      rouletteRef.current.style.transition = "all 8s ease";
      rouletteRef.current.style.transform = "rotate(" + numberOfSpin + "deg)";
      rouletteRef.current.classList.add("blur");
      const remain = numberOfSpin % 360;
      let prizeOfThePlayer;
      if (remain < 22.5) {
        prizeOfThePlayer = prizes[0];
      } else
        prizeOfThePlayer = prizes.find(
          (prize) => remain > prize.minDeg && remain <= prize.maxDeg
        );
      setPrize(prizeOfThePlayer);
      audio.play();
    }
  };

  const handleGame = () => {
    rouletteRef.current.classList.remove("blur");
    setOpen(true);
    audioModal.play();
    setTimeout(() => {
      audioResult.play();
    }, 800);
    setTimeout(() => {
      audioResult.pause();
      navigate("/jeux");
    }, 5000);
  };

  return (
    <>
      <Helmet>
        <title>Jeux - {"Europ'Alu Madagascar"}</title>
        <meta
          name="description"
          content="Jeux de roue de fortune pour determiner un gagnant."
        />
        <link rel="canonical" href="https://3d.europ-alu.com/roulette" />
      </Helmet>
      <GameContainer slug="roulette">
        <GameModal prize={prize} open={open} winnerName={participant?.fullName} />
        <div className="roulette-component">
          <div className="triangle"></div>
          <button id="spin" ref={btnRef} onClick={() => handleSpin()}>
            Jouez
          </button>
          <div
            className="roulette-container"
            ref={rouletteRef}
            onAnimationEnd={() => handleGame()}
          >
            {prizes.map((prize, index) => (
              <div className={prize.className} key={index}>
                <img className="emoji" src={prize.img} alt="prix du jeux" />
              </div>
            ))}
          </div>
        </div>
      </GameContainer>
    </>
  );
};

export default Roulette;
