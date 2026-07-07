import React from 'react';
import './Banner.css';

const Banner = () => {
    return (
        <div className="banner-container">
            <a href="mailto:sayak.uxartisty@gmail.com" className="banner-content" style={{ textDecoration: 'none' }}>
                <img src="/assets/group_93.png" alt="Hire Me" className="stamp-button-img" />
            </a>
        </div>
    );
};

export default Banner;

