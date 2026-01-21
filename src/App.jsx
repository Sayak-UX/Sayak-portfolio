import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import './App.css';

const About = lazy(() => import('./components/About'));
const Works = lazy(() => import('./components/Works'));
const ArtLens = lazy(() => import('./components/ArtLens'));
const Journey = lazy(() => import('./components/Journey'));
const Collab = lazy(() => import('./components/Collab'));
const Footer = lazy(() => import('./components/Footer'));
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicProjectPage from './components/MusicProjectPage';
import BankingProjectPage from './components/BankingProjectPage';
import AirIndiaProjectPage from './components/AirIndiaProjectPage';
import WebsiteProject1Page from './components/WebsiteProject1Page';
import WebsiteProject2Page from './components/WebsiteProject2Page';

import PasswordProtection from './components/PasswordProtection';

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    const Home = () => (
        <>
            <Navbar />
            <Hero />
            <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
                <About />
                <Works />
                <ArtLens />
                <Journey />
                <Collab />
                <Footer />
            </Suspense>
        </>
    );

    return (
        <Router>
            <div className="App">
                <CustomCursor />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/music" element={
                        <PasswordProtection requiredPassword="Sayak1" projectId="music">
                            <MusicProjectPage />
                        </PasswordProtection>
                    } />
                    <Route path="/project/banking" element={
                        <PasswordProtection requiredPassword="Sayak2" projectId="banking">
                            <BankingProjectPage />
                        </PasswordProtection>
                    } />
                    <Route path="/project/air-india" element={
                        <PasswordProtection requiredPassword="Sayak3" projectId="airindia">
                            <AirIndiaProjectPage />
                        </PasswordProtection>
                    } />
                    <Route path="/project/website1" element={<WebsiteProject1Page />} />
                    <Route path="/project/website2" element={<WebsiteProject2Page />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
