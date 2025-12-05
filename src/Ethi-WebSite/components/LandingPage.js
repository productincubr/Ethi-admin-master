import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import LandingHeader from './LandingHeader';
import Footer from './Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Smooth scroll effect
    const handleScroll = () => {
      const sections = ['home', 'login-portal', 'features', 'how-it-works'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSignIn = () => {
    scrollToSection('login-portal');
  };

  const handleDoctorLogin = () => {
    navigate('/login');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleSuperAdminLogin = () => {
    navigate('/superadmin');
  };

  return (
    <div className="landing-page">
      <LandingHeader 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        onSignIn={handleSignIn}
      />

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="brand-name">ETHI</span>
            </h1>
            <p className="hero-subtitle">
              Your Complete Healthcare Management Solution
            </p>
            <p className="hero-description">
              Streamline your healthcare practice with our comprehensive admin panel. 
              Manage doctors, track patients, and deliver exceptional care - all in one place.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleSignIn}>
                Sign In
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('features')}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <div className="pulse-circle"></div>
              <div className="pulse-circle delay-1"></div>
              <div className="pulse-circle delay-2"></div>
              <span className="hero-icon">🏥</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need to manage your healthcare practice</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3 className="feature-title">Doctor Management</h3>
            <p className="feature-description">
              Add, edit, and manage doctor profiles with comprehensive details including 
              specializations, qualifications, and availability.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3 className="feature-title">Patient Tracking</h3>
            <p className="feature-description">
              Monitor patient progress, view medical history, and track treatment plans 
              with our intuitive dashboard.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Appointment Scheduling</h3>
            <p className="feature-description">
              Manage appointments efficiently with calendar view, reminders, and 
              real-time availability updates.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Analytics & Reports</h3>
            <p className="feature-description">
              Get insights with detailed reports on patient visits, doctor performance, 
              and practice growth metrics.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3 className="feature-title">Communication</h3>
            <p className="feature-description">
              Stay connected with integrated messaging, notifications, and patient 
              communication tools.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure & Private</h3>
            <p className="feature-description">
              Bank-level security with encrypted data storage, role-based access control, 
              and HIPAA compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Login Portal Section */}
      <section id="login-portal" className="login-portal-section">
        <div className="section-header">
          <h2 className="section-title">Login Portal</h2>
          <p className="section-subtitle">Choose your role to access the platform</p>
        </div>
        <div className="login-cards-container">
          <div className="login-card" onClick={handleDoctorLogin}>
            <div className="login-card-icon doctor-icon">🩺</div>
            <h3 className="login-card-title">Doctor Login</h3>
            <p className="login-card-description">
              Access your doctor dashboard to manage patients, appointments, and medical records.
            </p>
            <button className="login-card-btn doctor-btn">
              Login as Doctor →
            </button>
          </div>

          <div className="login-card" onClick={handleAdminLogin}>
            <div className="login-card-icon admin-icon">👨‍💼</div>
            <h3 className="login-card-title">Admin Login</h3>
            <p className="login-card-description">
              Manage hospital operations, doctors, staff, and system configurations.
            </p>
            <button className="login-card-btn admin-btn">
              Login as Admin →
            </button>
          </div>

          <div className="login-card" onClick={handleSuperAdminLogin}>
            <div className="login-card-icon superadmin-icon">👑</div>
            <h3 className="login-card-title">Super Admin</h3>
            <p className="login-card-description">
              Full system access with advanced controls and administrative privileges.
            </p>
            <button className="login-card-btn superadmin-btn">
              Login as Super Admin →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in three simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Sign In</h3>
              <p className="step-description">
                Access your account with secure credentials. Admins and doctors have 
                separate role-based access to relevant features.
              </p>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Setup Profile</h3>
              <p className="step-description">
                Complete your profile with professional details, upload photos, and 
                configure your preferences and availability.
              </p>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Start Managing</h3>
              <p className="step-description">
                Begin managing patients, scheduling appointments, and delivering 
                exceptional healthcare services through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of healthcare professionals who trust ETHI for their practice management
          </p>
          <button className="btn-cta" onClick={handleSignIn}>
            Sign In Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
