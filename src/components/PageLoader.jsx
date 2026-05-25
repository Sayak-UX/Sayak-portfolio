import React, { useState, useEffect } from 'react';
import './PageLoader.css';

/**
 * PageLoader — shows a branded full-screen loader on mount,
 * then fades out after `delay` ms (default 1400ms).
 *
 * Props:
 *   title    {string}  — project title shown as animated letters
 *   category {string}  — small label shown below the bar
 *   delay    {number}  — ms before the loader starts fading out
 */
const PageLoader = ({ title = 'Project', category = '', delay = 1400 }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    // Split title into individual letter <span>s for staggered animation
    const letters = title.split('').map((char, i) => (
        <span key={i} style={char === ' ' ? { display: 'inline-block', width: '0.4em' } : {}}>
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    return (
        <div className={`page-loader${loaded ? ' loaded' : ''}`} aria-hidden={loaded}>
            <div className="loader-wordmark">{letters}</div>
            <div className="loader-bar-wrap">
                <div className="loader-bar-fill" />
            </div>
            {category && <p className="loader-category">{category}</p>}
        </div>
    );
};

export default PageLoader;
