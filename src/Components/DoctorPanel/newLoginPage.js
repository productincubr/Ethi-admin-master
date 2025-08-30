import React, { useState, useEffect } from "react";
import "../../Css/Login.css";
import "../../Css/loading.css";
import googleIcon from "../../Assests/images/google-color-svgrepo-com.svg";
import EthiGreen from "../../Assests/images/ethi_green.png";
import { PhoneInput } from "react-international-phone";
import ethiLogo from "../../Assests/images/EthiIconLogin.svg";
import "react-international-phone/style.css";
import {
  login_to_doctor,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import {
  storeData,
  retrieveData,
} from "../../LocalConnection/LocalConnection.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  check_vaild_save,
  combiled_form_data,
} from "../../CommonJquery/CommonJquery.js";
import $ from "jquery";
function DoctorLoginNew() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userNumber, setUserNumber] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            let Response_data = Response.data.message.data_doctor;
            let data_doctor_image = Response.data.message.data_doctor_image;
            if (Response_data.allow_access === "1") {
              storeData("allow_access", Response_data.allow_access);
              storeData("doctor_email", Response_data.user_email);
              storeData("doctor_name", Response_data.doctor_name);
              storeData("doctor_profession", Response_data.doctor_profession);
              storeData(
                "doctor_image",
                APL_LINK + data_doctor_image + Response_data.doctor_image
              );
              storeData("doctor_image_single", Response_data.doctor_image);
              storeData("doctor_id", Response_data._id);
              storeData("admin_id", "000000000000000000000000");
              storeData("admin_email", null);
              navigate("/doctorwelcomepage");
              $(".invalid_user").hide();
            } else {
              alert("User is Invalid. Please try again.");
              $(".invalid_user").Class(".invalid_user_show");
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
          $(".invalid_user").show();
        });
    }
  };

  useEffect(() => {
    const retrieveDatafind = retrieveData("doctor_email");

    if (retrieveDatafind === "null" || retrieveDatafind === null) {
      navigate("/login");
    } else {
      navigate("/doctorwelcomepage");
    }
  }, [navigate]);

  return (
    // <div className="login">
    //   <div className="login_wrapper">
    //     <div className="login_container col-xl-3 col-lg-4 col-md-5 col-sm-7 col-11 text-center shadow">
    //       <form id="form_data_admin" className="login_condition">
    //         <div className="form_div col-lg-10 col-md-10 col-10 m-auto py-5">
    //           <div className="logo_div">
    //           <h3 className="loginHeadingText">Login</h3>
    //           </div>
    //           <h6 className="invalid_data text-danger"></h6>
    //           <div className="input_fields">
    //             <label>Doctor Email Id</label>
    //             <br />
    //             <input
    //               name="useremail"
    //               className="trio_email trio_mendate"
    //               type="text"
    //               placeholder="Email Id"
    //             ></input>
    //             <br />
    //             <label>Password</label>
    //             <br />
    //             <div className="login_password">
    //               <input
    //                 type={showPassword ? "text" : "password"}
    //                 name="userpassword"
    //                 className="trio_mendate trio_password"
    //                 placeholder="Password"
    //               />
    //               <button
    //                 className="eye_btn_"
    //                 type="button"
    //                 onClick={handleTogglePassword}
    //               >
    //                 {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
    //               </button>
    //             </div>
    //           </div>
    //           <div className={showLoader ? "loading" : ""}></div>
    //           <div className="login_btn_div text-center">
    //             <button
    //               className="btn login_btn shadow"
    //               type="button"
    //               onClick={() =>
    //                 handleSaveChangesdynamic("form_data_admin", login_to_doctor)
    //               }
    //             >
    //               Log in
    //             </button>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="login ">
      <div className="login_wrapper row ">
        <div className="col-6 backgroundLeft"></div>
        <div className="col-6 backgroundRight">
          <img src={ethiLogo} />
        </div>
        <div className="login_container col-lg-4 col-sm-6 col-10  text-center shadow ">
          <form id="form_data_admin" className="login_condition">
            <div className="form_div col-lg-10 col-md-10 col-10 m-auto py-5">
              <div className="logo_div">
                <h3 className="loginHeadingText">Doctor Login</h3>
              </div>
              <h6 className="invalid_data text-danger"></h6>

              <div className="input_fields">
                <label>Email Id</label>
                <br />

                <input
                  name="useremail"
                  className="trio_email trio_mendate"
                  type="text"
                  placeholder="Email Id"
                ></input>
                <br />
                <label>Password</label>
                <br />
                <div className="login_password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="userpassword"
                    className="trio_mendate trio_password"
                    placeholder="Password"
                  />
                  <button
                    className="eye_btn_"
                    type="button"
                    onClick={handleTogglePassword}
                  >
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
                    handleSaveChangesdynamic("form_data_admin", login_to_doctor)
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

export default DoctorLoginNew;
