import React from "react";
// import "../styles/PrivacyPolicy.css";
import Header from "../pages/Webpages/WebPageHeader.js";
import Footer from "../pages/Webpages/WebPageFooter.js";

const PrivacyPolicy = () => (
  <div>
    <Header />

    {/* Hero Section */}
    <div className="terms-hero-banner">
      <h1 className="terms-hero-title">
        <i className="fas fa-user-secret" style={{ marginRight: "10px" }}></i>
        Privacy Policy
      </h1>
      <p className="terms-hero-subtitle">
        Your trust matters. We’re committed to protecting your privacy and data.
      </p>
    </div>

    {/* Main Content */}
    <div className="terms-wrapper">
      <div className="terms-bordered-box">

        <div className="terms-point-box">
          <strong>Introduction</strong>
          <p>
            This Privacy Policy describes how NeoFin Nex India Private Limited and its affiliates (collectively "we", "our", "us") collect, use, share, protect or otherwise process your information through our website{" "}
            <a href="https://www.thequickpayme.com/login" target="_blank" rel="noopener noreferrer">
              https://www.thequickpayme.com/login
            </a>{" "}
            ("Platform").
          </p>
          <p>
            Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information, or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use, and applicable service/product terms, and agree to be governed by the laws of India including but not limited to laws applicable to data protection and privacy. If you do not agree, please do not use or access our Platform.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Collection</strong>
          <p>
            We collect your personal data when you use our Platform, services, or otherwise interact with us during our relationship. This includes, but is not limited to, personal data such as name, date of birth, address, contact number, email, identity/address proof, bank account details, card information, biometric details, etc., as per applicable laws. You may choose not to provide certain data, but this may limit your access to specific services or features.
          </p>
          <p>
            We may also track your behavior and preferences on our Platform. This information is compiled and analyzed on an aggregate basis. We collect transaction-related data from you and from third-party partners. In such cases, their privacy policy will apply. We are not responsible for third-party privacy practices. Beware of fraudulent calls or emails seeking your private data—report such attempts immediately.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Usage</strong>
          <p>
            We use personal data to provide and improve services, assist sellers/partners, resolve disputes, troubleshoot issues, send updates, prevent fraud, conduct research, and enforce terms. Your access to some products/services may be limited if you don’t grant certain permissions.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Sharing</strong>
          <p>
            We may share your data within our group companies and affiliates for access to their services. We may disclose your data to partners like logistics, payment providers, reward programs, etc., to fulfill services. This may also be done to meet legal obligations or protect rights and safety. Data may be disclosed to government or enforcement authorities when required by law or legal process.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Security Precautions</strong>
          <p>
            We adopt reasonable security measures to prevent unauthorized access, loss, or misuse of your data. While we ensure secure server use and follow guidelines, data transmission over the internet is inherently risky. Users are advised to secure their login credentials.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Data Deletion and Retention</strong>
          <p>
            You can delete your account via your profile/settings or by contacting us. If there are pending claims, grievances, or services, deletion may be delayed or denied. Once deleted, all account data is lost. We retain data as needed by law or for fraud prevention and analysis in anonymized form.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Your Rights</strong>
          <p>
            You may access, update, or correct your data directly via the Platform.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Consent</strong>
          <p>
            By using the Platform or sharing data, you consent to the terms of this Privacy Policy. If sharing others’ data, you confirm you have their consent. You may be contacted via SMS, email, or call for service purposes. You can withdraw your consent by contacting the Grievance Officer with the subject “Withdrawal of consent for processing personal data.” Withdrawal is not retrospective and may affect service availability.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Changes to this Privacy Policy</strong>
          <p>
            Check this policy periodically for updates. We may revise it based on changes in information practices and notify you as per legal requirements.
          </p>
        </div>

        <div className="terms-point-box">
          <strong>Contact</strong>
          <p>
            If you have any questions or concerns, please contact our support team through the contact details provided on our website.
          </p>
        </div>

      </div>
    </div>

    <Footer />
  </div>
);

export default PrivacyPolicy;
