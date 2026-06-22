import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
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

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
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

                    <a href="/assets/Sayak Sarkar Resume25x1.pdf" download className="btn-download-cv">
                        Download CV
                    </a>

                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
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
