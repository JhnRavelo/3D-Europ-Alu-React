import { Link } from "react-router-dom";
import "./ChartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import propTypes from "prop-types";

const CustomTooltip = ({ active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {payload.map((item, index) => {
          return (
            <p key={index} className={`data ${item.dataKey}`}>
              {`${item.payload.name}: ${item.value}`}
            </p>
          );
        })}
      </div>
    );
  }
};

const ChartBox = (props) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" className="ChartIcon" />
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        <Link to={props.url} style={{ color: props.color }}>
          Visionner
        </Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
                content={<CustomTooltip />}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">Ce mois</span>
        </div>
      </div>
    </div>
  );
};

ChartBox.propTypes = {
  color: propTypes.string,
  icon: propTypes.string,
  title: propTypes.string,
  dataKey: propTypes.string,
  number: propTypes.any,
  percentage: propTypes.number,
  chartData: propTypes.any,
  url: propTypes.string,
};

CustomTooltip.propTypes = {
  active: propTypes.any,
  payload: propTypes.array
}

export default ChartBox;
