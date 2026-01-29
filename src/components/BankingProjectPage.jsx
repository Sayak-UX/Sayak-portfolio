import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BankingProjectPage.css';

const BankingProjectPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="banking-project-page">
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    src="/assets/combined_mobile_app.svg"
                    alt="Mobile Bank App Project"
                    className="full-width-image"
                />
            </div>
        </div>
    );
};

export default BankingProjectPage;
