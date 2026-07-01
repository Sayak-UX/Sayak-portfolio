import React, { useEffect, useRef } from 'react';
import BlurText from './BlurText';
import './About.css';

const About = () => {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);

    // Preload the camera mp3
    const shutterAudio = useRef(new Audio('/assets/kakaist-camera-shutter-314056.mp3'));

    const handleShutter = () => {
        const card = cardRef.current;
        if (!card) return;
        // 🔊 Play real camera mp3
        const audio = shutterAudio.current;
        audio.currentTime = 0;
        audio.play().catch(() => {});
        // 📸 Visual animation
        card.classList.remove('shutter-flash');
        void card.offsetWidth;
        card.classList.add('shutter-flash');
        setTimeout(() => card.classList.remove('shutter-flash'), 400);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            const elements = sectionRef.current.querySelectorAll('.about-visual');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about-section section-padding" ref={sectionRef}>
            <div className="container about-container">
                <div className="about-text">
                    <BlurText
                        text="My creative journey started with art and canvas painting. Through colors, sketches, and visual storytelling, I developed a deep appreciation for design and human expression."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="about-blur-text"
                    />
                    <div style={{ height: '2rem' }}></div>
                    <BlurText
                        text="Over time, that passion evolved into UI/UX design, where I combine creativity, research, and problem-solving to craft meaningful digital experiences that are both intuitive and engaging."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="about-blur-text"
                    />
                </div>
                <div className="about-visual reveal-text" style={{ transitionDelay: '0.3s' }}>
                    <div className="visual-frame">
                        <div className="profile-card" ref={cardRef} onClick={handleShutter}>
                            <div className="profile-img-wrap">
                                <img src="/assets/sayak image 4.svg" alt="Sayak" className="about-image" loading="lazy" />
                                <div className="profile-corner tl" />
                                <div className="profile-corner tr" />
                                <div className="profile-corner bl" />
                                <div className="profile-corner br" />
                            </div>
                            <div className="profile-label">
                                <span className="profile-name">Sayak Sarkar</span>
                                <span className="profile-role">UI / UX Designer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
