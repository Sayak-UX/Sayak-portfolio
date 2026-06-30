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
const PageLoader = ({ title = 'Project', category = '', forceLoaded, delay = 4000, fileSize }) => {
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (loaded) return;

        if (forceLoaded === true) {
            setProgress(100);
            const timer = setTimeout(() => setLoaded(true), 400);
            return () => clearTimeout(timer);
        }
    }, [forceLoaded, loaded]);

    useEffect(() => {
        if (loaded) return;

        if (forceLoaded !== true && forceLoaded !== undefined) {
            const sizeMB = fileSize || 10;
            const totalDuration = Math.max(1500, sizeMB * 250); // total estimated time in ms
            const intervalTime = 50;
            const totalSteps = totalDuration / intervalTime;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const percentComplete = currentStep / totalSteps;
                // Cubic ease-out calculation to slow down near 99%
                const easedProgress = Math.min(99, Math.round(99 * (1 - Math.pow(1 - percentComplete, 3))));
                setProgress(easedProgress);

                if (currentStep >= totalSteps) {
                    clearInterval(timer);
                }
            }, intervalTime);

            return () => clearInterval(timer);
        }
    }, [fileSize, forceLoaded, loaded]);

    useEffect(() => {
        if (forceLoaded === undefined) {
            const totalDuration = delay;
            const intervalTime = 50;
            const totalSteps = totalDuration / intervalTime;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const percentComplete = currentStep / totalSteps;
                const easedProgress = Math.min(100, Math.round(100 * (1 - Math.pow(1 - percentComplete, 3))));
                setProgress(easedProgress);

                if (currentStep >= totalSteps) {
                    clearInterval(timer);
                    setTimeout(() => setLoaded(true), 200);
                }
            }, intervalTime);

            return () => clearInterval(timer);
        }
    }, [forceLoaded, delay]);

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
                <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="loader-percentage">{progress}%</p>
            {category && <p className="loader-category">{category}</p>}
            <p className="loader-notice">It's a design project, please wait to load...</p>
        </div>
    );
};

export default PageLoader;
