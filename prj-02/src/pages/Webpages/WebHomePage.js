import React from 'react';
import Header from "../../pages/Webpages/WebPageHeader.js";
import Footer from "../../pages/Webpages/WebPageFooter.js";
import "../../styles/HomePage.css";
import {
  FaWallet,
  FaNetworkWired,
  FaFileInvoice,
  FaDownload,
  FaUserPlus,
  FaBolt,
  FaCheckCircle,
  FaMobileAlt,
  FaFileInvoiceDollar,
  FaTachometerAlt
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="homepage-wrapper">
      <Header />

      {/* Hero Section */}
      <div className="homepage-hero">
        <h1><b>The Future of Payments</b></h1>
        <p className="homepage-subtitle">
          Simplifying financial transactions for retailers with secure,<br />
          fast, and easy-to-use payment solutions.
        </p>

        {/* 🔽 Buttons moved here immediately after subtitle */}
        <div className="homepage-buttons">
          <button
            className="homepage-btn"
            onClick={() => navigate("/contactus")}
          >
            Become a Partner
          </button>
          <button
            className="homepage-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>

      </div>

      {/* Hero Image */}
      <div className="homepage-image-gallery">
        <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/Landingpage.png" alt="Landing" className="homepage-gallery-image" />
      </div>

      {/* Summary Section */}
      <section className="homepage-container">
        <h2>All-In-One Payment Platform</h2>
        <p>
          TheQuickPayMe empowers both small retailers and large wholesalers to manage all their business payments in one place.<br />
          From accepting customer payments to settling dues with vendors and paying utility bills,<br />
          our platform makes transactions fast, secure, and hassle-free — improving cash flow and saving time.
        </p>
        <div className="homepage-platform-features">
  <div className="platform-feature">
    <div className="platform-feature-box">
      <div className="platform-icon blue-bg">
        <FaWallet />
      </div>
      <h4>Accept Payments</h4>
      <p>From customers via UPI, cards, QR codes</p>
    </div>
  </div>

  <div className="platform-feature">
    <div className="platform-feature-box">
      <div className="platform-icon green-bg">
        <FaNetworkWired />
      </div>
      <h4>QuickPayMe Platform</h4>
      <p>Unified management dashboard</p>
    </div>
  </div>

  <div className="platform-feature">
    <div className="platform-feature-box">
      <div className="platform-icon blue-bg">
        <FaFileInvoice />
      </div>
      <h4>Pay Bills</h4>
      <p>Utilities, vendors, and suppliers</p>
    </div>
  </div>
</div>

        
      </section>




      <section className="homepage-features-enhanced">
        <h2 className="custom-section-heading">
          <b>
            <span className="black-heading">Smart Features Built for </span>
            <span className="highlight-step">Modern Businesses</span>
          </b>
        </h2>

        <p className="homepage-feature-description">
          Whether you're running a small retail shop or managing a wholesale network, TheQuickPayMe <br>
          </br>gives you powerful tools to accept payments, settle bills, and track earnings — all in one place.
        </p>
        <div className="homepage-feature-grid">
          <div className="homepage-feature-card">
            <FaMobileAlt className="feature-icon" />
            <h5>Accept Any Payment</h5>
            <p>Collect money via UPI, QR codes, cards, or links. No hardware needed — just your smartphone.</p>
          </div>
          <div className="homepage-feature-card">
            <FaBolt className="feature-icon" />
            <h5>Instant Settlements</h5>
            <p>Get your funds in minutes. No delays, no stress. Keep your business running smoothly 24/7.</p>
          </div>
          <div className="homepage-feature-card">
            <FaFileInvoiceDollar className="feature-icon" />
            <h5>Bill Payments Made Easy</h5>
            <p>Pay for electricity, mobile recharge, DTH, broadband, and more — directly through the app.</p>
          </div>
          <div className="homepage-feature-card">
            <FaTachometerAlt className="feature-icon" />
            <h5>Live Dashboard & Reports</h5>
            <p>Track transactions in real-time, download custom reports, and stay on top of your earnings.</p>
          </div>
        </div>
      </section>
      <section className="homepage-angled-section">
        <div className="get-started-container">
          <h2 className="get-started-heading">
            <b>
              Get Started in <span className="highlight-step">4 Simple Steps</span>
            </b>
          </h2>
          <p className="get-started-subtitle">
            From sign-up to your first payment in less than 30 minutes. No technical knowledge required.
          </p>

          <div className="get-started-steps">
            <div className="step-card">
              <div className="step-badge">01</div>
              <div className="step-icon"><FaDownload /></div>
              <h4>Download & Sign Up</h4>
              <div className="step-duration">5 minutes</div>
              <p>Get the QuickPayMe app from Play Store or App Store. Sign up with your mobile number and complete KYC in under 5 minutes.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">02</div>
              <div className="step-icon"><FaUserPlus /></div>
              <h4>Setup Your Business</h4>
              <div className="step-duration">24 hours</div>
              <p>Add your business details, bank account, and verification documents. Our team reviews and activates your account within 24 hours.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">03</div>
              <div className="step-icon"><FaBolt /></div>
              <h4>Start Accepting Payments</h4>
              <div className="step-duration">Instant</div>
              <p>Generate your unique QR code, share payment links, or accept card payments. Money reaches your account instantly.</p>
            </div>

            <div className="step-card">
              <div className="step-badge">04</div>
              <div className="step-icon"><FaCheckCircle /></div>
              <h4>Manage & Grow</h4>
              <div className="step-duration">Ongoing</div>
              <p>Track all transactions, pay bills, manage inventory, and grow your business with detailed analytics and insights.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="security-assurance-section">
        <h2 className="security-title">
          <b>Your Money is <span className="highlight-secure">100% Safe</span></b>
        </h2>
        <p className="security-subtitle">
          We use industry-leading security measures to protect your business and customers' financial data.
        </p>

        <div className="security-features">
          <div className="security-card">
            <div className="security-icon blue-secure-bg">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h4>Bank-Grade Security</h4>
            <p>256-bit SSL encryption and PCI DSS compliance ensure your data is always protected.</p>
          </div>

          <div className="security-card">
            <div className="security-icon green-secure-bg">
              <i className="fas fa-lock"></i>
            </div>
            <h4>Secure Transactions</h4>
            <p>Multi-layer authentication and real-time fraud detection for every transaction.</p>
          </div>

          <div className="security-card">
            <div className="security-icon purple-secure-bg">
              <i className="fas fa-eye"></i>
            </div>
            <h4>Privacy First</h4>
            <p>We never store sensitive payment information and follow strict data privacy laws.</p>
          </div>
        </div>
      </section>


      {/* Trusted Section */}
      <section className="homepage-trusted">
        <h2>Trusted by 10,000+ Retailers, Agents & Distributors</h2>
        <p>Join India's growing payment network and go digital with confidence.</p>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
