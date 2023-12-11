import {useEffect , useState } from "react";
import Card from "../UI/Card";
import classes from "./Most.module.css";
import axios from "axios";
import avatar from "../../data/avatar.svg";

const MostActiveClients = () => {
  const [customers, setCustomers] = useState([]);
  const [orders , setOrders] = useState([]);

  async function getAllCustomers() {
    try {
      const { data } = await axios.get(`https://nodee-f764.onrender.com/customer`);
      if (data.message === "customers retrieved successfully") {
        setCustomers(data?.customers);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
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
      setOrders(data)
    } catch (err) {
      console.log(err.message);
    }
  }
  
  useEffect(()=>{
    getAllCustomers();
    getOrders();
  },[]);
  let custId = orders?.map(order=>{
    return order.customerID
  });
  let ids = [...new Set(custId)]


  let clients = []
   customers?.map(cust=>{
      ids?.map(cus=>{
        if(cus ===  cust?._id){
          clients.push(cust);
          return cust
      }
      return cust
    })
    return cust
  })


  return <>
    <Card>
      <h1 className="font-bold" >Most Active Clients</h1>
      <div className={classes.group}>
        {clients?.map((client) => {
          return <>
            <div key={client._id} className={`${classes.object}`}>
              <div className={` w-100 d-flex justify-content-between  ${classes.details}`}>
                <div>
                <img
                  src={avatar} alt='a' 
                  width={25 }
                />
                </div>
                <div>
                  <p className="font-bold" style={{fontSize:'10px'}}>{client.name}</p>
                </div>
                <div  className='' >
                  <p className="font-bold" style={{fontSize:'10px'}}>{client.phone}</p>
                </div>
              </div>
            </div>
            </>
        })}
      </div>
    </Card>
    </>
};

export default MostActiveClients;
