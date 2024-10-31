/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from "react-helmet-async";
import GameContainer from "../../components/Game/GameContainer/GameContainer";
import wheelAudio from "../../assets/audio/Wheel.mp3";
import fireworksAudio from "../../assets/audio/Fireworks.mp3";
import openModalAudio from "../../assets/audio/Modal.mp3";
import "./roulette.scss";
import { useEffect, useRef, useState } from "react";
import { prizes } from "../../assets/js/roulette";
import GameModal from "../../components/Game/GameModal/GameModal";
import { useNavigate } from "react-router-dom";
import useParticipant from "../../hooks/useParticipant";
import useGetParticipation from "../../hooks/useGetParticipation";
import { toast } from "react-toastify";
import defaultAxios from "../../api/axios";
import { FacebookShareButton } from "react-share";

const Roulette = () => {
  const rouletteRef = useRef();
  const btnRef = useRef();
  const facebookRef = useRef();
  const [prize, setPrize] = useState();
  const [open, setOpen] = useState();
  const { participant } = useParticipant();
  const audio = new Audio(wheelAudio);
  const audioModal = new Audio(openModalAudio);
  const audioResult = new Audio(fireworksAudio);
  const navigate = useNavigate();
  const getParticipation = useGetParticipation();

  const handleSpin = () => {
    if (btnRef.current && rouletteRef.current) {
      let numberOfSpin = Math.ceil(Math.random() * 4000) + 2000;
      let remain = numberOfSpin % 360;
      if (remain > 292.5 && remain <= 337.5) numberOfSpin += 40;
      btnRef.current.style.pointerEvents = "none";
      rouletteRef.current.style.transition = "all 8s ease";
      rouletteRef.current.style.transform = "rotate(" + numberOfSpin + "deg)";
      rouletteRef.current.classList.add("blur");
      let prizeOfThePlayer;
      remain = numberOfSpin % 360;
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

  const handleGame = async () => {
    rouletteRef.current.classList.remove("blur");
    const res = await defaultAxios.post("/participation/prize", {
      prize: prize.name,
      img: prize.img,
    });

    if (!res.data.success) {
      navigate("/jeux");
      return;
    } else if (res.data.success == "other") {
      navigate("/");
      return;
    }
    setOpen(true);
    audioModal.play();
    setTimeout(() => {
      audioResult.play();
    }, 800);
    setTimeout(() => {
      audioResult.pause();
      toast.info(
        "Merci d'avoir participer, nous vous avons envoyer votre cadeaux par email"
      );
      facebookRef.current.click();
      navigate("/");
    }, 5000);
  };

  useEffect(() => {
    getParticipation("/jeux");
  }, []);

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
      <FacebookShareButton
        url="https://3d.europ-alu.com/jeux"
        ref={facebookRef}
        style={{ display: "none" }}
      />
      <GameContainer slug="roulette">
        <GameModal
          prize={prize}
          open={open}
          winnerName={participant?.fullName}
        />
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
                <img className="emoji" src={prize.file} alt="prix du jeux" />
              </div>
            ))}
          </div>
        </div>
      </GameContainer>
    </>
  );
};

export default Roulette;
