import React from 'react';
import Header from "../pages/Webpages/WebPageHeader";
import Footer from "../pages/Webpages/WebPageFooter";
import "../styles/TermsAndConditions.css";

function TermsAndConditions() {
  return (
    <>
      <Header />

      <div className="terms-container p-4">
        <h1 className="mb-4">Terms and Conditions</h1>
        <p>
          This document is an electronic record in terms of Information Technology Act, 2000 and rules
          thereunder as applicable and the amended provisions pertaining to electronic records in various
          statutes as amended by the Information Technology Act, 2000. This electronic record is generated
          by a computer system and does not require any physical or digital signatures.
        </p>
        <p>
          This document is published in accordance with the provisions of Rule 3 (1) of the Information
          Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and
          regulations, privacy policy and Terms of Use for access or usage of domain name https://www.thequickpayme.com/login
          ('Platform').
        </p>
        <p>
          The Platform is owned by NeoFin Nex India Private Limited, a company incorporated under the
          Companies Act, 1956 with its registered office at NeoFin Nex India Private Limited, FLAT NO 102, FIRST FLOOR,
          Sukiran Apartment, HYLAM COLONY, Near PJR statue, Venkatagiri, Hyderabad, India (hereinafter referred to as ‘Platform Owner’, 'we', 'us', 'our').
        </p>
        <p>
          Your use of the Platform and the services provided therein (“Services”) are governed by the following terms and
          conditions (“Terms of Use”) as applicable to the Platform including the applicable policies which
          are incorporated herein by way of reference. By using or transacting on the Platform, you agree to be bound
          by these Terms of Use.
        </p>
        <p>
          These Terms of Use can be modified at any time without prior notice. It is your responsibility to
          periodically review these Terms of Use to stay informed of updates.
        </p>
        <p>
          ACCESSING, BROWSING, OR USING THE PLATFORM INDICATES YOUR
          AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE.
          PLEASE READ THEM CAREFULLY BEFORE PROCEEDING.
        </p>

        <ul>
          <li>
            To access and use the Services, you agree to provide true, accurate, and complete information 
            during registration and while using the Platform, and you shall be responsible for all actions 
            taken under your account.
          </li>
          <li>
            You agree to maintain the confidentiality of your login credentials and notify us immediately 
            if you suspect any unauthorized use of your account.
          </li>
          <li>
            The Platform facilitates digital wallet loading, fund transfers, bill payments, and related financial transactions. 
            You acknowledge that all transactions initiated through the Platform are final and binding.
          </li>
          <li>
            We do not guarantee uninterrupted or error-free operation of the Platform or Services. 
            Transactions are subject to processing by third-party banks, payment networks, and billers, and
            delays or failures may occur.
          </li>
          <li>
            Refunds will be processed only in cases of verified technical or processing errors caused by us. 
            Disputes regarding transactions must be reported within 7 days from the transaction date.
            Refund requests unrelated to service errors may not be entertained.
          </li>
          <li>
            You agree to pay any applicable fees or charges related to the Services as displayed on the Platform. 
            All fees are subject to change and will be notified accordingly.
          </li>
          <li>
            You shall use the Platform and Services only for lawful purposes and shall not engage in any fraudulent 
            or illegal activity.
          </li>
          <li>
            The Platform may contain links to third-party websites or services. We are not responsible for the content, 
            terms, or privacy practices of such third parties.
          </li>
          <li>
            You agree to indemnify and hold harmless the Platform Owner, its affiliates, officers, and employees from any claims, 
            damages, or losses arising from your violation of these Terms or applicable laws.
          </li>
          <li>
            We shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability 
            to use the Platform or Services.
          </li>
          <li>
            In case of force majeure events such as natural disasters, government actions, or system failures beyond our control, 
            we may delay or suspend services without liability.
          </li>
          <li>
            These Terms and any dispute or claim arising out of or relating to them shall be governed by the laws of India.
          </li>
          <li>
            All disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana, India.
          </li>
          <li>
            For any questions or concerns relating to these Terms, please contact us via the contact information provided on the website.
          </li>
        </ul>
      </div>

      <Footer />
    </>
  );
}

export default TermsAndConditions;
