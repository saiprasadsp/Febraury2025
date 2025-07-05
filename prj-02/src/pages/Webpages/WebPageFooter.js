import React from 'react';
import '../../styles/WebpageFooter.css';
import footerBg from '../../assets/WebPage/Footer.png';

const WebpageFooter = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="webpage-footer">
            <img src={footerBg} alt="Footer Background" className="webpage-footer-background" />

            <div className="webpage-footer-content updated-footer-layout">
                {/* Quick Links */}
                <div className="footer-section">
                    <h5 className="webpage-footer-heading">Quick Links</h5>
                    <p><a href="/" className="footer-link">Home</a></p>
                    <p><a href="/aboutus" className="footer-link">About Us</a></p>
                    <p><a href="/how-it-works" className="footer-link">How it works</a></p>
                    <p><a href="/features" className="footer-link">Features</a></p>
                    <p><a href="/contactus" className="footer-link">Contact Us</a></p>
                </div>

                {/* Legal */}
                <div className="footer-section">
                    <h5 className="webpage-footer-heading">Legal</h5>
                    <p><a href="/terms" className="footer-link">Terms & Conditions</a></p>
                    <p><a href="/privacypolicy" className="footer-link">Privacy Policy</a></p>
                    <p><a href="/refundpolicy" className="footer-link">Refund Policy</a></p>
                </div>

                {/* Location */}
                <div className="footer-section">
                    <h5 className="webpage-footer-heading">Location</h5>
                    <p className="webpage-footer-address">NEOFIN NEX INDIA PRIVATE LIMITED</p>
                    <p className="webpage-footer-address">8-2-21/A/2, FLAT NO 101, SRINAGAR COLONY Main Road,</p>
                    <p className="webpage-footer-address">I.M.Colony, Khairatabad, Hyderabad - 500082</p>
                    <p className="webpage-footer-contact">+91 8143 900 450</p>
                    <p className="webpage-footer-contact">hello@neofinnex.com</p>
                </div>
            </div>

            {/* Bottom Section: Social & Copyright */}
            <div className="webpage-footer-bottom centered-footer-bottom">
                <div className="webpage-footer-social-icons">
                    <div className="webpage-footer-icon"><i className="fab fa-linkedin-in"></i></div>
                    <div className="webpage-footer-icon"><i className="fab fa-facebook-f"></i></div>
                    <div className="webpage-footer-icon"><i className="fab fa-youtube"></i></div>
                    <div className="webpage-footer-icon"><i className="fab fa-instagram"></i></div>
                </div>

                <p className="webpage-footer-copyright">
                    © {new Date().getFullYear()} Neofin Nex India Private Limited. All rights reserved.
                </p>

                <div className="webpage-footer-scroll-top" onClick={scrollToTop}>
                    <i className="fas fa-arrow-up"></i>
                </div>
            </div>



        </div>
    );
};

export default WebpageFooter;
