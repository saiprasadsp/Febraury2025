import React from 'react';
import Header from "../../pages/Webpages/WebPageHeader.js";
import Footer from "../../pages/Webpages/WebPageFooter.js";
import "../../styles/AboutUs.css";
import { FaUserTie, FaHandshake, FaClipboardCheck, FaUser, FaRegAddressCard, FaShieldAlt, FaLink, FaQrcode, FaMoneyBillWave, FaShareSquare, FaChartLine, FaBell, FaFileAlt, FaLock, FaMoneyCheckAlt, FaUniversity } from 'react-icons/fa';


const HowItWorks = () => {
  return (
    <div>
      <Header />
      <div className="aboutus-container">

        {/* HERO SECTION */}
        <section className="hero-section">
          <h1>Powerful Features for Retailers & Wholesalers</h1>
          <p>Each feature is designed to simplify payment collection, tracking, and utility management for your business.</p>
        </section>

        {/* STEP 1: Distributor-Led Onboarding */}
        <section className="section-block">
          <div className="text-image-wrap">
            <div className="text-content">
              <h2> Distributor-Led Onboarding</h2>
              <ul className="offer-list">
                <li><FaUserTie className="list-icon" /> Distributors handle account registration and setup</li>
                <li><FaHandshake className="list-icon" /> Assist with app installation and first login</li>
                <li><FaClipboardCheck className="list-icon" /> Help with KYC, business verification & documentation</li>
                <li><FaUser className="list-icon" /> Provide local support and training</li>
              </ul>
            </div>
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/DistributorLedOnboarding.png"
              alt="Distributor Onboarding"
              className="section-image"
            />
          </div>
        </section> 

        {/* STEP 2: Create Account & Complete KYC */}
        <section className="section-block responsive-reverse">
          <div className="text-image-wrap">
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/CompleteKYC.png"
              alt="KYC Process"
              className="section-image"
            />
            <div className="text-content push-right">
              <h2> Create Account & Complete KYC</h2>
              <ul className="offer-list">
                <li><FaUser className="list-icon" /> Register using your mobile number and OTP</li>
                <li><FaRegAddressCard className="list-icon" /> Fill in shop/business name and address</li>
                <li><FaShieldAlt className="list-icon" /> Upload KYC docs like Aadhaar or PAN</li>
                <li><FaClipboardCheck className="list-icon" /> Quick verification — start transacting</li>
              </ul>
            </div>
          </div>
        </section>


        {/* STEP 3: Start Accepting Payments */}
        <section className="section-block">
          <div className="text-image-wrap">
            <div className="text-content">
              <h2> Start Accepting Payments</h2>
              <ul className="offer-list">
                <li><FaLink className="list-icon" /> Generate payment links in the app</li>
                <li><FaQrcode className="list-icon" /> Show QR codes at your counter</li>
                <li><FaMoneyBillWave className="list-icon" /> Accept UPI, Debit/Credit Cards, Net Banking</li>
                <li><FaShareSquare className="list-icon" /> Send links via WhatsApp or SMS</li>
              </ul>
            </div>
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/StartAcceptingPayments.png"
              alt="Accept Payments"
              className="section-image"
            />
          </div>
        </section>


       {/* STEP 4: Track Collections */}
       <section className="section-block responsive-reverse">
          <div className="text-image-wrap">
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/TrackCollections.png"
              alt="Track Collections"
              className="section-image"
            />
            <div className="text-content push-right">
              <h2> Track Collections in Real-Time</h2>
              <ul className="offer-list">
                <li><FaChartLine className="list-icon" /> Live dashboard showing payments received</li>
                <li><FaBell className="list-icon" /> Instant payment alerts</li>
                <li><FaFileAlt className="list-icon" /> Export reports for bookkeeping</li>
                <li><FaLock className="list-icon" /> All transactions are securely logged</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Payment Tracking & Dashboard */}
        <section className="section-block">
          <div className="text-image-wrap">
            <div className="text-content">
              <h2>Use Balance for Payments & Bills</h2>
              <ul className="offer-list">
                <li><FaMoneyCheckAlt className="list-icon" /> Transfer funds to wholesalers instantly</li>
                <li><FaFileAlt className="list-icon" /> Pay electricity, broadband, DTH, and mobile bills</li>
                <li><FaBell className="list-icon" /> Set automatic reminders</li>
                <li><FaUniversity className="list-icon" /> Transfer to your bank anytime</li>
              </ul>
            </div>
            <img
              src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WebPageIcons/PaymentsBills.png"
              alt="Use Balance"
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

export default HowItWorks;
