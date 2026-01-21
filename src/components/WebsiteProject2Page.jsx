import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WebsiteProject2Page.css';

const WebsiteProject2Page = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="website-project2-page">
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    src="/assets/website project 2.svg"
                    alt="Website Project 2"
                    className="full-width-image"
                />
            </div>
        </div>
    );
};

export default WebsiteProject2Page;
