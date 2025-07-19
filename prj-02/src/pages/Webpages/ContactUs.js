import React from 'react';
import Header from "../../pages/Webpages/WebPageHeader.js";
import Footer from "../../pages/Webpages/WebPageFooter.js";
import '../../styles/ContactUs.css';  
import contactImage from '../../assets/WebPage/Contactus.png';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const ContactUs = () => {
  return (
    <div>
      <Header />

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

        <div className="contact-info-grid">
  <div className="contact-info-item">
    <EnvironmentOutlined style={{ fontSize: '28px', color: '#1F6281' }} />
    <h3 className="contact-title-red">Address</h3>
    <p className="contact-highlight">
      <strong>
        FLAT NO 101, SRINAGAR COLONY Main Road,<br />
        I.M.Colony, Khairatabad,<br />
        Hyderabad - 500082
      </strong>
    </p>
  </div>

  <div className="contact-info-item">
    <MailOutlined style={{ fontSize: '28px', color: '#1F6281' }} />
    <h3 className="contact-title-red">Mail Us</h3>
    <p className="contact-highlight"><strong>support@neofinnex.com</strong></p>
  </div>

  <div className="contact-info-item">
    <PhoneOutlined style={{ fontSize: '28px', color: '#1F6281' }} />
    <h3 className="contact-title-red">Telephone</h3>
    <p className="contact-highlight"><strong>+91 8143 900 450</strong></p>
  </div>
</div>


       <div className="contact-map">
  <iframe
    title="NeoFin Nex India Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8862193557446!2d78.41411607600805!3d17.43541700105388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9116c337ff19%3A0xb1162461282f7217!2sNeoFin%20Nex%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1721383303904!5m2!1sen!2sin"
    width="100%"
    height="300"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
