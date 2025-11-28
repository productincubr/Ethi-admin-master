/**
 * ETHI Main App Component
 * 
 * PURPOSE: Main routing file with protected routes
 * 
 * PROTECTED ROUTES:
 * - Admin routes → Only admins can access
 * - Doctor routes → Only doctors can access
 * - Customer routes → Only customers can access
 * 
 * PUBLIC ROUTES:
 * - Login pages (EthiLoginPage, OtpPage, EmailPasswordPage)
 * - Website pages (Home, Contact, etc.)
 */

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// ⭐ IMPORT PROTECTED ROUTE COMPONENT
import ProtectedRoute from "./Components/RepeatingComponents/ProtectedRoute";

/** doctor Penal */
import DoctorLogin from "./Components/DoctorPanel/DoctorLogin";
import DoctorWelcomepage from "./Components/DoctorPanel/DoctorWelcomepage";
import LiveChatDoctor from "./Components/DoctorPanel/LiveChatDoctor";
import DoctorMyPatients from "./Components/DoctorPanel/DoctorMyPatients";
import DoctorFeedsAndPost from "./Components/DoctorPanel/DoctorFeedsAndPost";
import DoctorMyCalendar from "./Components/DoctorPanel/DoctorMyCalendar";
import DoctorCreateDietPlan from "./Components/DoctorPanel/DoctorCreateDietPlan";
import DoctorShowDietPlan from "./Components/DoctorPanel/DoctorShowDietPlan";
import DoctorGeneralProfile from "./Components/DoctorPanel/DoctorGeneralProfile";
import DoctorVideoCall from "./Components/DoctorPanel/DoctorVideoCall";
import DoctorShowDietPlan2 from "./Components/DoctorPanel/ReportTemplate";
import ViewPatient from "./Components/DoctorPanel/ViewPatient";
import MoreDetail from "./Components/DoctorPanel/MoreDetail";
import DoctorPatientProfile from "./Components/DoctorPanel/DoctorPatientProfile";
/** doctor Penal */

// Admin Panel
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import AdminCalendar from "./Components/AdminPanel/AdminCalendar";
import AdminFeed from "./Components/AdminPanel/AdminFeed";
import ViewAdminPatient from "./Components/AdminPanel/ViewAdminPatient";
import NutritionistHome from "./Components/AdminPanel/NutritionistHome";
import AdminPanelSettings from "./Components/AdminPanel/AdminPanelSettings";
import NotificationsAdmin from "./Components/AdminPanel/NotificationsAdmin";
import StaffProfiles from "./Components/AdminPanel/StaffProfiles";
import AddDoctorProfile from "./Components/AdminPanel/AddDoctorProfile";
import LeaveRequest from "./Components/AdminPanel/LeaveRequest";
import AdminPanelQueries from "./Components/AdminPanel/AdminPanelQueries";
import CorporateDetalis from "./Components/AdminPanel/CorporateDetalis";
import LiveChatAdmin from "./Components/AdminPanel/LiveChatAdmin";
import AdminVideoCall from "./Components/AdminPanel/AdminVideoCall";
import MyProfileAdmin from "./Components/AdminPanel/MyProfileAdmin";
import AdminStaffProfile from "./Components/AdminPanel/AdminStaffProfile";
import PatientProfile from "./Components/AdminPanel/PatientProfile";
import Chatpage from "./Components/AdminPanel/Chatpage";
import ChatpageDiet from "./Components/AdminPanel/ChatpageDiet";
import Payment from "./Components/AdminPanel/Payment";
import Sucesspayment from "./Components/AdminPanel/Sucesspayment";
import PaymentCancel from "./Components/AdminPanel/PaymentCancel";
// Admin Panel

//customer panel
import CustomerVideoCall from "./Components/DoctorPanel/CustomerVideoCall";
import CustomerPayment from "./Components/DoctorPanel/CustomerPayment";
import CustomerDashboard from "./Components/CustomerPanel/CustomerDashboard";
//customer panel

// WebSite Pages
import HomePage from "./Ethi-WebSite/components/Home";
import ContactUs from "./Ethi-WebSite/components/ContactUs";
import RefundandReturn from "./Ethi-WebSite/components/RefundandReturn";
import PrivacyPolicy from "./Ethi-WebSite/components/PrivacyPolicy";
import TermofUse from "./Ethi-WebSite/components/TermofUse";

import AdminShowDietPlan from "./Components/AdminPanel/AdminShowDietPlan";
import HomeNew from "./Ethi-WebSite/components/HomeNew";
import AdminMoreDetails from "./Components/AdminPanel/AdminMoreDetails";
import ChatbotAi from "./Components/AdminPanel/LiveChatDoctor";
import NewLoginPage from "./Components/DoctorPanel/newLoginPage";
import LoginFirstPage from "./Components/DoctorPanel/LoginFirstPage";
import EthiLoginPage from "./pages/EthiLoginPage";
import OtpPage from "./pages/OtpPage";
import EmailPasswordPage from "./pages/EmailPasswordPage";
// WebSite Pages

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* ========================================
              PUBLIC ROUTES (No Authentication Required)
              ======================================== */}
          
          {/* Main Login Page - Entry point */}
          <Route path="/" element={<EthiLoginPage />} />
          <Route path="/login" element={<EthiLoginPage />} />

          {/* OTP + Email-Password Login Pages */}
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/email-password" element={<EmailPasswordPage />} />
          
          {/* Old Login Pages (Deprecated - but kept for backward compatibility) */}
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/superadmin" element={<AdminLogin />} />

          {/* Website Public Pages */}
          <Route path="/return_&_refund_policy" element={<RefundandReturn />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/TermsofUse" element={<TermofUse />} />
          <Route path="/contact_us" element={<ContactUs />} />
          
          {/* Customer Video Call & Payment (Public - accessed via link) */}
          <Route path="/customervideocall/:action" element={<CustomerVideoCall />} />
          <Route path="/customerpayment/:action" element={<CustomerPayment />} />
          
          {/* Payment Success/Cancel Pages */}
          <Route path="/SuccessPayment" element={<Sucesspayment />} />
          <Route path="/PaymentCancel" element={<PaymentCancel />} />

          {/* ========================================
              CUSTOMER PROTECTED ROUTES
              Only customers can access these pages
              ======================================== */}
          
          <Route 
            path="/customer-dashboard" 
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* ========================================
              DOCTOR PROTECTED ROUTES
              Only doctors can access these pages
              ======================================== */}
          
          <Route 
            path="/doctorwelcomepage" 
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorWelcomepage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/doctor_chats" 
            element={
              <ProtectedRoute allowedRole="doctor">
                <LiveChatDoctor />
              </ProtectedRoute>
            } 
          />
          
          <Route
            path="/doctor_feeds_and_post"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorFeedsAndPost />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/doctor_video_call/:action"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorVideoCall />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/doctor_admin_general_profile"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorGeneralProfile />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/doctor_my_calendar" 
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorMyCalendar />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/doctor_patients" 
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorMyPatients />
              </ProtectedRoute>
            } 
          />
          
          <Route
            path="/doctor_my_patients_create_diet_plan/:action"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorCreateDietPlan />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/doctor_my_patients_show_diet_plan/:action"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorShowDietPlan />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/DoctorPatientProfile/:action"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorPatientProfile />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/MoreDetail/:action" 
            element={
              <ProtectedRoute allowedRole="doctor">
                <MoreDetail />
              </ProtectedRoute>
            } 
          />

          {/* ========================================
              ADMIN PROTECTED ROUTES
              Only admins can access these pages
              ======================================== */}
          
          <Route 
            path="/AdminWelcomepage" 
            element={
              <ProtectedRoute allowedRole="admin">
                <NutritionistHome />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/AdminCalendar" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminCalendar />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/AdminFeed" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminFeed />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/AdminPanelSettings" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminPanelSettings />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/NotificationsAdmin" 
            element={
              <ProtectedRoute allowedRole="admin">
                <NotificationsAdmin />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/StaffProfiles" 
            element={
              <ProtectedRoute allowedRole="admin">
                <StaffProfiles />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/AdminPanelQueries" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminPanelQueries />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/AdminCorporateDetalis" 
            element={
              <ProtectedRoute allowedRole="admin">
                <CorporateDetalis />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin_chats" 
            element={
              <ProtectedRoute allowedRole="admin">
                <LiveChatAdmin />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/ChatbotAi" 
            element={
              <ProtectedRoute allowedRole="admin">
                <ChatbotAi />
              </ProtectedRoute>
            } 
          />
          
          <Route
            path="/admin_video_call/:action"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminVideoCall />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/MyProfileAdmin" 
            element={
              <ProtectedRoute allowedRole="admin">
                <MyProfileAdmin />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/AdminStaffProfile" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminStaffProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/PatientProfile/:action" 
            element={
              <ProtectedRoute allowedRole="admin">
                <PatientProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute allowedRole="admin">
                <Payment />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/AddDoctorProfile" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AddDoctorProfile />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/ViewAdminPatient" 
            element={
              <ProtectedRoute allowedRole="admin">
                <ViewAdminPatient />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/LeaveRequest" 
            element={
              <ProtectedRoute allowedRole="admin">
                <LeaveRequest />
              </ProtectedRoute>
            } 
          />
          
          <Route
            path="/Admin_my_patients_show_diet_plan/:action"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminShowDietPlan />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/AdminMoreDetail/:action"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminMoreDetails />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/Chatpage" 
            element={
              <ProtectedRoute allowedRole="admin">
                <Chatpage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/ChatpageDiet" 
            element={
              <ProtectedRoute allowedRole="admin">
                <ChatpageDiet />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
