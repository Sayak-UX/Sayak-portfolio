import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AirIndiaProjectPage.css';
import PageLoader from './PageLoader';

const AirIndiaProjectPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="air-india-project-page">
            <PageLoader title="Air India Redesign" category="Concept" />
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    src="/assets/air India Main file.svg"
                    alt="Air India Redesign Project"
                    className="full-width-image"
                />
            </div>
        </div>
    );
};

export default AirIndiaProjectPage;
