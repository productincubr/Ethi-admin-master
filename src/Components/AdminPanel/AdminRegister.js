/**
 * AdminRegister Component
 *
 * PURPOSE: Quick and professional admin self-registration
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/AdminRegister.css";
import axios from "axios";
import { APL_LINK } from "../../ServiceConnection/serviceconnection";
import EthiLogo from "../../Assests/images/ethi_green.png";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    admin_name: "",
    admin_email: "",
    admin_mobile: "",
    admin_password: "",
    confirm_password: "",
    admin_city: "",
    admin_state: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ---------- INPUT CHANGE HANDLER ----------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔹 Mobile: allow only digits, max 10
    if (name === "admin_mobile") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length > 10) return;
      setFormData((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ---------- VALIDATIONS ----------
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Include at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Include at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Include at least one number";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.admin_name.trim() || formData.admin_name.trim().length < 3) {
      newErrors.admin_name = "Name must be at least 3 characters";
    }

    if (!formData.admin_email.trim()) {
      newErrors.admin_email = "Email is required";
    } else if (!validateEmail(formData.admin_email)) {
      newErrors.admin_email = "Invalid email format";
    }

    if (!formData.admin_mobile.trim()) {
      newErrors.admin_mobile = "Mobile number is required";
    } else if (!validatePhone(formData.admin_mobile)) {
      newErrors.admin_mobile = "Invalid mobile number (10 digits, starting 6-9)";
    }

    if (!formData.admin_city.trim()) {
      newErrors.admin_city = "City is required";
    }

    if (!formData.admin_state.trim()) {
      newErrors.admin_state = "State is required";
    }

    if (!formData.admin_password) {
      newErrors.admin_password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.admin_password);
      if (passwordError) {
        newErrors.admin_password = passwordError;
      }
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm password";
    } else if (formData.admin_password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const apiFormData = new FormData();
      apiFormData.append("admin_name", formData.admin_name.trim());
      apiFormData.append("admin_email", formData.admin_email.trim().toLowerCase());
      apiFormData.append("admin_mobile", formData.admin_mobile.trim());
      apiFormData.append("admin_password", formData.admin_password);
      apiFormData.append("admin_city", formData.admin_city.trim());
      apiFormData.append("admin_state", formData.admin_state.trim());

      const response = await axios.post(
        `${APL_LINK}/api/admin_link/register_admin`,
        apiFormData
      );

      setLoading(false);

      if (response.data.error) {
        alert(response.data.message || "Registration failed. Please try again.");
      } else {
        alert("✅ Admin registered successfully!\n\nYou can now login.");
        setTimeout(() => {
          navigate("/admin-login");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-register-container">
      <div className="admin-register-box">
        {/* Header */}
        <div className="register-header">
          <img src={EthiLogo} alt="ETHI" className="register-logo" />
          <h2 className="register-title">Create Admin Account</h2>
          <p className="register-subtitle">
            Join ETHI platform as an administrator
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="admin_name"
              value={formData.admin_name}
              onChange={handleChange}
              className={`form-input ${errors.admin_name ? "input-error" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.admin_name && (
              <span className="error-text">{errors.admin_name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="admin_email"
              value={formData.admin_email}
              onChange={handleChange}
              className={`form-input ${errors.admin_email ? "input-error" : ""}`}
              placeholder="admin@company.com"
            />
            {errors.admin_email && (
              <span className="error-text">{errors.admin_email}</span>
            )}
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label className="form-label">Mobile Number *</label>
            <input
              type="tel"
              name="admin_mobile"
              value={formData.admin_mobile}
              onChange={handleChange}
              className={`form-input ${errors.admin_mobile ? "input-error" : ""}`}
              placeholder="10-digit mobile number"
              maxLength="10"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {errors.admin_mobile && (
              <span className="error-text">{errors.admin_mobile}</span>
            )}
          </div>

          {/* City & State */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                name="admin_city"
                value={formData.admin_city}
                onChange={handleChange}
                className={`form-input ${errors.admin_city ? "input-error" : ""}`}
                placeholder="Your city"
              />
              {errors.admin_city && (
                <span className="error-text">{errors.admin_city}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">State *</label>
              <input
                type="text"
                name="admin_state"
                value={formData.admin_state}
                onChange={handleChange}
                className={`form-input ${errors.admin_state ? "input-error" : ""}`}
                placeholder="Your state"
              />
              {errors.admin_state && (
                <span className="error-text">{errors.admin_state}</span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password *</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="admin_password"
                value={formData.admin_password}
                onChange={handleChange}
                className={`form-input ${errors.admin_password ? "input-error" : ""}`}
                placeholder="Create strong password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* eye icon same as before */}
                {showPassword ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path></svg> : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs><clipPath><path fill="none" d="M124-288l388-672 388 672H124z" clipRule="evenodd"></path></clipPath></defs><path d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32zM332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512z"></path><path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5z"></path></svg>}
              </button>
            </div>
            {errors.admin_password && (
              <span className="error-text">{errors.admin_password}</span>
            )}
            <small className="password-hint">
              Min 6 chars with uppercase, lowercase & number
            </small>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className={`form-input ${
                  errors.confirm_password ? "input-error" : ""
                }`}
                placeholder="Re-enter password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path></svg> : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs><clipPath><path fill="none" d="M124-288l388-672 388 672H124z" clipRule="evenodd"></path></clipPath></defs><path d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32zM332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512z"></path><path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5z"></path></svg>}
              </button>
            </div>
            {errors.confirm_password && (
              <span className="error-text">{errors.confirm_password}</span>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Create Admin Account"
            )}
          </button>

          {/* Login link */}
          <div className="login-link-box">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => navigate("/admin-login")}
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
