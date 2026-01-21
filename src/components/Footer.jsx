import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container footer-container">
                <div className="footer-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn →</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">Twitter →</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">Dribbble →</a>
                    <a href="#" target="_blank" rel="noopener noreferrer">Behance →</a>
                </div>
                <div className="footer-copyright">
                    <p>© All Copyright Reserved by Sayak</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
