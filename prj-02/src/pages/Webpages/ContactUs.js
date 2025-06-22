import React from 'react';
import '../../styles/ContactUs.css';  // (New isolated css file)
import contactImage from '../../assets/WebPage/Contactus.png';

const ContactUs = () => {
  return (
    <div className="contact-page-container">
      <h1 className="contact-page-title">Get in touch</h1>
      <p className="contact-page-subtitle">
        Reach out, and let's create a universe of possibilities together!
      </p>

      <div className="contact-page-box">
        <div className="contact-page-form-section">
          <h2>Let's connect</h2>
          <p>
            Let's align our payments! Reach out and let the magic of collaboration illuminate our money.
          </p>
          <form>
            <div className="contact-page-input-row">
              <input type="text" placeholder="Last Name" />
              <input type="text" placeholder="First Name" />
            </div>
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Message"></textarea>
            <button className="contact-page-submit-button">Send it to the moon</button>
          </form>
        </div>

        <div className="contact-page-image-section">
          <img src={contactImage} alt="Contact Us" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
