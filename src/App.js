import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
// WebSite Pages

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* doctor panel */}
          <Route path="/login" element={<NewLoginPage />} />
          <Route path="/doctorwelcomepage" element={<DoctorWelcomepage />} />
          <Route path="/doctor_chats" element={<LiveChatDoctor />} />
          <Route
            path="/doctor_feeds_and_post"
            element={<DoctorFeedsAndPost />}
          />
          <Route
            path="/doctor_video_call/:action"
            element={<DoctorVideoCall />}
          />
          <Route
            path="/doctor_admin_general_profile"
            element={<DoctorGeneralProfile />}
          />
          {/* work on this page */}
          <Route path="/doctor_my_calendar" element={<DoctorMyCalendar />} />
          <Route path="/doctor_patients" element={<DoctorMyPatients />} />
          <Route
            path="/doctor_my_patients_create_diet_plan/:action"
            element={<DoctorCreateDietPlan />}
          />
          <Route
            path="/doctor_my_patients_show_diet_plan/:action"
            element={<DoctorShowDietPlan />}
          />
          <Route
            path="/DoctorPatientProfile/:action"
            element={<DoctorPatientProfile />}
          />
          {/* DoctorpatientsForm page also */}
          {/* PatientsProgessUpdate page also */}
          {/* work on this page */}
          {/* doctor panel */}
          {/* Super Admin panel */}
          <Route path="/superadmin" element={<AdminLogin />} />
          <Route path="/AdminWelcomepage" element={<NutritionistHome />} />
          <Route path="/AdminCalendar" element={<AdminCalendar />} />
          <Route path="/AdminFeed" element={<AdminFeed />} />
          <Route path="/AdminPanelSettings" element={<AdminPanelSettings />} />
          <Route path="/NotificationsAdmin" element={<NotificationsAdmin />} />
          <Route path="/StaffProfiles" element={<StaffProfiles />} />
          <Route path="/AdminPanelQueries" element={<AdminPanelQueries />} />
          <Route path="/AdminCorporateDetalis" element={<CorporateDetalis />} />
          <Route path="/admin_chats" element={<LiveChatAdmin />} />
          <Route path="/ChatbotAi" element={<ChatbotAi />} />
          <Route
            path="/admin_video_call/:action"
            element={<AdminVideoCall />}
          />
          <Route path="/MyProfileAdmin" element={<MyProfileAdmin />} />
          <Route path="/AdminStaffProfile" element={<AdminStaffProfile />} />
          <Route path="/PatientProfile/:action" element={<PatientProfile />} />
          <Route path="/payment" element={<Payment />} />
          {/* <Route path="/payment/:customer_id" component={Payment} /> */}
          {/* work on this page */}
          <Route path="/AddDoctorProfile" element={<AddDoctorProfile />} />
          <Route path="/ViewAdminPatient" element={<ViewAdminPatient />} />
          <Route path="/LeaveRequest" element={<LeaveRequest />} />
          <Route
            path="/Admin_my_patients_show_diet_plan/:action"
            element={<AdminShowDietPlan />}
          />
          {/* <Route path="/ViewPatient" element={<ViewPatient />} /> */}
          <Route path="/MoreDetail/:action" element={<MoreDetail />} />
          <Route
            path="/AdminMoreDetail/:action"
            element={<AdminMoreDetails />}
          />
          <Route path="/Chatpage" element={<Chatpage />} />
          <Route path="/ChatpageDiet" element={<ChatpageDiet />} />
          <Route path="/SuccessPayment" element={<Sucesspayment />} />
          PaymentCancel
          <Route path="/PaymentCancel" element={<PaymentCancel />} />
          {/* <Route path="/doctor_chats/:action" element={<Chatpage />} /> */}
          {/* work on this page */}
          {/* Super Admin panel */}
          {/* Ethi Website Pages */}
          <Route path="/" element={<HomeNew />} />
          <Route path="/return_&_refund_policy" element={<RefundandReturn />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/TermsofUse" element={<TermofUse />} />
          <Route path="/contact_us" element={<ContactUs />} />
          {/* Ethi Website Pages */}
          {/* Customer Call Page */}
          <Route
            path="/customervideocall/:action"
            element={<CustomerVideoCall />}
          />
          <Route
            path="/customerpayment/:action"
            element={<CustomerPayment />}
          />
          {/* Customer Call Page */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
