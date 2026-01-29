import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BlurText from './BlurText';
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
                        text="I started my UX design journey in 2019 at DIT University, where I completed my Bachelor's in Design with a specialization in UI/UX."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="about-blur-text"
                    />
                    <div style={{ height: '2rem' }}></div>
                    <BlurText
                        text="In 2024, I started my Master’s in User Experience Design at Lovely Professional University, and I am currently on track to complete the program in 2026."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="about-blur-text"
                    />
                    <div style={{ height: '2rem' }}></div>
                    <BlurText
                        text="Along this journey, I have also published a research paper, reflecting my dedication to combining academic insights with practical design."
                        delay={50}
                        animateBy="words"
                        direction="top"
                        className="about-blur-text"
                    />
                </div>
                <div className="about-visual reveal-text" style={{ transitionDelay: '0.3s' }}>
                    <div className="visual-frame">
                        <img src="/assets/sayak image 4.svg" alt="Sayak" className="about-image" loading="lazy" />
                    </div>
                </div>
            </div>

            <div className="container mobile-apps-header">
                <BlurText
                    text="Mobile Applications"
                    className="section-title"
                    delay={50}
                    animateBy="words"
                />
            </div>

            <div className="container about-projects">
                <Link to="/project/music" className="project-showcase" style={{ display: 'block' }}>
                    <img src="/assets/mobile app project3.svg" alt="Mobile App Project 3" className="showcase-image" loading="lazy" />
                </Link>
                <Link to="/project/banking" className="project-showcase" style={{ display: 'block' }}>
                    <img src="/assets/mobile_app_project1.svg" alt="Mobile App Project 1" className="showcase-image" loading="lazy" />
                </Link>

            </div>

            <div className="container mobile-apps-header">
                <BlurText
                    text="Website"
                    className="section-title"
                    delay={50}
                    animateBy="words"
                />
            </div>

            <div className="container about-projects">
                <Link to="/project/website1" className="project-showcase" style={{ display: 'block' }}>
                    <img src="/assets/website background 1.svg" alt="Govt Website Redesign" className="showcase-image" loading="lazy" />
                </Link>
                <Link to="/project/website2" className="project-showcase" style={{ display: 'block' }}>
                    <img src="/assets/website back solar.svg" alt="Website Project 2" className="showcase-image" loading="lazy" />
                </Link>

            </div>
        </section>
    );
};

export default About;
