import { useEffect, useRef, useState } from "react";
import propTypes from "prop-types";
import useButtonContext from "../../hooks/useButtonContext";

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

const Message = ({ message }) => {
  const ref = useRef();
  const { dataPage } = useButtonContext();
  const [Now, setNow] = useState(new Date());
  const [dispalyDate, setDisplayDate] = useState("");

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    handleDate();
  }, [Now]);

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 10 * 60 * 60 * 1000);
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

  return (
    <>
      <div
        ref={ref}
        className={`message ${
          message?.send?.ID_user === dataPage?.userRead[0]?.ID_user && "owner"
        } `}
      >
        <div className="messageInfo">
          <img src={message?.send?.avatar} alt="sary" />
          <span>{dispalyDate}</span>
        </div>
        <div className="messageContent">
          <p>{message?.text}</p>
          {message?.img && <img src={message?.img} alt="sary" />}
        </div>
      </div>
    </>
  );
};

Message.propTypes = {
  message: propTypes.any,
};

export default Message;
