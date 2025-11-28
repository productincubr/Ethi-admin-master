
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { retrieveData } from '../../LocalConnection/LocalConnection';
import '../../Css/CustomerDashboard.css';

/**
 * CustomerDashboard Component
 * 
 * Main dashboard for customer users after successful login.
 * Displays personalized greeting, user information, and quick access to key features.
 * 
 * Features:
 * - User profile display with name, phone, and ID
 * - Quick access cards for appointments, diet plans, progress tracking, chat, profile, and notifications
 * - Logout functionality with localStorage cleanup
 * - Debug section for development (should be removed in production)
 */
function CustomerDashboard() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    customerId: '',
    customerMobile: '',
    customerName: ''
  });

  // Load customer data from localStorage on component mount
  useEffect(() => {
    console.log("Customer Dashboard - Loading customer data...");
    
    const customerId = retrieveData("customer_id");
    const customerMobile = retrieveData("customer_mobile");
    const customerName = retrieveData("customer_name") || "Customer";

    console.log("Customer Data Retrieved:", {
      customerId,
      customerMobile,
      customerName
    });

    setCustomerData({
      customerId,
      customerMobile,
      customerName
    });
  }, []);

  // Handle user logout - clears all localStorage and redirects to login page
  const handleLogout = () => {
    console.log("Customer logging out...");
    
    // Clear all localStorage data
    localStorage.clear();
    
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="customer-dashboard-container">
      <div className="customer-header">
        <div className="header-content">
          <h1>Welcome to ETHI Customer Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>👤 Hello, {customerData.customerName}!</h2>
          <p className="info-text">Phone: {customerData.customerMobile || 'Not Available'}</p>
          <p className="info-text">Customer ID: {customerData.customerId || 'Not Available'}</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="card-icon">📅</div>
            <h3>My Appointments</h3>
            <p>View and manage your appointments with doctors</p>
            <button className="feature-btn">View Appointments</button>
          </div>

          <div className="feature-card">
            <div className="card-icon">📋</div>
            <h3>Diet Plans</h3>
            <p>Access your personalized diet plans</p>
            <button className="feature-btn">View Diet Plans</button>
          </div>

          <div className="feature-card">
            <div className="card-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Track your health progress and goals</p>
            <button className="feature-btn">View Progress</button>
          </div>

          <div className="feature-card">
            <div className="card-icon">💬</div>
            <h3>Chat with Doctor</h3>
            <p>Connect with your assigned doctor</p>
            <button className="feature-btn">Start Chat</button>
          </div>

          <div className="feature-card">
            <div className="card-icon">👤</div>
            <h3>My Profile</h3>
            <p>View and update your profile information</p>
            <button className="feature-btn">View Profile</button>
          </div>

          <div className="feature-card">
            <div className="card-icon">📱</div>
            <h3>Notifications</h3>
            <p>Check your latest notifications and updates</p>
            <button className="feature-btn">View Notifications</button>
          </div>
        </div>

        {/* Development debug section - Remove in production */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="debug-section">
            <h3>🔧 Debug Information (Development Only)</h3>
            <pre className="debug-content">
              {JSON.stringify({
                customerId: customerData.customerId,
                customerMobile: customerData.customerMobile,
                customerName: customerData.customerName,
                allowAccess: retrieveData("allow_access"),
                allLocalStorageKeys: Object.keys(localStorage)
              }, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default CustomerDashboard;
