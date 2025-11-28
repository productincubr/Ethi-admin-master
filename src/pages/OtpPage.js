/**
 * OtpPage Component
 * 
 * PURPOSE: OTP verification page for mobile-based authentication
 * HANDLES: Customer, Doctor, and Admin users with mobile login
 * 
 * AUTHENTICATION FLOW:
 * 1. User receives 6-digit OTP via SMS
 * 2. User enters OTP in input boxes
 * 3. Backend verifies OTP and returns user data
 * 4. User type is detected from response fields (admin_type, doctor_profession, etc.)
 * 5. Redirects to appropriate dashboard based on user role
 */

import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/OtpPage.css";
import axios from "axios";
import { APL_LINK } from "../ServiceConnection/serviceconnection";
import { storeData } from "../LocalConnection/LocalConnection";

function OtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = location.state?.mobile || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Focus first input box when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "");
    if (!digit) return;

    const newOtp = [...otp];
    newOtp[index] = digit.slice(-1);
    setOtp(newOtp);

    // Move focus to next input box
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }

      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
        const newOtp2 = [...otp];
        newOtp2[index - 1] = "";
        setOtp(newOtp2);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const digits = pasted.slice(0, 6).split("");
    const newOtp = [...otp];

    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || "";
    }
    setOtp(newOtp);

    const lastIndex = digits.length - 1;
    if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    const cleanMobile = (mobile || "").replace(/\D/g, "");

    if (!cleanMobile) {
      alert("Mobile number missing. Please go back and enter again.");
      return;
    }

    try {
      console.log("🔐 Verifying OTP for mobile:", cleanMobile);
      
      const formData = new FormData();
      formData.append("mobile", cleanMobile);
      formData.append("otp", code);

      const res = await axios.post(
        `${APL_LINK}/api/web_link/verify_otp`,
        formData
      );

      if (res.data.error) {
        alert(res.data.message || "Invalid OTP");
        return;
      }

      console.log("✅ OTP verified successfully!");
      
      // STEP 1: Extract user data from backend response
      const userData = res.data.user_data || res.data.message;
      
      if (!userData) {
        alert("User data not found. Please try again.");
        return;
      }

      console.log("📋 User data received:", userData);

      // STEP 2: Detect user type from response fields and save appropriate data
      
      // Check 1: Is user an Admin?
      if (userData.admin_type || userData.admin_email) {
        console.log("👨‍💼 User is ADMIN");
        
        storeData("allow_access", "1");
        storeData("admin_email", userData.admin_email || userData.email);
        storeData("admin_name", userData.admin_name || userData.name);
        storeData("admin_profession", userData.admin_type || "admin");
        storeData("admin_id", userData._id);
        
        if (userData.admin_image) {
          storeData("admin_image", APL_LINK + "/ethi_admin_master_image/" + userData.admin_image);
          storeData("admin_image_single", userData.admin_image);
        }
        
        // Clear doctor fields to prevent role confusion
        storeData("doctor_id", "000000000000000000000000");
        storeData("doctor_email", null);
        
        console.log("🎉 Admin login successful! Redirecting...");
        alert("Welcome Admin!");
        navigate("/AdminWelcomepage");
        return;
      }
      
      // Check 2: Is user a Doctor?
      if (userData.doctor_profession || userData.user_email) {
        console.log("👨‍⚕️ User is DOCTOR");
        
        storeData("allow_access", "1");
        storeData("doctor_email", userData.user_email || userData.email);
        storeData("doctor_name", userData.doctor_name || userData.name);
        storeData("doctor_profession", userData.doctor_profession || "nutritionist");
        storeData("doctor_id", userData._id);
        
        if (userData.doctor_image) {
          storeData("doctor_image", APL_LINK + "/ethi_doctor_image/" + userData.doctor_image);
          storeData("doctor_image_single", userData.doctor_image);
        }
        
        // Clear admin fields to prevent role confusion
        storeData("admin_id", "000000000000000000000000");
        storeData("admin_email", null);
        
        console.log("🎉 Doctor login successful! Redirecting...");
        alert("Welcome Doctor!");
        navigate("/doctorwelcomepage");
        return;
      }
      
      // Check 3: User is a Customer (default case)
      console.log("👤 User is CUSTOMER");
      
      storeData("allow_access", "1");
      storeData("customer_id", userData._id);
      storeData("customer_name", userData.customer_name || userData.name);
      storeData("customer_mobile", cleanMobile);
      storeData("customer_email", userData.customer_email || userData.email);
      
      if (userData.customer_image) {
        storeData("customer_image", APL_LINK + "/ethi_user_image/" + userData.customer_image);
      }
      
      // Clear both admin and doctor fields to prevent role confusion
      storeData("admin_id", "000000000000000000000000");
      storeData("admin_email", null);
      storeData("doctor_id", "000000000000000000000000");
      storeData("doctor_email", null);
      
      console.log("🎉 Customer login successful! Redirecting...");
      alert("Welcome Customer!");
      navigate("/customer-dashboard");
      
    } catch (err) {
      console.error(
        "❌ VERIFY_OTP_ERROR:",
        err?.response?.data || err.message || err
      );
      alert("Something went wrong while verifying OTP");
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-box">
        <h2 className="otp-title">Enter OTP</h2>
        <p className="otp-subtitle">
          We’ve sent a 6 digit code to{" "}
          <span className="otp-mobile-text">
            {mobile || "your phone number"}
          </span>
        </p>

        <div className="otp-input-row">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => (inputRefs.current[index] = el)}
              className="otp-input-box"
            />
          ))}
        </div>

        <button className="otp-verify-btn" onClick={handleVerify}>
          Verify & Continue
        </button>

        <button className="otp-back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}

export default OtpPage;
