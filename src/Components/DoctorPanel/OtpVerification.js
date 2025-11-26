// src/Components/DoctorPanel/OtpVerification.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { server_post_data } from "../../ServiceConnection/serviceconnection.js";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { phone, sessionId, hint } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    if (!otp) return setError("Enter OTP");
    setVerifying(true);
    try {
      const payload = { phone, sessionId, otp };
      const res = await server_post_data("/auth/verify-otp", payload);
      if (res?.data?.success) {
        // backend should return user object + token
        const token = res.data.token;
        // store token locally (localStorage or cookie). Example:
        localStorage.setItem("token", token);
        // navigate to main app
        navigate("/doctorwelcomepage");
      } else {
        setError(res?.data?.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Enter OTP received on {hint || phone}</h2>
      <form onSubmit={verifyOtp}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          style={{ width: 240, fontSize: 18, padding: 8 }}
        />
        <div style={{ marginTop: 16 }}>
          <button className="btn" type="submit" disabled={verifying}>
            {verifying ? "Verifying..." : "Continue"}
          </button>
          <button className="btn btn-link" type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </form>
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
    </div>
  );
}
