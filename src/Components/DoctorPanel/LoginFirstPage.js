import React, { useState } from "react";
import "../../Css/LoginFirstPage.css";
import ethiLogo from "../../Assests/images/EthiIconLogin.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate } from "react-router-dom";
import newLoginPage from '../../Assests/images/newLoginPage.png';

function LoginFirstPage() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("mobile");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleContinue = () => {
    if (loginType === "mobile") {
      if (mobile.length < 10) {
        alert("Enter valid phone number");
        return;
      }
      // Later you will add: request OTP → verify → dashboard
      navigate("/otpverify"); 
    } else {
      if (!email.includes("@")) {
        alert("Enter valid email");
        return;
      }
      navigate("/emailLogin");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-left">
        <img src={newLoginPage} className="login-logo" alt="Ethi" />
      </div>

      <div className="login-right">

        <div className="login-box">

          <h2 className="login-heading">Login</h2>

          <div className="login-type-buttons">
            <button
              className={loginType === "mobile" ? "login-type-active" : ""}
              onClick={() => setLoginType("mobile")}
            >
              Mobile Number
            </button>

            <button
              className={loginType === "email" ? "login-type-active" : ""}
              onClick={() => setLoginType("email")}
            >
              Email
            </button>
          </div>

          {loginType === "mobile" ? (
            <div className="input-section">
              <label>Mobile Number</label>
              <PhoneInput
                defaultCountry="in"
                value={mobile}
                onChange={(value) => setMobile(value)}
                className="phone-field"
              />
            </div>
          ) : (
            <div className="input-section">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>

          {/* Sign Up Link */}
          <div className="signup-section">
            <p className="signup-text">
              Don't have an account?{" "}
              <span onClick={() => navigate("/sign-up")} className="signup-link">
                Sign Up
              </span>
            </p>
          </div>

          <p className="bottom-info">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginFirstPage;
