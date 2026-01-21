import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WebsiteProject1Page.css';

const WebsiteProject1Page = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="website-project1-page">
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    src="/assets/website project 1.svg"
                    alt="Website Project 1"
                    className="full-width-image"
                />
            </div>
        </div>
    );
};

export default WebsiteProject1Page;
