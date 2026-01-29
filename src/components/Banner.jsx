import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className="banner-container">
            <a href="mailto:sayak.uxartisty@gmail.com" className="banner-content" style={{ textDecoration: 'none' }}>
                <span className="banner-text">OPEN FOR WORK</span>
                <div className="banner-animation"></div>
            </a>
        </div>
    );
};

export default Banner;
