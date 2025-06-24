import React from 'react';
import Header from "../../pages/Webpages/WebPageHeader.js";
import Footer from "../../pages/Webpages/WebPageFooter.js";
import landingpage from "../../assets/WebPage/Landingpage.png";
// import "../../styles/HomePage.css";  
function HomePage() {
  return (
    <div>
      <Header />  
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

      <Footer />  {/* ✅ Footer included */}
    </div>
  );
}

export default HomePage;
