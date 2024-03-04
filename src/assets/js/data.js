import chartUser from "../../assets/png/chart.png";
import chartProd from "../../assets/png/analysis.png";

export const chartBoxUser = {
  color: "#8884d8",
  icon: chartUser,
  title: "Total Users",
  dataKey: "users",
};

export const chartBoxProduct = {
  color: "skyblue",
  icon: chartProd,
  title: "Total Produits Intéréssés",
  dataKey: "users",
};

export const barChartBoxVisit = {
  title: "Total Visite",
  color: "#FF8042",
  dataKey: "users",
};

export const singleProductData = {
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "interested", color: "#8884d8" },
    ],
  },
};

export const dataHome = [
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
