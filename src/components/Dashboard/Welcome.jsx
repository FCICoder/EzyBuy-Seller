import React, { useEffect, useState } from "react";
import avatar from "../../data/avatar.svg";
import classes from "./Welcome.module.css";
import Card from "../UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
const Welcome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profits, setProfits] = useState(0);

  async function getRetailerProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://nodee-f764.onrender.com/product`, {
        headers: {
          authorization: localStorage.getItem("retailerToken"),
        },
      });
      if (data.message === "Products successfully retrieved") {
        setIsLoading(false);
        setName(data?.name);
        setProducts(data?.products);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
 
  async function getOrders() {
    try {
      await axios
        .get(`https://nodee-f764.onrender.com/customer/order/all`, {
          headers: {
            authorization: localStorage.getItem("retailerToken"),
          },
        })
        .then((res) => {
          setOrders(res?.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  let pft = 0;
  orders?.forEach((order, i) => {
    pft += order.quantity * order.price;
  });

  useEffect(() => {
    getRetailerProducts();
    getOrders();
  }, []);
  useEffect(()=>{
  setProfits(pft);  
  },[isLoading, pft]);

  let custId = orders?.map(order=>{
    return order.customerID
  });
  let ids = [...new Set(custId)]

  return (
    <>
      {isLoading ? (
        <div
          className=" w-100 py-5 fs-1 d-flex justify-content-center align-items-center"
          style={{}}
        >
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <Card>
          <div className={classes.info}>
            <div className={classes.text}>
              <h2>Welcome Back </h2>
              <h3>{name} </h3>
            </div>
            <img src={avatar} alt="..." />
          </div>
          <hr />
          <div className={classes.data}>
            <div className={classes.stat}>
              <div className={classes.icon}>
                <FontAwesomeIcon
                  icon={icon.faBoxOpen}
                  size="xl"
                  color="orange"
                />
              </div>
              <h1>{products?.length}</h1>
              <p>Products</p>
            </div>
            <div className={classes.stat}>
              <div className={classes.icon}>
                <FontAwesomeIcon icon={icon.faUsers} size="xl" color="blue" />
              </div>
              <h1>{ids?.length}</h1>
              <p>Clients</p>
            </div>
            <div className={classes.stat}>
              <div className={classes.icon}>
                <FontAwesomeIcon
                  icon={icon.faSackDollar}
                  size="xl"
                  color="green"
                />
              </div>
              <h1>{Math.round(profits)}$</h1>
              <p>Profits</p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Welcome;
