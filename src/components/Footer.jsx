import React from 'react';
import { FaLinkedin, FaInstagram, FaBehance } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-links">
                    <a href="https://www.linkedin.com/in/sayak-sarkar-9a1a671ba/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin /> LinkedIn
                    </a>
                    <a href="https://www.instagram.com/sayak_7heaven" target="_blank" rel="noopener noreferrer">
                        <FaInstagram /> Instagram
                    </a>
                    <a href="https://www.behance.net/sayaksarkar2" target="_blank" rel="noopener noreferrer">
                        <FaBehance /> Behance
                    </a>
                </div>
                <div className="footer-copyright">
                    <p>© All Copyright Reserved by Sayak</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
