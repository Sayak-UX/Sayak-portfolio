import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AirIndiaProjectPage.css';
import PageLoader from './PageLoader';

const AirIndiaProjectPage = () => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (imgRef.current?.complete) {
            setImgLoaded(true);
        }
    }, []);

    return (
        <div className="air-india-project-page">
            <PageLoader title="Air India Redesign" category="Concept" forceLoaded={imgLoaded} />
            <Link to="/" className="back-button">
                ← Back to Home
            </Link>
            <div className="image-container">
                <img
                    ref={imgRef}
                    src="/assets/air India Main file.svg"
                    alt="Air India Redesign Project"
                    className="full-width-image"
                    onLoad={() => setImgLoaded(true)}
                    loading="eager"
                    decoding="async"
                />
            </div>
        </div>
    );
};

export default AirIndiaProjectPage;
