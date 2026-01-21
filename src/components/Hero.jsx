import React, { useEffect, useRef, useState } from 'react';
import Plasma from './Plasma';
import './Hero.css';

const Typewriter = ({ text, speed = 100, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started]);

    return (
        <span className="typewriter">
            {displayedText}
            <span className="cursor-blink">|</span>
        </span>
    );
};

const Hero = () => {
    const titleRef = useRef(null);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(currentTheme);
        };

        updateTheme();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateTheme();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (titleRef.current) {
            const elements = titleRef.current.querySelectorAll('.reveal-text');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const shape = document.querySelector('.abstract-shape');
            if (shape) {
                shape.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-content container" ref={titleRef}>
                <h2 className="hero-subtitle reveal-text" style={{ transitionDelay: '0.1s' }}>From Canvas to Interfaces</h2>
                <h1 className="hero-title reveal-text" style={{ transitionDelay: '0.3s' }}>
                    I Am <span className="block-name">Sayak</span> Here
                </h1>
                <p className="hero-role reveal-text" style={{ transitionDelay: '0.5s', color: '#e052a0', fontWeight: '500' }}>
                    <Typewriter text="UI/UX Designer and Researcher" delay={800} speed={50} />
                </p>
            </div>
            <div className="hero-background">
                <Plasma
                    color={theme === 'dark' ? "#ff6b35" : "#87CEEB"}
                    speed={0.6}
                    direction="forward"
                    scale={1.1}
                    opacity={0.8}
                    mouseInteractive={true}
                />
                {/* Abstract artistic background element */}
                <div className="abstract-shape"></div>
            </div>
        </section>
    );
};

export default Hero;
