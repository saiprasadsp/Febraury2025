import React from 'react';
import Header from "../../pages/Webpages/WebPageHeader.js";
import Footer from "../../pages/Webpages/WebPageFooter.js";
import "../../styles/AboutUs.css";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign, FaWallet, FaBolt, FaSyncAlt,FaShieldAlt, FaCheckCircle, FaLightbulb } from "react-icons/fa";



const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header /> {/* ✅ Add Header */}
    <div className="aboutus-container">
      

      <section className="hero-section">
        <h1>Empowering Wholesalers & Retailers Across India</h1>
        <p>Simplifying payments, boosting trust, and growing businesses together.</p>
        <button className="main-get-started-btn" onClick={() => navigate('/login')}>
  Get Started Today
</button>
      </section>

      {/* WHO WE ARE */}
      <section className="section-block">
        <div className="text-image-wrap">
          <div className="text-content">
            <h1>Who We Are</h1>
            <p>
              TheQuickPayMe is a dynamic fintech solution designed to bridge the gap between wholesalers,
              retailers, and end customers. Our platform enables seamless financial interactions – all under
              one secure and intuitive dashboard.
            </p>
            <p>
              Founded with the goal of digitizing and simplifying retail payments in India, we’re committed
              to making every transaction fast, simple, and transparent.
            </p>
          </div>
          <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/WhoWeAre.png" alt="Who We Are" className="section-image" />
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="section-block">
  <div className="text-image-wrap">
    <img
      src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/WhatWeOffer.png"
      alt="What We Offer"
      className="section-image"
    />
    <div className="text-content push-right">
      <h1>What We Offer</h1>
      <ul className="offer-list">
  <li><FaRupeeSign className="list-icon" /> <strong>Wholesaler Collections</strong> – Get paid by retailers instantly</li>
  <li><FaWallet className="list-icon" /> <strong>Retailer Wallet</strong> – Accept payments for your customers</li>
  <li><FaBolt className="list-icon" /> <strong>Utility Bill Payments</strong> – Recharge, pay bills and manage expenses</li>
  <li><FaSyncAlt className="list-icon" /> <strong>One Platform for All Transactions</strong> – No more juggling apps</li>
</ul>

    </div>
  </div>
</section>



      {/* TRUST BANNER */}
      <section className="trust-section">
        <h2>Join 10,000+ retailers who trust QuickPayMe</h2>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-block">
        <div className="text-image-wrap">
          <div className="text-content">
            <h1>Why Choose Us</h1>
            <ul className="why-list">
  <li><FaShieldAlt className="list-icon" /> <strong>Trust & Security</strong> – We use bank-level encryption</li>
  <li><FaCheckCircle className="list-icon" /> <strong>Simplicity</strong> – No training or setup needed</li>
  <li><FaLightbulb className="list-icon" /> <strong>Innovation</strong> – Constantly evolving to serve you better</li>
</ul>

          </div>
          <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/WhyChooseUs.png" alt="Why Choose Us" className="section-image" />
        </div>
      </section>

      
    </div>
    <Footer />
    </div>
  );
};

export default AboutUs;
