import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./ChartPie.scss";
import useAdminContext from "../../../hooks/useAdminContext";
import { useEffect, useState } from "react";
import generateColor from "../../../lib/utils/generateColor";

const data = [
  { name: "Fenêtre", value: 400, color: "#0088FE" },
  { name: "Habillage", value: 300, color: "#00C49F" },
  { name: "Volet", value: 300, color: "#FFBB28" },
  { name: "Cloison", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {
  const { nbProd } = useAdminContext();
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    if (nbProd !== 0) {
      if (nbProd?.countProductByPageByMonth) {
        setChartData(() => {
          const chart = nbProd.countProductByPageByMonth.map((prod) => {
            const color = generateColor();
            return {
              name: prod.page.page,
              value: prod.trakers[0].Cacount,
              color: color,
            };
          });
          return chart
        });
      }
    }
  }, [nbProd]);

  return (
    <div className="pieChartBox">
      <h1>Par Catégorie</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={chartData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {chartData.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name.split(" ").length > 1 ? `${item.name.split(" ")[0][0]}. ${item.name.split(" ")[1]}` : `${item.name.split(" ")[0]}`}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
