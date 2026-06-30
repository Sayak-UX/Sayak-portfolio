import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './WebsiteProject1Page.css';
import PageLoader from './PageLoader';

const WebsiteProject1Page = () => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (imgRef.current?.complete) {
            setImgLoaded(true);
        }
    }, []);

    return (
        <div className="website-project1-page">
            <PageLoader title="Website Project 1" category="Web Design" forceLoaded={imgLoaded} fileSize={8.2} number="04" />
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    ref={imgRef}
                    src="/assets/website project 1.svg"
                    alt="Website Project 1"
                    className="full-width-image"
                    onLoad={() => setImgLoaded(true)}
                    loading="eager"
                    decoding="async"
                />
            </div>
        </div>
    );
};

export default WebsiteProject1Page;
