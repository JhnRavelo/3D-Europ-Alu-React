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
import { dataHome } from "../../../assets/js/data";

const Home = () => {
  const [totalUser, setTotalUser] = useState(0);
  const [totalProd, setTotalProd] = useState(0);
  const [chartDataUser, setChartDataUser] = useState(dataHome);
  const [chartDataProd, setChartDataProd] = useState(dataHome);
  const [chartDataVisit, setChartDataVisit] = useState(dataHome);
  const [percUser, setPercUser] = useState(0);
  const [percProd, setPercProd] = useState(0);
  const { nbUser, nbProd } = useAdminContext();

  useEffect(() => {
    if (nbUser) {
      setTotalUser(nbUser.countUserByYear?.userCount);
      setChartDataUser(() => {
        return charDataValue(nbUser, "countByMonthByYear");
      });

      setPercUser(() => {
        return differencePercentage(nbUser);
      });

      setChartDataVisit(() => {
        return charDataValue(nbUser, "userVisitByMonth");
      });
    }

    if (nbProd) {
      setTotalProd(nbProd.countProdInterested[0]?.prodCount);
      setChartDataProd(() => {
        return charDataValue(nbProd, "countByMonthByYear");
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
