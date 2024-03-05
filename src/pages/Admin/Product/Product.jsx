/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import useAdminContext from "../../../hooks/useAdminContext";
import { useEffect } from "react";
import Single from "../../../components/Admin/SingleProduct/Single";
import { singleProductData } from "../../../assets/js/data";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState } from "react";

const data = [
  { name: "Jan", visits: 0, number: 1, interested: 0 },
  { name: "Feb", visits: 0, number: 2, interested: 0 },
  { name: "Mar", visits: 0, number: 3, interested: 0 },
  { name: "Apr", visits: 0, number: 4, interested: 0 },
  { name: "May", visits: 0, number: 5, interested: 0 },
  { name: "Jun", visits: 0, number: 6, interested: 0 },
  { name: "Jul", visits: 0, number: 7, interested: 0 },
  { name: "Aug", visits: 0, number: 8, interested: 0 },
  { name: "Sep", visits: 0, number: 9, interested: 0 },
  { name: "Oct", visits: 0, number: 10, interested: 0 },
  { name: "Nov", visits: 0, number: 11, interested: 0 },
  { name: "Dec", visits: 0, number: 12, interested: 0 },
];

const Product = () => {
  const { id } = useParams();
  const {
    singleProduct,
    year,
    nbUser,
    onInterested,
    products,
    setSingleProduct,
  } = useAdminContext();
  const privateAxios = useAxiosPrivate();
  const [dataProduct, setDataProduct] = useState(null);
  const [chartSingle, setChartSingle] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const dataProd = await privateAxios.post("/traker/single", {
          year: year,
          id: id,
        });
        setDataProduct(dataProd.data);
      }
    };
    fetchData();
    if (products) {
      const single = products.filter((item) => item.id == id);
      setSingleProduct(single[0]);
    }
  }, [id, year, products]);

  useEffect(() => {
    if (nbUser && dataProduct) {
      setChartSingle(() => {
        const newState = data.map((prev) => {
          const matchVisit = nbUser?.userVisitByMonth.find(
            (nb) => nb.month == prev.number
          );
          const matchProd = dataProduct?.countByMonthByYear.find(
            (nb) => nb.month == prev.number
          );

          if (matchVisit || matchProd) {
            return {
              ...prev,
              interested: matchProd?.count || 0,
              visits: matchVisit?.count || 0,
            };
          } else {
            return prev;
          }
        });

        return newState;
      });
    }
  }, [nbUser, onInterested, dataProduct]);

  return (
    <div className="product">
      <Single
        title={singleProduct?.title}
        id={id}
        img={singleProduct?.png}
        description={singleProduct?.description}
        gallery={singleProduct?.gallery.split(",")}
        data={chartSingle}
        activities={dataProduct?.logSingleProductInterested}
        {...singleProductData}
      />
    </div>
  );
};

export default Product;
