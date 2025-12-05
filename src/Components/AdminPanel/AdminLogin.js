import React, { useState } from "react";
import "../../Css/Login.css";
import "../../Css/loading.css";
import EthiGreen from "../../Assests/images/ethi_green.png";
import {
  login_to_superadmin,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import {
  storeData,
  retrieveData,
} from "../../LocalConnection/LocalConnection.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ethiLogo from "../../Assests/images/EthiIconLogin.svg";
import { useNavigate } from "react-router-dom";
import {
  check_vaild_save,
  combiled_form_data,
} from "../../CommonJquery/CommonJquery.js";
import { toast } from "react-toastify";
import $ from "jquery";

function AdminLogin() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Show / hide password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Generic form submit handler
   * - form_data: form id (string)
   * - url_for_save: API URL (login_to_superadmin)
   */
  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    // 1) Validate form fields (using existing jQuery-based util)
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setShowLoader(true);

      // 2) Prepare FormData from form
      let fd_from = combiled_form_data(form_data, null);

      // 3) Call API using existing helper
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);

          if (Response.data.error) {
            // ❌ Invalid email / password / API error
            toast.error(Response.data.message || "Login failed.", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else {
            // ✅ Successful login
            let Response_data = Response.data.message.data_admin;
            let data_doctor_image = Response.data.message.data_doctor_image;

            if (Response_data.allow_access === "1") {
              // Success toast with admin name
              const displayRole = Response_data.role === "super_admin" ? "Super Admin" : "Admin";
              toast.success(`Welcome back, ${Response_data.admin_name}!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
              });

              // 🔐 Store login state in localStorage
              storeData("allow_access", Response_data.allow_access);
              storeData("admin_email", Response_data.admin_email);
              storeData("admin_name", Response_data.admin_name);

              // 🔥 Store role (super_admin or admin)
              const userRole = Response_data.role || Response_data.admin_type || "admin";
              storeData("admin_role", userRole);
              storeData("is_super_admin", Response_data.is_super_admin ? "1" : "0");
              
              // Keep old keys for compatibility
              storeData("admin_profession", Response_data.admin_type);
              storeData("admin_type", userRole);

              // Profile image
              storeData(
                "admin_image",
                APL_LINK + data_doctor_image + Response_data.admin_image
              );
              storeData("admin_image_single", Response_data.admin_image);

              // ID for requester_admin_id
              storeData("admin_id", Response_data._id);

              // Reset doctor keys
              storeData("doctor_id", "000000000000000000000000");
              storeData("doctor_email", null);

              $(".invalid_user").hide();

              // Show role info
              console.log(`✅ Logged in as: ${displayRole} (${userRole})`);

              navigate("/AdminWelcomepage");
            } else {
              // User exists but access disabled
              toast.error(
                "Your account is disabled. Please contact Super Admin.",
                {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                }
              );
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
          console.log("ADMIN_LOGIN_ERROR:", error);
          toast.error(
            "Login failed. Please check your credentials and try again.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            }
          );
        });
    }
  };

  return (
    <div className="login ">
      <div className="login_wrapper row ">
        <div className="col-6 backgroundLeft"></div>
        <div className="col-6 backgroundRight">
          <img src={ethiLogo} alt="ETHI" />
        </div>

        <div className="login_container col-lg-4 col-md-5 col-sm-7 col-11 text-center shadow">
          <form id="form_data_admin" className="login_condition">
            <div className="form_div col-lg-10 col-md-10 col-10 m-auto py-5">
              <div className="logo_div">
                <h3 className="loginHeadingText">Admin Login</h3>
                {/* <img src={EthiGreen} alt="Brand Logo" /> */}
              </div>

              <h6 className="invalid_data text-danger"></h6>

              <div className="input_fields">
                {/* Email */}
                <label>Email Id</label>
                <br />
                <input
                  name="useremail"
                  className="trio_email trio_mendate"
                  type="text"
                  placeholder="Email Id"
                />
                <br />

                {/* Password */}
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

              {/* Loader overlay */}
              <div className={showLoader ? "loading" : ""}></div>

              {/* Login Button */}
              <div className="login_btn_div text-center">
                <button
                  className="btn login_btn shadow"
                  type="button"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data_admin",
                      login_to_superadmin
                    )
                  }
                >
                  Log in
                </button>
              </div>

              {/* Register Link */}
              <div
                className="register_link_section"
                style={{ marginTop: "20px", textAlign: "center" }}
              >
                <p style={{ fontSize: "14px", color: "#666" }}>
                  New admin?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/admin-register")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0da568",
                      fontWeight: "600",
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: "0",
                      fontSize: "inherit",
                    }}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
