import { useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
import { Form } from "react-router-dom";
import classes from "./FormData.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MenuContext } from "../../contexts/Menu";
import axios from "axios";
const FormData = () => {
  const menuCtx = useContext(MenuContext);
  const [info, setInfo] = useState({});
  const [updatedInfo, setUpdatedInfo] = useState({});
  const darkClasses = classes.form + " " + classes.formDark;
  useEffect(() => {
    async function getPersonalInfo() {
      try {
        const res = await axios({
          method: "get",
          url: "https://nodee-f764.onrender.com/retailer/info",
          headers: {
            authorization: `${localStorage.getItem("retailerToken")}`,
          },
        });
        setInfo(res.data);
        setUpdatedInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getPersonalInfo();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await axios({
        method: "patch",
        url: "https://nodee-f764.onrender.com/retailer",
        headers: {
          authorization: `${localStorage.getItem("retailerToken")}`,
        },
        data: {
          data: updatedInfo
        },
      });
      toast("Data Updated Successfully!")
      // console.log(res.data);
      // setInfo(res.data);
    } catch (err) {
      console.log('asd');
      console.log(err);
    }
  }
  // const [isLoading, setIsLoading] = useState(false);
  // async function getRetailerProducts() {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(`https://nodee-f764.onrender.com/retailr/info`, {
  //       headers: {
  //         authorization: localStorage.getItem("retailerToken"),
  //       },
  //     });
  //     if (data.message === "Products successfully retrieved") {
  //       setIsLoading(false);

  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }
  // useEffect(() => {
  //   getRetailerProducts();
  // }, []);


  return (
    <>
      { (
        <Card>
                  <ToastContainer />

          <Form onSubmit={(e)=>submitHandler(e)} className={menuCtx.darkMode ? darkClasses : classes.form}>
            <div className={classes.data}>
              <h1 className={classes.text}>Basic Information</h1>
              <div className={classes.field}>
                <label htmlFor="name"> Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={info.name}
                  value={updatedInfo.name}
                  onChange={(e) =>
                    setUpdatedInfo({ ...updatedInfo, name: e.target.value })
                  }
                />
              </div>
              <div className={classes.field}>
                <label htmlFor="email"> Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={info.email}
                  value={updatedInfo.email}
                  onChange={(e) =>
                    setUpdatedInfo({ ...updatedInfo, email: e.target.value })
                  }
                />
              </div>

              <div className={classes.field}>
                <label htmlFor="phone"> Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  defaultValue={info.phone}
                  value={updatedInfo.phone}
                  onChange={(e) =>
                    setUpdatedInfo({ ...updatedInfo, phone: e.target.value })
                  }
                />
              </div>

              <div className={classes.field}>
                <label htmlFor="money"> Withdrawal Threshold $</label>
                <input
                  type="number"
                  min="100"
                  max="1000"
                  name="money"
                  id="money"
                  defaultValue={info.withdrawalThreshold || ""}
                  value={updatedInfo.withdrawalThreshold || ""}
                  onChange={(e) =>
                    setUpdatedInfo({
                      ...updatedInfo,
                      withdrawalThreshold: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className={classes.data}>
              <h1 className={classes.text}>payment Information</h1>
              <div className={classes.field}>
                <label htmlFor="paypal">PayPal Email</label>
                <input
                  type="text"
                  name="paypal"
                  id="paypal"
                  defaultValue={info.paypal || ""}
                  value={updatedInfo.paypal || ""}
                  onChange={(e) =>
                    setUpdatedInfo({ ...updatedInfo, paypal: e.target.value })
                  }
                />
              </div>
              <div className={classes.field}>
                <label htmlFor="country"> Resident Country </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  defaultValue={info.country || ""}
                  value={updatedInfo.country || ""}
                  onChange={(e) =>
                    setUpdatedInfo({ ...updatedInfo, country: e.target.value })
                  }
                />
              </div>

              <div className={classes.field}>
                <label htmlFor="postal"> Postal Code</label>
                <input
                  type="number"
                  name="postal"
                  id="postal"
                  defaultValue={info.postal || ""}
                  value={updatedInfo.postal || ""}
                  onChange={(e) =>
                    setUpdatedInfo({ ...updatedInfo, postal: e.target.value })
                  }
                />
              </div>
            </div>

            <div className={classes.btns}>
              <button type="submit">Save Changes</button>
              <button>Reset</button>
            </div>
          </Form>
        </Card>
      )}
    </>
  );
};

export default FormData;
