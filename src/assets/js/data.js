import chartUser from "../../assets/png/chart.png"
import chartProd from "../../assets/png/analysis.png"

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