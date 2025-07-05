import React from 'react';
import Header from "../pages/Webpages/WebPageHeader";
import Footer from "../pages/Webpages/WebPageFooter";
import "../styles/TermsAndConditions.css";

function RefundPolicy() {
  return (
    <>
      <Header />

      <div className="terms-container p-4">
        <h1 className="mb-4">Refund Policy</h1>
        <p>
          <strong>NeoFin Nex India Private Limited</strong> provides digital financial services including wallet top-ups,
          bill payments, and fund transfers. We aim to ensure all transactions are processed accurately and securely.
        </p>

        <p>Refunds are applicable only under the following circumstances:</p>

        <ul className="list-disc list-inside space-y-1">
          <li>Money was deducted from your account, but the transaction failed.</li>
          <li>Duplicate transactions due to technical error.</li>
          <li>Amount was debited, but the service (e.g., bill payment or bank transfer) was not fulfilled.</li>
          <li>Unauthorized transactions reported within 24 hours.</li>
        </ul>

        <p>
          To initiate a refund, users must report the issue within <strong>7 days</strong> of the transaction date
          by contacting our support team through the platform or email. Please provide the transaction ID,
          date, and a brief description of the issue.
        </p>

        <p>
          After internal verification, if the refund is approved, it will be processed within
          <strong> 3–5 business days</strong>. Refunds will be credited to the original payment method or wallet as applicable.
        </p>

        <p>
          No refunds will be provided in cases where the service was successfully delivered or if the delay/failure occurred
          due to incorrect information provided by the user (e.g., wrong account number, wrong bill details).
        </p>

        <p className="mt-10 text-sm text-gray-500">
          For assistance or queries, please contact our customer support through the official contact details listed on our website.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default RefundPolicy;
