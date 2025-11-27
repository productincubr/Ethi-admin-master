/**
 * ProtectedRoute Component
 * 
 * PURPOSE: Higher-Order Component (HOC) to protect routes from unauthorized access
 * 
 * HOW IT WORKS:
 * 1. Checks user's login status from localStorage
 * 2. Verifies user's role (admin/doctor/customer)
 * 3. Allows access if authorized, otherwise redirects to login page
 * 
 * USAGE:
 * <ProtectedRoute allowedRole="admin">
 *   <AdminDashboard />
 * </ProtectedRoute>
 * 
 * @param {React.ReactNode} children - The component to render if authorized
 * @param {string} allowedRole - Required role: "admin", "doctor", or "customer"
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection";

const ProtectedRoute = ({ children, allowedRole }) => {
  // Step 1: Check if user is logged in
  const isLoggedIn = retrieveData("allow_access") === "1";
  
  // Redirect to login page if user is not authenticated
  if (!isLoggedIn) {
    console.log("❌ User not logged in - Redirecting to login");
    return <Navigate to="/" replace />;
  }

  // Step 2: Verify user role based on allowedRole parameter
  if (allowedRole === "admin") {
    // Verify admin credentials
    const adminEmail = retrieveData("admin_email");
    const adminId = retrieveData("admin_id");
    
    if (!adminEmail || adminEmail === "null" || !adminId || adminId === "null" || adminId === "000000000000000000000000") {
      console.log("❌ Not an admin - Redirecting to login");
      return <Navigate to="/" replace />;
    }
    
    console.log("✅ Admin access granted");
    
  } else if (allowedRole === "doctor") {
    // Verify doctor credentials
    const doctorEmail = retrieveData("doctor_email");
    const doctorId = retrieveData("doctor_id");
    
    if (!doctorEmail || doctorEmail === "null" || !doctorId || doctorId === "null" || doctorId === "000000000000000000000000") {
      console.log("❌ Not a doctor - Redirecting to login");
      return <Navigate to="/" replace />;
    }
    
    console.log("✅ Doctor access granted");
    
  } else if (allowedRole === "customer") {
    // Verify customer credentials
    const customerId = retrieveData("customer_id");
    const mobile = retrieveData("customer_mobile");
    
    if (!customerId || customerId === "null" || !mobile || mobile === "null") {
      console.log("❌ Not a customer - Redirecting to login");
      return <Navigate to="/" replace />;
    }
    
    console.log("✅ Customer access granted");
  }

  // Step 3: If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;
