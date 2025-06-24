import React from 'react';
import '../../styles/WebpageFooter.css';
import footerBg from '../../assets/WebPage/Footer.png';

const WebpageFooter = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="webpage-footer">
            <img src={footerBg} alt="Footer Background" className="webpage-footer-background" />

            <div className="webpage-footer-content">
                <div className="webpage-footer-left">
                    <h5 className="webpage-footer-heading">
                        <a href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Terms and Conditions
                        </a>
                    </h5>
                    <h5 className="webpage-footer-heading"><a href="/privacypolicy" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Privacy Policy
                    </a></h5>
                    <h5 className="webpage-footer-heading">
                    <a href="/refundpolicy" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Refund Policy
                        </a> 
                        </h5>
                    <h5 className="webpage-footer-heading">
                    <a href="/contactus" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Contact Us
                        </a> 
                        
                       </h5>
                </div>

                <div className="webpage-footer-right">
                    <div>
                        <h4 className="webpage-footer-heading">Location</h4>
                        <p className="webpage-footer-address">NEOFIN NEX INDIA PRIVATE LIMITED</p>
                        <p className="webpage-footer-address">8-2-21/A/2 ,FLAT NO 101, SRINAGAR COLONY Main Road,</p>
                        <p className="webpage-footer-address">I.M.Colony Khairatabad,</p>
                        <p className="webpage-footer-address">Hyderabad- 500082</p>
                    </div>

                    <div>
                        <h4 className="webpage-footer-heading">Contact Us</h4>
                        <p className="webpage-footer-contact">+91 8143 900 450</p>
                        <p className="webpage-footer-contact">hello@neofinnex.com</p>
                    </div>
                </div>
            </div>

            <div className="webpage-footer-bottom">
                <div className="webpage-footer-social-icons">
                    <div className="webpage-footer-icon"><i className="fab fa-linkedin-in"></i></div>
                    <div className="webpage-footer-icon"><i className="fab fa-facebook-f"></i></div>
                    <div className="webpage-footer-icon"><i className="fab fa-youtube"></i></div>
                    <div className="webpage-footer-icon"><i className="fab fa-instagram"></i></div>
                </div>

                <p className="webpage-footer-copyright">
                    Copyright © {new Date().getFullYear()}, Neofin Nex India Private Limited. All Rights Reserved.
                </p>

                <div className="webpage-footer-scroll-top" onClick={scrollToTop}>
                    {/* Changed this line */}
                    <i className="fas fa-arrow-up"></i>
                </div>
            </div>
        </div>
    );
};

export default WebpageFooter;