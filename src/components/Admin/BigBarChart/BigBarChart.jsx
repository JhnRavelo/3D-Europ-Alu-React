import './BigBarChart.scss'
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
  } from "recharts";
  import propTypes from 'prop-types'
  
  const CustomTooltip = ({ active, payload}) => {
    if (active && payload && payload.length) {
      
      return (
        <div className="custom-tooltipBig">
          {payload.map((item, index) => {
            return (
              <p key={index} className={`data ${item.dataKey}`} >
                {`${item.payload.name}: ${item.value} Visites`}
              </p>
            );
          })}
        </div>
      );
    }
  };
  
  const BigChartBox = (props) => {
    return (
      <div className="bigChartBox">
        <h1>Total Visite</h1>
        <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{fill:"none"}}
              content={<CustomTooltip/>}
            />
            <XAxis dataKey="name" />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  };

BigChartBox.propTypes = {
    chartData: propTypes.any,
    dataKey: propTypes.string,
    color: propTypes.string
}

CustomTooltip.propTypes = {
  active: propTypes.any,
  payload: propTypes.array
}
  
  export default BigChartBox;
  