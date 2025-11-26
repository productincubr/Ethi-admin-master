/**
 * ProtectedRoute Component
 * 
 * PURPOSE: Ye component ensure karta hai ki koi unauthorized user protected pages access na kar sake
 * 
 * HOW IT WORKS:
 * 1. localStorage se user ka login status check karta hai
 * 2. User ka role (admin/doctor/customer) verify karta hai
 * 3. Agar authorized hai to page dikhata hai
 * 4. Agar unauthorized hai to login page par redirect kar deta hai
 * 
 * USAGE:
 * <ProtectedRoute allowedRole="admin">
 *   <AdminDashboard />
 * </ProtectedRoute>
 */

import React from "react";
import { Navigate } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection";

const ProtectedRoute = ({ children, allowedRole }) => {
  // Step 1: Check if user is logged in
  const isLoggedIn = retrieveData("allow_access") === "1";
  
  // Agar user login nahi hai, to login page par bhej do
  if (!isLoggedIn) {
    console.log("❌ User not logged in - Redirecting to login");
    return <Navigate to="/" replace />;
  }

  // Step 2: Check user role based on allowedRole
  if (allowedRole === "admin") {
    // Admin check karo
    const adminEmail = retrieveData("admin_email");
    const adminId = retrieveData("admin_id");
    
    if (!adminEmail || adminEmail === "null" || !adminId || adminId === "null" || adminId === "000000000000000000000000") {
      console.log("❌ Not an admin - Redirecting to login");
      return <Navigate to="/" replace />;
    }
    
    console.log("✅ Admin access granted");
    
  } else if (allowedRole === "doctor") {
    // Doctor check karo
    const doctorEmail = retrieveData("doctor_email");
    const doctorId = retrieveData("doctor_id");
    
    if (!doctorEmail || doctorEmail === "null" || !doctorId || doctorId === "null" || doctorId === "000000000000000000000000") {
      console.log("❌ Not a doctor - Redirecting to login");
      return <Navigate to="/" replace />;
    }
    
    console.log("✅ Doctor access granted");
    
  } else if (allowedRole === "customer") {
    // Customer check karo
    const customerId = retrieveData("customer_id");
    const mobile = retrieveData("customer_mobile");
    
    if (!customerId || customerId === "null" || !mobile || mobile === "null") {
      console.log("❌ Not a customer - Redirecting to login");
      return <Navigate to="/" replace />;
    }
    
    console.log("✅ Customer access granted");
  }

  // Step 3: Agar sab check pass ho gaya, to children render karo
  return children;
};

export default ProtectedRoute;
