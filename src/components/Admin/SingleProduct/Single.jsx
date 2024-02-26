import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Single.scss";
import propTypes from "prop-types";

const Single = (props) => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
          </div>
          <div className="details">
            <div className="item">
              <p>{props.description}</p>
              <div className="gallery-single">
                {props.gallery?.length > 0 &&
                  props.gallery.map((url, index) => (
                    <a
                      data-fancybox={`gallery${props.id}`}
                      href={url}
                      key={index}
                    >
                      <img src={url} alt="gallery" />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Dernier activités</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity, index) => {
                const time = activity.time.split(":")
              return (
                <li key={index}>
                  <div>
                    <p>{`${activity.user.name} est intéressé par ce produit`}</p>
                    <time>{`${activity.date} ${time[0]}:${time[1]}`}</time>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

Single.propTypes = {
  title: propTypes.string,
  gallery: propTypes.array,
  img: propTypes.string,
  activities: propTypes.any,
  chart: propTypes.any,
  id: propTypes.string,
  description: propTypes.string,
  data: propTypes.array,
};

export default Single;
