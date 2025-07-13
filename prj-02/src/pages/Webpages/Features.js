import React from 'react';
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaBolt,
  FaFileInvoiceDollar,
  FaChartBar,
  FaBell,
  FaQrcode,
  FaWallet,
  FaRupeeSign,
  FaPlug,
  FaClock,
  FaEye,
  FaFilter,
  FaDownload,
  FaCheckCircle   // <-- Add this
} from 'react-icons/fa';


import Header from "../../pages/Webpages/WebPageHeader.js";
import Footer from "../../pages/Webpages/WebPageFooter.js";
import "../../styles/AboutUs.css";

const Features = () => {
  return (
    <div>
      <Header />
      <div className="aboutus-container">

        {/* HERO SECTION */}
        <section className="hero-section">
          <h1>Powerful Features for Retailers & Wholesalers</h1>
          <p>Each feature is designed to simplify payment collection, tracking, and utility management for your business.</p>
        </section>

        {/* Vendor/Wholesaler Payment Collection */}
        <section className="section-block">
          <div className="text-image-wrap">
            <div className="text-content">
              <h2>Vendor/Wholesaler Payment Collection</h2>
              <p>
                Automates invoicing and payment collection, enabling wholesalers to receive funds from retailers smoothly and efficiently.
              </p>
              <ul className="offer-list">
                <li><FaFileInvoiceDollar className="list-icon" /> Generate and send GST-compliant invoices</li>
                <li><FaChartBar className="list-icon" /> Track payment status in real-time</li>
                <li><FaBell className="list-icon" /> Automate reminders for pending dues</li>
              </ul>
            </div>
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/PaymentCollection.png"
              alt="Vendor Payment Collection"
              className="section-image"
            />
          </div>
        </section>

        {/* Retailer Payment Acceptance */}
        <section className="section-block">
          <div className="text-image-wrap responsive-reverse">
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/RetailerPaymentAcceptance.png"
              alt="Retailer Payment Acceptance"
              className="section-image"
            />
            <div className="text-content push-right">
              <h2>Retailer Payment Acceptance</h2>
              <p>
                Allows retailers to accept payments from their customers securely via UPI, cards, or links—making checkout faster and smoother.
              </p>
              <ul className="offer-list">
                <li><FaCreditCard className="list-icon" /> Accept UPI, debit/credit cards, and payment links</li>
                <li><FaQrcode className="list-icon" /> Enable QR-based payments at counters</li>
                <li><FaCheckCircle className="list-icon" /> Instantly confirm received payments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Instant Settlements */}
        <section className="section-block">
          <div className="text-image-wrap">
            <div className="text-content">
              <h2>Instant Settlements</h2>
              <p>
                Transfers collected funds to your bank or wallet in minutes, helping maintain steady cash flow with no waiting.
              </p>
              <ul className="offer-list">
                <li><FaBolt className="list-icon" /> Settle payments 24x7 in real-time</li>
                <li><FaWallet className="list-icon" /> Get funds directly into your bank or wallet</li>
                <li><FaRupeeSign className="list-icon" /> Transparent charges, no surprises</li>
              </ul>
            </div>
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/InstantSettlements.png"
              alt="Instant Settlements"
              className="section-image"
            />
          </div>
        </section>

        {/* Utility Bill Payments */}
        <section className="section-block">
          <div className="text-image-wrap responsive-reverse">
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/UtilityBillPayments.png"
              alt="Utility Bill Payments"
              className="section-image"
            />
            <div className="text-content push-right">
              <h2>Utility Bill Payments (BBPS)</h2>
              <p>
                Enables payments of electricity, broadband, DTH, and other utility bills through India's BBPS system—all from one dashboard.
              </p>
              <ul className="offer-list">
                <li><FaPlug className="list-icon" /> Supports 200+ billers (electricity, gas, water, etc.)</li>
                <li><FaClock className="list-icon" /> Real-time payment confirmation</li>
                <li><FaMoneyBillWave className="list-icon" /> Retailers earn commission on each bill paid</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Payment Tracking & Dashboard */}
        <section className="section-block">
          <div className="text-image-wrap">
            <div className="text-content">
              <h2>Payment Tracking & Dashboard</h2>
              <p>
                Get real-time visibility of transactions through a live dashboard. Monitor collections, payouts, and invoices in one view.
              </p>
              <ul className="offer-list">
                <li><FaEye className="list-icon" /> Track every payment, refund, and invoice</li>
                <li><FaFilter className="list-icon" /> Filter by date, transaction type, and status</li>
                <li><FaDownload className="list-icon" /> Download reports for audits and finance</li>
              </ul>
            </div>
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/PaymentTracking.png"
              alt="Payment Tracking Dashboard"
              className="section-image"
            />
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="trust-section">
          <h2>Trusted by Thousands of Merchants Nationwide</h2>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Features;
