import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './WebsiteProject2Page.css';
import PageLoader from './PageLoader';

const WebsiteProject2Page = () => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (imgRef.current?.complete) {
            setImgLoaded(true);
        }
    }, []);

    return (
        <div className="website-project2-page">
            <PageLoader title="Website Project 2" category="Web Design" forceLoaded={imgLoaded} fileSize={79.3} />
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    ref={imgRef}
                    src="/assets/website_project_2_combined.svg"
                    alt="Website Project 2"
                    className="full-width-image"
                    onLoad={() => setImgLoaded(true)}
                    loading="eager"
                    decoding="async"
                />
            </div>
        </div>
    );
};

export default WebsiteProject2Page;
