/**
 * EmailPasswordPage Component
 * 
 * PURPOSE: Email aur password se login karne ke liye
 * HANDLES: Admin, Doctor dono types ke users
 * 
 * FLOW:
 * 1. User email enter karta hai (EthiLoginPage se)
 * 2. Password enter karta hai
 * 3. Backend se verify hota hai (Admin ya Doctor)
 * 4. User type ke according redirect hota hai
 */

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/OtpPage.css";
import axios from "axios";
import { APL_LINK } from "../ServiceConnection/serviceconnection";
import { storeData } from "../LocalConnection/LocalConnection";

function EmailPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // EthiLoginPage se jo email bheja hai, woh state se aa raha hai
  const emailFromLogin = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      alert("Please enter your password");
      return;
    }

    try {
      setLoading(true);
      console.log("🔐 Login attempt for email:", emailFromLogin);

      // FormData banana for backend
      const formData = new FormData();
      formData.append("useremail", emailFromLogin);
      formData.append("userpassword", trimmedPassword);

      // STEP 1: Pehle Admin login try karo
      let response;
      let isAdmin = false;
      let isDoctor = false;

      try {
        console.log("🔍 Checking if user is Admin...");
        response = await axios.post(
          `${APL_LINK}/api/admin_link/login_to_superadmin`,
          formData
        );
        
        if (!response.data.error) {
          isAdmin = true;
          console.log("✅ User is Admin");
        }
      } catch (err) {
        console.log("❌ Not an admin, trying doctor login...");
      }

      // STEP 2: Agar Admin nahi hai, to Doctor try karo
      if (!isAdmin) {
        try {
          console.log("🔍 Checking if user is Doctor...");
          response = await axios.post(
            `${APL_LINK}/api/doctor_link/login_to_doctor`,
            formData
          );
          
          if (!response.data.error) {
            isDoctor = true;
            console.log("✅ User is Doctor");
          }
        } catch (err) {
          console.log("❌ Not a doctor either");
          setLoading(false);
          alert("Invalid email or password");
          return;
        }
      }

      setLoading(false);

      // STEP 3: User type ke according data save karo aur redirect karo
      if (isAdmin) {
        // ✅ ADMIN LOGIN SUCCESS
        console.log("🔍 Full Admin Response:", response.data);
        
        // Check if response structure is valid
        if (!response.data || !response.data.message) {
          console.error("❌ Invalid response structure:", response);
          alert("Invalid response from server. Please try again.");
          return;
        }
        
        // 🔍 DEBUG: Check exact structure
        console.log("🔍 Message object:", response.data.message);
        console.log("🔍 Message keys:", Object.keys(response.data.message));
        
        const adminData = response.data.message.data_admin;
        const adminImage = response.data.message.data_doctor_image;
        
        console.log("💾 Admin Data Extracted:", adminData);
        
        // Check if adminData exists
        if (!adminData) {
          console.error("❌ Admin data not found in response");
          alert("Login failed. Please check your credentials.");
          return;
        }
        
        console.log("💾 Saving admin data to localStorage...");
        
        // Admin ka data localStorage mein save karo
        // allow_access check karo - agar "1" nahi hai to login reject karo
        if (adminData.allow_access !== "1") {
          alert("Your account is not authorized. Please contact admin.");
          return;
        }
        
        storeData("allow_access", "1");
        storeData("admin_email", adminData.admin_email || "");
        storeData("admin_name", adminData.admin_name || "Admin");
        storeData("admin_profession", adminData.admin_type || "Administrator");
        storeData("admin_image", adminImage ? APL_LINK + adminImage + adminData.admin_image : "");
        storeData("admin_image_single", adminData.admin_image || "");
        storeData("admin_id", adminData._id || "");
        
        // Doctor fields ko null set karo (to ensure no confusion)
        storeData("doctor_id", "000000000000000000000000");
        storeData("doctor_email", null);
        
        console.log("🎉 Admin login successful! Redirecting to admin dashboard...");
        alert("Welcome Admin!");
        navigate("/AdminWelcomepage");
        
      } else if (isDoctor) {
        // ✅ DOCTOR LOGIN SUCCESS
        console.log("🔍 Full Doctor Response:", response.data);
        
        // Check if response structure is valid
        if (!response.data || !response.data.message) {
          console.error("❌ Invalid response structure:", response);
          alert("Invalid response from server. Please try again.");
          return;
        }
        
        const doctorData = response.data.message.data_doctor;
        const doctorImage = response.data.message.data_doctor_image;
        
        console.log("💾 Doctor Data Extracted:", doctorData);
        
        // Check if doctorData exists
        if (!doctorData) {
          console.error("❌ Doctor data not found in response");
          alert("Login failed. Please check your credentials.");
          return;
        }
        
        console.log("💾 Saving doctor data to localStorage...");
        
        // Doctor ka data localStorage mein save karo
        storeData("allow_access", doctorData.allow_access || "1");
        storeData("doctor_email", doctorData.user_email || "");
        storeData("doctor_name", doctorData.doctor_name || "Doctor");
        storeData("doctor_profession", doctorData.doctor_profession || "Physician");
        storeData("doctor_image", doctorImage ? APL_LINK + doctorImage + doctorData.doctor_image : "");
        storeData("doctor_image_single", doctorData.doctor_image || "");
        storeData("doctor_id", doctorData._id || "");
        
        // Admin fields ko null set karo
        storeData("admin_id", "000000000000000000000000");
        storeData("admin_email", null);
        
        console.log("🎉 Doctor login successful! Redirecting to doctor dashboard...");
        alert("Welcome Doctor!");
        navigate("/doctorwelcomepage");
      }

    } catch (err) {
      console.error("❌ EMAIL_PASSWORD_LOGIN_ERROR:", err);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-box">
        {/* Heading exactly like Figma */}
        <h2 className="otp-title">Login</h2>

        {/* Label exactly like Figma */}
        <p className="otp-subtitle">Enter Gmail password</p>

        {/* Single password input */}
        <input
          type="password"
          className="otp-password-input"
          placeholder="Enter your gmail password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Buttons row same as OTP screen */}
        <div className="otp-btn-row">
          <button
            className="otp-back-btn"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button
            className="otp-verify-btn"
            type="button"
            onClick={handleContinue}
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailPasswordPage;

// Browser Console mein paste karo:

// Test 1: Backend connectivity
fetch('http://localhost:8080/api/admin_link/login_to_superadmin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    useremail: 'admin@ethi.com', 
    userpassword: 'admin123' 
  })
})
.then(res => res.json())
.then(data => console.log("Backend Response:", data));
