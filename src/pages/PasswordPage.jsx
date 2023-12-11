import Password from "../components/Password/Password";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-06 - Copy.svg'

const PasswordPage = () => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <div className="py-5 d-flex flex-column">
          <div className="d-flex flex-column align-items-center ">
            <div>
              <img
                style={{ maxWidth: "200px" }}
                src={logo}
                alt=""
              />
            </div>

            <h4 className="mt-3">Welcome back!</h4>
            <div className="">
              <p className="text-start" style={{ fontSize: 16 }}>
                Email address:
              </p>
              <p style={{ fontSize: 16 }}>
                {localStorage.getItem("retailerEmail")}
                <span className="ms-4">
                  <button
                    className={`border-0 text-decoration-underline bg-light`}
                    style={{ fontSize: 14 }}
                    onClick={() => navigate("/login")}
                  >
                    Change
                  </button>
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5  d-flex justify-content-center align-items-center w-100">
            <div className="w-100 d-flex flex-column " style={{maxWidth:'300px'}}>
              <Password />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PasswordPage;
