import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Theme initialization
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = (event) => {
        const isTransitionSupported = document.startViewTransition && 
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!isTransitionSupported || !event) {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            return;
        }

        const x = event.clientX;
        const y = event.clientY;

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            const newTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`
                    ]
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        });
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();
    const location = useLocation();

    // After navigating home, scroll to the pending section (stored in sessionStorage)
    useEffect(() => {
        if (location.pathname === '/') {
            const pending = sessionStorage.getItem('scrollTo');
            if (pending) {
                sessionStorage.removeItem('scrollTo');
                setTimeout(() => {
                    const element = document.getElementById(pending);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const scrollToSection = (id) => {
        setMenuOpen(false);
        if (location.pathname === '/') {
            // Already on home — just scroll
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // On a sub-route — navigate home first, then scroll
            sessionStorage.setItem('scrollTo', id);
            navigate('/');
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="container navbar-container">
                <div className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/assets/logo.svg" alt="Sayak" />
                </div>

                <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    <button onClick={() => scrollToSection('about')}>About</button>
                    <button onClick={() => scrollToSection('work')}>My works</button>

                    <a href="/assets/Sayak Sarkar CV3.pdf" download className="btn-download-cv">
                        Resume
                    </a>

                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        <svg className="theme-paint-bucket" viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <g className="bucket-group">
                                {/* Bucket handle */}
                                <path className="bucket-handle" d="M19 9A7 7 0 0 0 5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                                {/* Paint inside bucket */}
                                <path className="bucket-paint" d="M6 10.5c1.5-0.5 3.5 0.5 5 0s3.5-0.5 5 0l0.5 3.5H7.5l-1.5-3.5z" stroke="none" fill="var(--paint-color)" />
                                {/* Bucket body */}
                                <path className="bucket-body" d="M5 9l2 9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l2-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
                                {/* Bucket lip */}
                                <ellipse className="bucket-lip" cx="12" cy="9" rx="7" ry="1.5" stroke="currentColor" strokeWidth="2" fill="none" />
                            </g>
                            {/* Droplet outside the rotated group */}
                            <path className="bucket-drop" d="M19.5 14c0 0.8-.6 1.5-1.5 1.5s-1.5-.7-1.5-1.9c0-1.2 1.5-3.4 1.5-3.4s1.5 2.2 1.5 3.8z" stroke="none" fill="var(--paint-color)" />
                        </svg>
                    </button>
                </div>

                <div className="navbar-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
