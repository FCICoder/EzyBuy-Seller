import { useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import { Chart } from "primereact/chart";
import { MenuContext } from "../../contexts/Menu";
import axios from "axios";
const LastProducts = () => {
  const [products, setProducts] = useState([]);
  async function getOrders() {
    try {
      await axios
        .get(`https://nodee-f764.onrender.com/product/all`)
        .then((res) => {
          setProducts(res?.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  }


  let beauty = products?.filter(prd=> prd.category === 'Beauty')
  let electronics = products?.filter(prd => prd.category === 'electronics') 
  let grocery = products?.filter(prd => prd.category === 'groceries') 
  let fashion = products?.filter(prd => prd.category === 'fashion') 
  let Kids = products?.filter(prd => prd.category === 'Kids') 


  useEffect(() => {
    getOrders();
  }, []);
  const menuCtx = useContext(MenuContext);
  const data = {
    labels: ["beauty","electronics","groceries","fashion","Kids"],
    datasets: [
      {
        label: "Categories",
        backgroundColor: "#ECA869",
        borderColor: "#ECA869",
        data: [beauty?.length , electronics?.length , grocery?.length, fashion?.length,Kids?.length],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    aspectRatio:.5,
    plugins: {
      legend: {
        labels: {
          fontColor: `${menuCtx.darkMode ? "white" : "gray"}`,
          fontWeight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: `${menuCtx.darkMode ? "white" : "gray"}`,
          font: {
            weight: "bold",
            size:"11px",
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: `${menuCtx.darkMode ? "white" : "gray"}`,
        },
        grid: {
          color: `${menuCtx.darkMode ? "white" : "gray"}`,
          drawBorder: true,
        },
      },
    },
  };
  return (
    <Card>
      <Chart
        type="bar"
        data={data}
        options={options}
        style={{ height: "250px" }}
      />
    </Card>
  );
};

export default LastProducts;
