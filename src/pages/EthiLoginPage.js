import React, { useState } from "react";
// import '../../Css/EthiLoginPage.css';
import "../Css/EthiLoginPage.css";
// import ethiLogo from "../../Assests/images/ethi_green.png";
import googleIcon from "../Assests/images/google-color-svgrepo-com.svg";
// import EthiIconLogin from "../Assests/images/EthiIconLogin.svg";
import newLoginPage from "../Assests/images/newLoginPage.png";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APL_LINK } from "../ServiceConnection/serviceconnection";

function EthiLoginPage() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // CONTINUE button click
    const handleContinue = async () => {
        const rawPhone = (phone || "").trim();
        const rawEmail = (email || "").trim();
      
        // Sirf digits nikalo (country code, space, + sab hatao)
        const digitsOnly = rawPhone.replace(/\D/g, "");
        const hasValidPhone = digitsOnly.length >= 10;
      
        const isEmailEntered = rawEmail.length > 0;
      
        // Basic email validation (you can make it stricter if needed)
        const isValidEmail = (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          // Agar sirf gmail allow karna ho to:
          // return /^[^\s@]+@gmail\.com$/i.test(value);
        };
      
        // Case 1: Na phone thik, na email dala
        if (!hasValidPhone && !isEmailEntered) {
          alert("Please enter a valid phone number or email");
          return;
        }
      
        // Case 2: Phone valid hai → OTP flow (phone ko priority)
        if (hasValidPhone) {
          try {
            setLoading(true);
      
            const formData = new FormData();
            formData.append("mobile", digitsOnly);
      
            const res = await axios.post(
              `${APL_LINK}/api/web_link/request_otp`,
              formData
            );
      
            setLoading(false);
      
            if (res.data.error) {
              alert(res.data.message || "Failed to send OTP");
              return;
            }
      
            navigate("/otp", { state: { mobile: `+${digitsOnly}` } });
          } catch (err) {
            console.error("OTP ERROR:", err?.response?.data || err.message || err);
            setLoading(false);
            alert("Something went wrong while sending OTP");
          }
      
          return;
        }
      
        // Case 3: Phone valid nahi hai, lekin email type kiya hai
        if (isEmailEntered) {
          if (!isValidEmail(rawEmail)) {
            alert("Please enter a valid email address");
            return;
          }
      
          // Ab hi email-password page par jaane do
          navigate("/email-password", { state: { email: rawEmail } });
          return;
        }
      };
      
      



    return (
        <div className="ethi-login-page">
            {/* LEFT PANEL */}
            <div className="ethi-login-left">
                <img src={newLoginPage} className="login-logo" alt="Ethi" />
            </div>

            {/* RIGHT PANEL */}
            <div className="ethi-login-right">
                <div className="ethi-right-box">
                    <h2 className="ethi-login-heading">Login</h2>

                    {/* PHONE LOGIN */}
                    <label className="ethi-label">Phone number</label>
                    <PhoneInput
                        defaultCountry="in"
                        value={phone}
                        onChange={(value) => setPhone(value)}
                        className="ethi-phone-input"
                        placeholder="Enter patient contact number"
                    />

                    <div className="ethi-or-row">
                        <span className="ethi-or-line" />
                        <span className="ethi-or-text">OR</span>
                        <span className="ethi-or-line" />
                    </div>

                    {/* GOOGLE EMAIL */}
                    <div className="ethi-google-row">
                        <img src={googleIcon} alt="google" className="ethi-google-icon" />
                        <span className="ethi-google-label">Log in with Google</span>
                    </div>

                    <input
                        type="text"
                        className="ethi-input"
                        placeholder="Enter your gmail ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* CONTINUE BUTTON */}
                    <div className="ethi-btn-row">

                        <button
                            type="button"
                            className="ethi-btn-continue"
                            onClick={handleContinue}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EthiLoginPage;
