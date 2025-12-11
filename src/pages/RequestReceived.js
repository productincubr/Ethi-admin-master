// src/pages/RequestReceived.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../Css/RequestReceived.css";
import ethiLogo from "../Assests/images/ethi_green.png"; // adjust path if needed

export default function RequestReceived() {
  // location.state?.email will be passed when navigating after successful request
  const location = useLocation();
  const email = location.state?.email || "youremail@example.com";

  return (
    <div className="rr-page">
      <div className="rr-card">
        <div className="rr-logo-wrap">
          <img src={ethiLogo} alt="ETHI" className="rr-logo" />
        </div>

        <h1 className="rr-title">Thank you — request received</h1>

        <p className="rr-sub">
          We've received your details. We typically review requests within{" "}
          <strong>24–48 hours</strong>.
        </p>

        <div className="rr-email">{email}</div>

        <p className="rr-note">
          A confirmation email has been sent. If you don't see it, please check
          your spam or promotions.
        </p>

        <p className="rr-help">
          For urgent help:{" "}
          <a href="mailto:support@ethi.com" className="rr-help-link">
            support@ethi.com
          </a>
        </p>

        <div className="rr-actions">
          <Link to="/" className="rr-btn-secondary">
            Return to Home
          </Link>

          <Link to="/login" className="rr-btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
