import React from "react";
import "../styles/RefundPolicy.css";
import Header from "../pages/Webpages/WebPageHeader.js";
import Footer from "../pages/Webpages/WebPageFooter.js";

const RefundPolicy = () => (
  <div>
    <Header />

    {/* Hero Section */}
    <div className="terms-hero-banner">
      <h1 className="terms-hero-title">
        <i className="fas fa-undo-alt" style={{ marginRight: "10px" }}></i>
        Refund Policy
      </h1>
      <p className="terms-hero-subtitle">
        Learn how we handle refunds for failed or duplicate transactions.
      </p>
    </div>

    {/* Main Content */}
    <div className="terms-wrapper">
      <div className="terms-bordered-box">

        <div className="terms-point-box">
          <strong>Overview</strong>
          <p>
            NeoFin Nex India Private Limited provides digital financial services including wallet top-ups,
            bill payments, and fund transfers. We aim to ensure all transactions are processed accurately and securely.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>When Refunds Are Applicable</strong>
          <ul>
            <li>Money was deducted from your account, but the transaction failed.</li>
            <li>Duplicate transactions due to technical error.</li>
            <li>Amount was debited, but the service (e.g., bill payment or bank transfer) was not fulfilled.</li>
            <li>Unauthorized transactions reported within 24 hours.</li>
          </ul>
        </div>

        <div className="terms-point-box">
          <strong>How to Request a Refund</strong>
          <p>
            To initiate a refund, users must report the issue within <strong>7 days</strong> of the transaction date by
            contacting our support team through the platform or email. Please provide:
          </p>
          <ul>
            <li>Transaction ID</li>
            <li>Transaction Date</li>
            <li>A brief description of the issue</li>
          </ul>
        </div>

        <div className="terms-point-box">
          <strong>Refund Process</strong>
          <p>
            After internal verification, if the refund is approved, it will be processed within <strong>3–5 business days</strong>.
            Refunds will be credited to the original payment method or wallet as applicable.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Non-Refundable Cases</strong>
          <p>No refunds will be provided in the following scenarios:</p>
          <ul>
            <li>The service was successfully delivered.</li>
            <li>The delay or failure was due to incorrect information provided by the user (e.g., wrong account number, wrong bill details).</li>
          </ul>
        </div>

        <div className="terms-point-box">
          <strong>Need Help?</strong>
          <p>
            For assistance or queries, please contact our customer support through the official contact details listed on our website.
          </p>
        </div>

      </div>
    </div>

    <Footer />
  </div>
);

export default RefundPolicy;
