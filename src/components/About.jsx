import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            const elements = sectionRef.current.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about-section section-padding" ref={sectionRef}>
            <div className="container about-container reveal-on-scroll">
                {/* Glowing decorative background orb */}
                <div className="about-glow-orb"></div>

                <div className="about-visual">
                    <div className="profile-img-glow-wrapper">
                        <div className="profile-img-container">
                            <img src="/assets/sayak-profile.png" alt="Sayak" className="about-image" loading="lazy" />
                        </div>
                    </div>
                </div>
                
                <div className="about-text">
                    <span className="about-eyebrow">Creative Mindset</span>
                    <h2 className="about-title">Crafting interfaces with an artist's eye.</h2>
                    
                    <p className="about-description">
                        My creative journey started with <span className="highlight-accent">art and canvas painting</span>. Through colors, sketches, and visual storytelling, I developed a deep appreciation for design and human expression.
                    </p>
                    
                    <p className="about-description">
                        Over time, that passion evolved into <span className="highlight-clay">UI/UX design</span>, where I combine creativity, research, and problem-solving to craft meaningful digital experiences that are both intuitive and engaging.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
