import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './BankingProjectPage.css';
import PageLoader from './PageLoader';

const BankingProjectPage = () => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (imgRef.current?.complete) {
            setImgLoaded(true);
        }
    }, []);

    return (
        <div className="banking-project-page">
            <PageLoader title="Mobile Bank App" category="UI Exploration" forceLoaded={imgLoaded} fileSize={35.5} />
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    ref={imgRef}
                    src="/assets/project_mobile_bank_app_bg.svg"
                    alt="Mobile Bank App Project"
                    className="full-width-image"
                    onLoad={() => setImgLoaded(true)}
                    loading="eager"
                    decoding="async"
                />
            </div>
        </div>
    );
};

export default BankingProjectPage;
