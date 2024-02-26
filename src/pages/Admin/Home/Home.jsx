import ChartBox from "../../../components/Admin/ChartBox/ChartBox";
import TopProduct from "../../../components/Admin/TopProduct/TopProduct";
import "./Home.scss";
import {
  chartBoxUser,
  chartBoxProduct,
  barChartBoxVisit,
} from "../../../assets/js/data";
import BigChartBox from "../../../components/Admin/BigBarChart/BigBarChart";
import PieChartBox from "../../../components/Admin/ChartPie/ChartPie";
import useAdminContext from "../../../hooks/useAdminContext";
import { useEffect, useState } from "react";
import charDataValue from "../../../lib/utils/charDataValue";
import differencePercentage from "../../../lib/utils/differencePercentage";

const data = [
  { name: "Jan", users: 0, number: 1 },
  { name: "Feb", users: 0, number: 2 },
  { name: "Mar", users: 0, number: 3 },
  { name: "Apr", users: 0, number: 4 },
  { name: "May", users: 0, number: 5 },
  { name: "Jun", users: 0, number: 6 },
  { name: "Jul", users: 0, number: 7 },
  { name: "Aug", users: 0, number: 8 },
  { name: "Sep", users: 0, number: 9 },
  { name: "Oct", users: 0, number: 10 },
  { name: "Nov", users: 0, number: 11 },
  { name: "Dec", users: 0, number: 12 },
];

const Home = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalProd, setTotalProd] = useState(0);
  const [chartDataUser, setChartDataUser] = useState(data);
  const [chartDataProd, setChartDataProd] = useState(data);
  const [chartDataVisit, setChartDataVisit] = useState(data);
  const [percUser, setPercUser] = useState(0);
  const [percProd, setPercProd] = useState(0);
  const { nbUser, nbProd } = useAdminContext();

  useEffect(() => {
    if (nbUser) {
      setTotalUser(nbUser.countUserByYear?.userCount);
      setChartDataUser((prevState) => {
        return charDataValue(prevState, nbUser, "countByMonthByYear");
      });

      setPercUser(() => {
        return differencePercentage(nbUser);
      });

      setChartDataVisit((prevState) => {
        return charDataValue(prevState, nbUser, "userVisitByMonth");
      });
    }

    if (nbProd) {
      setTotalProd(nbProd.countProdInterested[0]?.prodCount);
      setChartDataProd((prevState) => {
        return charDataValue(prevState, nbProd, "countByMonthByYear");
      });

      setPercProd(() => {
        return differencePercentage(nbProd);
      });
    }

  }, [nbUser, nbProd]);

  return (
    <div className="home">
      <div className="box box1">
        <TopProduct />
      </div>
      <div className="box box2">
        <ChartBox
          {...chartBoxUser}
          url={"/admin/user"}
          number={totalUser}
          chartData={chartDataUser}
          percentage={percUser}
        />
      </div>
      <div className="box box3">
        <ChartBox
          {...chartBoxProduct}
          url={"/admin/product"}
          number={totalProd}
          chartData={chartDataProd}
          percentage={percProd}
        />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box7">
        <BigChartBox {...barChartBoxVisit} chartData={chartDataVisit} />
      </div>
    </div>
  );
};

export default Home;
