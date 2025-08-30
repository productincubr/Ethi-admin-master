import React, { useState, useEffect } from "react";
import "../Css/Login.css";
import "../Css/loading.css";
import EthiGreen from "../Assests/images/ethi_green.png";
import { login_to_superadmin,server_post_data } from "../ServiceConnection/serviceconnection.js";
import {
  storeData,
  retrieveData,
  removeData,
} from "../LocalConnection/LocalConnection.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { check_vaild_save,combiled_form_data } from "../CommonJquery/CommonJquery.js";
function Login() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data,null);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.message) {
            alert(Response.data.message);
          } else {
            if (Response.data[0].allow_access === "1") {
              storeData("allow_access", Response.data[0].allow_access);
              storeData("user_email", Response.data[0].user_email);
              storeData("user_name", Response.data[0].user_name);
              storeData("_id", Response.data[0]._id);
              navigate("/Welcomepage");
            } else {
              alert("User is Invalid. Please try again.");
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const retrieveDatafind = retrieveData("user_email");
    removeData();
    if (retrieveDatafind === null) {
      //      navigate('/login');
    } else {
      //    navigate('/Welcomepage');
    }
  }, [navigate]);

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_container col-xl-3 col-lg-4 col-md-5 col-sm-7 col-11 text-center shadow">
          <form id="form_data_admin">
            <div className="form_div col-lg-10 col-md-10 col-10 m-auto py-5">
              <div className="logo_div">
                <img src={EthiGreen} alt="Brand Logo" />
              </div>
              {/* <h4>Your health concerns.</h4> */}
              <div className="input_fields">
                <label>Super Admin Email</label>
                <br />
                <input
                  name="useremail"
                  className="trio_email trio_mendate"
                  type="text"
                  placeholder="Email"
                ></input>
                <br />
                <label>Super Admin Password</label>
                <br />
                <div className="login_password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="userpassword"
                    className="trio_mendate trio_password"
                    placeholder="Password"
                  />
                  <button onClick={handleTogglePassword}>
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
              </div>
              <div className={showLoader ? "loading" : ""}></div>
              <div className="login_btn_div text-center">
                <button
                  className="btn login_btn shadow"
                  type="button"
                  onClick={() =>
                    handleSaveChangesdynamic("form_data_admin", login_to_superadmin)
                  }
                >
                  Log in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
