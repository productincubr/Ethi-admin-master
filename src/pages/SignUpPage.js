import React from 'react'
import EthiLogo from '../Assests/images/ethi_green.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { APL_LINK } from '../ServiceConnection/serviceconnection';
import { toast } from 'react-toastify';
import '../Css/AdminSignup.css';

const SignUpPage = () => {

    const navigate = useNavigate();
    
      const [formData, setFormData] = useState({
        admin_name: "",
        admin_email: "",
        admin_mobile: "",
        admin_password: "",
        confirm_password: "",
      });
    
      const [logo, setLogo] = useState(null);
      const [logoPreview, setLogoPreview] = useState(null);
      const [errors, setErrors] = useState({});
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      // ---------- LOGO UPLOAD HANDLER ----------
      const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          // Validate file type
          const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
          if (!validTypes.includes(file.type)) {
            toast.error('Please upload a valid image file (JPG, PNG, or SVG)');
            return;
          }
          
          // Validate file size (max 2MB)
          if (file.size > 2 * 1024 * 1024) {
            toast.error('File size should be less than 2MB');
            return;
          }

          setLogo(file);
          
          // Create preview URL
          const reader = new FileReader();
          reader.onloadend = () => {
            setLogoPreview(reader.result);
          };
          reader.readAsDataURL(file);
          
          // Clear error if any
          if (errors.logo) {
            setErrors((prev) => ({
              ...prev,
              logo: "",
            }));
          }
        }
      };
    
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

        // ---------- FORM SUBMIT HANDLER ----------    
        const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
          return;
        }
        try {
          setLoading(true);
          
          // Send complete user data to request_email_access endpoint
          const response = await axios.post(`${APL_LINK}/api/auth/request_email_access`, {
            email: formData.admin_email,
            role: "admin",
            admin_name: formData.admin_name,
            admin_mobile: formData.admin_mobile,
            admin_password: formData.admin_password
          });
          setLoading(false);
          
          if (response.data.error) {
            toast.error(response.data.message || "Registration failed");
          } else {
            toast.success("Registration request submitted! Our team will review and approve within 24-48 hours. Please check your email.", {
              autoClose: 4000
            });
            // Navigate to thank you page with email
            navigate("/request-received", { state: { email: formData.admin_email } });
          }
        } catch (error) {
          setLoading(false);
          console.error("Registration error:", error);
          toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
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
    
        if (!logo) {
          newErrors.logo = "Please upload your organization logo";
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


    return (
        <div className="admin-register-container">
            <div className="admin-register-box">
                <div className="register-header">
                    <img src={EthiLogo} alt="ETHI" className="register-logo" />
                    <h2 className="register-title">Sign up as an Organization</h2>
                    <p className="register-subtitle">
                        Submit your details. Our team will review and approve within 24-48 hours.
                    </p>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="register-form">
                    {/* Organization Name */}
                    <div className="form-group">
                        <label className="form-label">Organization Name *</label>
                        <input
                            type="text"
                            name="admin_name"
                            value={formData.admin_name}
                            onChange={handleChange}
                            className={`form-input ${errors.admin_name ? "input-error" : ""}`}
                            placeholder="Enter your organization name"
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
                            placeholder="your@email.com"
                        />
                        {errors.admin_email && (
                            <span className="error-text">{errors.admin_email}</span>
                        )}
                    </div>

                    {/* Mobile Number */}
                    <div className="form-group">
                        <label className="form-label">Mobile Number *</label>
                        <input
                            type="tel"
                            name="admin_mobile"
                            value={formData.admin_mobile}
                            onChange={handleChange}
                            className={`form-input ${errors.admin_mobile ? "input-error" : ""}`}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                        />
                        {errors.admin_mobile && (
                            <span className="error-text">{errors.admin_mobile}</span>
                        )}
                    </div>

                    {/* Logo Upload */}
                    <div className="form-group">
                        <label className="form-label">Organization Logo *</label>
                        <div className="logo-upload-wrapper">
                            <input
                                type="file"
                                id="logo-upload"
                                accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                                onChange={handleLogoChange}
                                className="logo-input-hidden"
                            />
                            <label htmlFor="logo-upload" className="logo-upload-btn">
                                {logoPreview ? (
                                    <div className="logo-preview-container">
                                        <img src={logoPreview} alt="Logo Preview" className="logo-preview" />
                                        <span className="change-logo-text">Click to change</span>
                                    </div>
                                ) : (
                                    <div className="upload-placeholder">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        <span className="upload-text">Click to upload logo</span>
                                        <span className="upload-hint">(JPG, PNG, SVG - Max 2MB)</span>
                                    </div>
                                )}
                            </label>
                        </div>
                        {errors.logo && (
                            <span className="error-text">{errors.logo}</span>
                        )}
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
                                placeholder="Create a strong password"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.admin_password && (
                            <span className="error-text">{errors.admin_password}</span>
                        )}
                        <p className="password-hint">
                            Must be 6+ characters with uppercase, lowercase, and number
                        </p>
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
                                className={`form-input ${errors.confirm_password ? "input-error" : ""}`}
                                placeholder="Re-enter your password"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.confirm_password && (
                            <span className="error-text">{errors.confirm_password}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Request Access"}
                    </button>

                    {/* Back to Login Link */}
                    <p className="login-link">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className="link-text">
                            Login here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage