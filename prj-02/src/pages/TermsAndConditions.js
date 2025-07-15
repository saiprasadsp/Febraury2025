import React from "react";
import "../styles/TermsAndConditions.css";
import Header from "../pages/Webpages/WebPageHeader.js";
import Footer from "../pages/Webpages/WebPageFooter.js";

const TermsAndConditions = () => (
  <div>
      <Header />
    {/* Terms Header Section */}
<div className="terms-header">
  <div className="terms-header-icon">
    <i className="fas fa-balance-scale"></i>
  </div>
  <h1 className="terms-header-title">Terms and Conditions</h1>
  <p className="terms-header-subtitle">Legal Framework & Service Agreement</p>
  <div className="terms-header-divider"></div>
</div>

    {/* Document Information */}
    <div className="terms-wrapper"></div>
    <div className="terms-info-box terms-bordered-box">
      <div className="terms-info-row">
        <span className="terms-info-icon terms-info-blue">
          <i className="fas fa-file-alt"></i>
        </span>
        <div>
          <div className="terms-info-title terms-info-blue">Document Information</div>
        </div>
      </div>
      <div className="terms-info-text mt-2">
        <p>
          This document is an electronic record in terms of Information Technology Act, 2000 and rules
          thereunder as applicable and the amended provisions pertaining to electronic records in various
          statutes as amended by the Information Technology Act, 2000. This electronic record is generated
          by a computer system and does not require any physical or digital signatures.
        </p>
        <p>
          This document is published in accordance with the provisions of Rule 3 (1) of the Information
          Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations,
          privacy policy and Terms of Use for access or usage of domain name<br />
          <a href="https://www.thequickpayme.com/login" target="_blank" rel="noopener noreferrer">
            https://www.thequickpayme.com/login
          </a>{" "}
          ('Platform').
        </p>
        <p>
          The Platform is owned by <strong>NeoFin Nex India Private Limited</strong>, a company incorporated under
          the Companies Act, 1956 with its registered office at NeoFin Nex India Private Limited,
          FLAT NO 102, FIRST FLOOR, Sukiran Apartment, HYLAM COLONY, Near PJR statue, Venkatagiri,
          Hyderabad, India (hereinafter referred to as 'Platform Owner', 'we', 'us', 'our').
        </p>
      </div>
    </div>
  

    {/* Agreement to Terms & Modification Notice */}
    <div className="terms-info-box">
      <div className="terms-info-row">
        <span className="terms-info-icon terms-info-blue">
          <i className="fas fa-check-circle"></i>
        </span>
        <div>
          <div className="terms-info-title terms-info-blue">Agreement to Terms</div>
          <div className="terms-info-text">
            Your use of the Platform and the services provided therein ("Services") are governed by the following
            terms and conditions ("Terms of Use") as applicable to the Platform including the applicable policies
            which are incorporated herein by way of reference. By using or transacting on the Platform,
            you agree to be bound by these Terms of Use.
          </div>
        </div>
      </div>

      <div className="terms-info-row">
        <span className="terms-info-icon terms-info-yellow">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        <div>
          <div className="terms-info-title terms-info-yellow">Modification Notice</div>
          <div className="terms-info-text">
            <b>
              These Terms of Use can be modified at any time without prior notice. It is your responsibility
              to periodically review these Terms of Use to stay informed of updates.
            </b>
          </div>
        </div>
      </div>
    </div>

    {/* Important Notice */}
    <div className="terms-important-box">
      <div className="terms-important-row">
        <span className="terms-important-icon">
          <i className="fas fa-shield-alt"></i>
        </span>
        <span className="terms-important-title">IMPORTANT NOTICE</span>
      </div>
      <div className="terms-important-text">
        ACCESSING, BROWSING, OR USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS
        UNDER THESE TERMS OF USE. PLEASE READ THEM CAREFULLY BEFORE PROCEEDING.
      </div>
    </div>
{/* Terms of Service Section */}
<div className="terms-section">
  <h2 className="terms-heading">
    <i className="fas fa-balance-scale terms-heading-icon"></i> Terms of Service
  </h2>

  <div className="terms-list">
  {[
    "To access and use the Services, you agree to provide true, accurate, and complete information during registration and while using the Platform, and you shall be responsible for all actions taken under your account.",
    "You agree to maintain the confidentiality of your login credentials and notify us immediately if you suspect any unauthorized use of your account.",
    "The Platform facilitates digital wallet loading, fund transfers, bill payments, and related financial transactions. You acknowledge that all transactions initiated through the Platform are final and binding.",
    "We do not guarantee uninterrupted or error-free operation of the Platform or Services. Transactions are subject to processing by third-party banks, payment networks, and billers, and delays or failures may occur.",
    "Refunds will be processed only in cases of verified technical or processing errors caused by us. Disputes regarding transactions must be reported within 7 days from the transaction date. Refund requests unrelated to service errors may not be entertained.",
    "You agree to pay any applicable fees or charges related to the Services as displayed on the Platform. All fees are subject to change and will be notified accordingly.",
    "You shall use the Platform and Services only for lawful purposes and shall not engage in any fraudulent or illegal activity.",
    "The Platform may contain links to third-party websites or services. We are not responsible for the content, terms, or privacy practices of such third parties.",
    "You agree to indemnify and hold harmless the Platform Owner, its affiliates, officers, and employees from any claims, damages, or losses arising from your violation of these Terms or applicable laws.",
    "We shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the Platform or Services.",
    "In case of force majeure events such as natural disasters, government actions, or system failures beyond our control, we may delay or suspend services without liability."
  ].map((text, index) => (
    <div className="terms-card" key={index}>
      <div className="terms-number">{index + 1}</div>
      <p className="terms-text">{text}</p>
    </div>
  ))}
</div>

</div>
{/* Governing Law and Jurisdiction */}
<div className="terms-info-box">
  <h2 className="terms-section-heading">
    <i className="fas fa-shield-alt terms-heading-icon"></i> Governing Law and Jurisdiction
  </h2>
  <div className="terms-subsection">
    <p>
      <strong>🔷 Governing Law:</strong> These Terms and any dispute or claim arising out of or relating to them
      shall be governed by the <span className="highlighted-text">laws of India</span>.
    </p>
    <p>
      <strong>🔷 Jurisdiction:</strong> All disputes shall be subject to the exclusive jurisdiction of courts in
      <span className="highlighted-text"> Hyderabad, Telangana, India</span>.
    </p>
  </div>
</div>

{/* Contact Information */}
<div className="terms-info-box">
  <h2 className="terms-section-heading">
    <i className="fas fa-file-alt terms-heading-icon"></i> Contact Information
  </h2>
  <div className="terms-subsection">
    <p>
      For any questions or concerns relating to these Terms, please contact us via the contact information
      provided on the website.
    </p>
  </div>
</div>

{/* Last Updated */}
<div className="terms-updated-box">
  <span className="terms-updated-text">Last updated: 16 July 2025</span>
</div>

<Footer />
  </div>
);

export default TermsAndConditions;
