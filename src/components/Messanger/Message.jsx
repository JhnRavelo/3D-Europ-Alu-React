/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import propTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import pdf from "../../assets/png/pdf.png";
import excel from "../../assets/png/feuilles.png";
import standard from "../../assets/png/fichier.png";
import doc from "../../assets/png/doc.png";
import DownloadSVG from "../../assets/svg/DownloadSVG";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Message = ({ message, start }) => {
  const ref = useRef();
  const [Now, setNow] = useState(new Date());
  const [dispalyDate, setDisplayDate] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (start == 10) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, start]);

  useEffect(() => {
    handleDate();
  }, [Now, message]);

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 60 * 60 * 1000);
  }, []);

  const handleDate = () => {
    const date = message?.date.split("-");
    const hour = message?.time.split(":");
    var intervalHour, interDay;
    const YearNow = Now.getFullYear();
    const hourNow = Now.getHours();
    const monthNow = Now.getMonth() + 1;
    const dayNow = Now.getDate();
    if (date[0] == YearNow && date[1] == monthNow && date[2] == dayNow) {
      intervalHour = hourNow - hour[0];
      if (intervalHour == 0) {
        setDisplayDate("a moment ago");
      } else {
        setDisplayDate(`${intervalHour} hour ago`);
      }
    } else if (date[0] == YearNow && date[1] == monthNow) {
      interDay = dayNow - date[2];
      if (interDay < 7) {
        setDisplayDate(`${interDay} day ago`);
      } else if (interDay == 7) {
        setDisplayDate("a week ago");
      } else {
        setDisplayDate(`${date[2]} this month`);
      }
    } else if (date[0] == YearNow) {
      setDisplayDate(
        `${date[2]} ${monthNames[date[1] - 1]} ${hour[0]}:${hour[1]}`
      );
    } else {
      setDisplayDate(
        `${date[2]} ${monthNames[date[1] - 1]} ${date[0]} ${hour[0]}:${hour[1]}`
      );
    }
  };

  const handleDownload = async (file, name) => {
    try {
      const res = await axiosPrivate.post(
        "/message/download",
        { file },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {message?.text || message?.img || message?.file ? (
        <div
          ref={ref}
          className={`message ${
            message?.send?.ID_user === auth?.id && "owner"
          } `}
        >
          <div className="messageInfo">
            <img
              src={message?.send?.avatar}
              alt={
                "photo de profil de" + message?.send?.ID_user === auth?.id
                  ? " de l'émetteur"
                  : "du récepteur"
              }
              title={
                "photo de profil de" + message?.send?.ID_user === auth?.id
                  ? " de l'émetteur"
                  : "du récepteur"
              }
              loading="eager"
            />
            <span>{dispalyDate}</span>
          </div>
          <div className="messageContent">
            {message?.text && (
              <p className="message-background">{message.text}</p>
            )}
            {message?.img &&
              message.img.split(",").map((img, index) => (
                <div className="message-background img-container" key={index}>
                  <img src={img} alt="image rattaché au message" />
                  <DownloadSVG
                    width="60"
                    height="60"
                    onClick={() =>
                      handleDownload(
                        img,
                        img.split("/")[img.split("/").length - 1]
                      )
                    }
                    className="message-download-svg"
                  />
                </div>
              ))}
            {message?.file &&
              message.file.split(",").map((file, index) => {
                const ext = file.split(".")[file.split(".").length - 1];
                const name = file.split("/")[file.split("/").length - 1];
                return (
                  <div key={index} className="message-background">
                    <div className="message-file-container">
                      <div className="message-icon-container">
                        <img
                          src={
                            ext == "pdf"
                              ? pdf
                              : ext == "doc" || ext == "docx"
                              ? doc
                              : ext == "xlsx" || ext == "xls"
                              ? excel
                              : standard
                          }
                          alt="icon document"
                        />
                        <div className="message-name-container">
                          <span>{name}</span>
                          <span className="message-file-extension">
                            {ext.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <DownloadSVG
                        width="50"
                        height="50"
                        onClick={() => handleDownload(file, name)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
    </>
  );
};

Message.propTypes = {
  message: propTypes.any,
  start: propTypes.number,
};

export default Message;
