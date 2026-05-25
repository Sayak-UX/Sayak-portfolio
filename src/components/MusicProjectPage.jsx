import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MusicProjectPage.css';
import PageLoader from './PageLoader';

const MusicProjectPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="music-project-page">
            <PageLoader title="Music Application" category="Case Study" />
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    src="/assets/music application project (1).svg"
                    alt="Music Application Project"
                    className="full-width-image"
                />
            </div>
        </div>
    );
};

export default MusicProjectPage;
