import React, { useState } from 'react';
import "../styles/TermsAndConditions.css";
import logo from "../assets/logo/TheQucikPayMe.png";
import landingpage from "../assets/WebPage/Landingpage.png";

function TermsAndConditions() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="header-center">
          <a href="/products">Products</a>
          <span className="dot">·</span>
          <a href="/solutions">Solutions</a>
          <span className="dot">·</span>
          <a href="/pricing">Pricing</a>
          <span className="dot">·</span>
          <a href="/contactus">Contact Us</a>
        </div>

        <div className="header-right">
          <a href="/login" className="login-link">Login</a>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </header>

      <div className={`mobile-menu-container ${menuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>&times;</button>
        <div className="mobile-nav-links">
          <a href="/products">Products</a>
          <a href="/solutions">Solutions</a>
          <a href="/pricing">Pricing</a>
          <a href="/contactus">Contact Us</a>
        </div>
      </div>

      <div className="page-title">
        <h1><b>The Future of Payments</b></h1>
        <p className="subtitle">
          Simplifying financial transactions for retailers with secure,<br />
          fast, and easy-to-use payment solutions.
        </p>
        <button className="main-get-started-btn">Get Started</button>
      </div>

      <div className="image-gallery">
        <img src={landingpage} alt="Landing" className="gallery-image" />
      </div>

      <div className="content">
        {/* Terms & Conditions */}
      </div>
    </div>
  );
}

export default TermsAndConditions;
