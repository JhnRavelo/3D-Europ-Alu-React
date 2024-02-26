import { useEffect, useRef, useState } from "react";
import useAdminContext from "../../../hooks/useAdminContext";
import "./Log.scss";

const Log = () => {
  
  const { log } = useAdminContext();
  const [list, setList] = useState([]);
  const logRef = useRef();
  
    useEffect(() => {
      if (log.listByYear.length !== 0) {
        setList(log.listByYear);
      }
      logRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [log]);


  return (
    <>
      <h1 className="h1__journal">Journals</h1>
      <div className="log" ref={logRef}>
        {list.map((item, index) => {
          const time = item.time.split(":")
          return (
            <div className="journal" key={index}>
              {item.user ? (
                <>
                  <h2>{`${item.user.name} a créer un compte avec adresse email ${item.user.email}`}</h2>
                  <h2 className="date">
                    {item.date} à {`${time[0]}:${time[1]}`}
                  </h2>
                </>
              ) : (
                <>
                  <h2>{`${item.traker.user.name} est intéresser par ${item.traker.product.title}`}</h2>
                  <h2 className="date">
                    {item.date} à {`${time[0]}:${time[1]}`}
                  </h2>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Log;
