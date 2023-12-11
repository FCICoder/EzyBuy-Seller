import { useState, useEffect } from 'react';
import axios from "axios";
import Card from "../UI/Card";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./OrdersData.module.css";
import { Chart } from "primereact/chart";

const OrdersData = () => {
  const [products, setProducts] = useState([]);
  async function getOrders() {
    try {
      const { data } = await axios.get(
        `https://nodee-f764.onrender.com/customer/order/all`,
        {
          headers: {
            authorization: localStorage.getItem("retailerToken"),
          },
        }
      );
      // console.log(data);
      setProducts(data)
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(()=>{
    getOrders();
  },[])

  const data = {
    labels: ["Delivered", "Shipped", "Canceld"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#22C55E", "orange", "#C51F27"],
        hoverBackgroundColor: ["green", "orangered", "red"],
      },
    ],
  };
  const options = {
    cutout: "60%",
  };
  return (
    <Card>
      <div className={classes.orders}>
        <FontAwesomeIcon
          icon={icon.faBoxOpen}
          className={classes.icon}
          size="custom"
          color="#22C55E"
        />
        <h2>{products.length}</h2>
        <p> Orders This Month</p>
      </div>
      <hr />
      <Chart
        type="doughnut"
        data={data}
        options={options}
        className="w-full md:w-30rem"
      />
      <hr />
      <div className={classes.work}>
        <FontAwesomeIcon
          icon={icon.faThumbsUp}
          className={classes.icon}
          size="custom"
          color="#22C55E"
        />
        <h2>
          You're <span>better</span> Than Last Month By <span>80%</span>
        </h2>
        <p>Keep The Good Work!</p>
      </div>
    </Card>
  );
};

export default OrdersData;
