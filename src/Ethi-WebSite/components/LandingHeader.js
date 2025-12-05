import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingHeader.css';
import ethiLogo from '../../Assests/images/ethi_green.png';

const LandingHeader = ({ activeSection, scrollToSection, onSignIn }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleSignInClick = () => {
    setIsMobileMenuOpen(false);
    onSignIn();
  };

  return (
    <header className={`landing-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo-section" onClick={() => scrollToSection('home')}>
          <div className="logo">
            <img src={ethiLogo} alt="ETHI Logo" className="logo-image" />
          </div>
        </div>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleMenuClick('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
            onClick={() => handleMenuClick('features')}
          >
            Features
          </button>
          <button
            className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
            onClick={() => handleMenuClick('how-it-works')}
          >
            How It Works
          </button>
          
          <button 
            className="nav-btn-signin" 
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default LandingHeader;
