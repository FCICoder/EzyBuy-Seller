import Card from "../UI/Card";
import { Chart } from "primereact/chart";
import { MenuContext } from "../../contexts/Menu";
import { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const Chart2 = () => {
  const [orders, setOrders] = useState([]);
  async function getOrders() {
    try {
      await axios
        .get(`https://nodee-f764.onrender.com/customer/order/all`, {
          headers: {
            authorization: localStorage.getItem("retailerToken"),
          },
        })
        .then((res) => {
          console.log(res);
          setOrders(res?.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  }
  let delivered = orders?.filter(ord=> ord.status === 'delivered')
  let pending = orders?.filter(ord=> ord.status === "pending")
  let shipping = orders?.filter(ord=> ord.status === "shipping")


  useEffect(()=>{
    getOrders();
  },[])
  const menuCtx = useContext(MenuContext);
  const data = {
    datasets: [
      {
        data: [delivered?.length,pending?.length,shipping?.length],
        backgroundColor: [
          "#B9F3E4",
          "#EA8FEA",
          "#FFAACF",
        ],
        borderColor: [
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
        ],
        label: "Status of Orders",
      },
    ],
    labels: ["delivered", "pending","shipping"],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: `${menuCtx.darkMode ? "white" : "gray"}`,
        },
      },
    },
    scales: {
      r: {
        grid: {
          color: "gray",
        },
      },
    },
  };

  return <>
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Your Orders Status
        </h1>
        <Chart
          type="polarArea"
          data={data}
          options={options}
          style={{ position: "relative",width:'220px' }}
        />
      </div>
    </Card>
    </>
};

export default Chart2;
