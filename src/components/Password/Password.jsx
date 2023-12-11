import style from "./Password.module.css";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../services/auth";
import { LoginContext } from "../../contexts/LoginContext";

export default function Password() {
  let { setRetailerToken } = useContext(LoginContext);
  let [togglerType, setTogglerType] = useState("password");
  let [toggler, setToggler] = useState("Show");
  let toggle = () => {
    if (togglerType === "password") {
      setTogglerType("text");
      setToggler("Hide");
    } else {
      setTogglerType("password");
      setToggler("Show");
    }
  };

  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isLoading, setisLoading] = useState(false);

  async function loginSubmit(values) {
    setisLoading(true);
    try {
      let email = localStorage.getItem("retailerEmail");
      values.email = email;
      let { data } = await login(values);
      if (data.message === "logged in successfully") {
        setisLoading(false);
        localStorage.setItem("retailerToken", data.token);
        setRetailerToken(data.token);
        toast.success("logged in successfully");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      setisLoading(false);
      toast.error("invalid Password");
    }
  }

  let validateSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z]{6,}$/,
        "password is invalid start with upper case and min is 8 char"
      )
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="password" className="fw-bold text-start w-100">
          Enter your password
        </label>
        <div className="d-flex position-relative">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className={`form-control  mb-2 ${style.input}`}
            type={togglerType}
            name="password"
            id="password"
          />

          <i className={style.show} onClick={() => toggle()}>
            {toggler}
          </i>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div className="alert alert-danger mt-2 p-2">
            {formik.errors.password}
          </div>
        ) : (
          ""
        )}

        <div className="w-100 text-start ms-3 mt-3">
          <input type="checkbox" id="keepMe" />
          <label htmlFor="keepMe" className=" ms-2 fw-bold text-black">
            Keep me Signed In
          </label>
        </div>

        {!isLoading ? (
          <div className=" border border-0 rounded text-light d-flex align-items-center ">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn btn-primary w-100 rounded-5 text-white mt-2 mx-2"
            >
              {" "}
              Sign In{" "}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary d-flex justify-content-center rounded-5 w-100 text-white  mt-2"
          >
            <MagnifyingGlass
              visible={true}
              height="20"
              width="40"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </button>
        )}
      </form>
      <Toaster />
    </>
  );
}
