import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from '@studio-freight/lenis';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import './App.css';
import ChatButton from './components/ChatButton';
import MusicPlayer from './components/MusicPlayer';
import useSoundEffects from './components/useSoundEffects';
import { SpeedInsights } from '@vercel/speed-insights/react';
const About = lazy(() => import('./components/About'));
const Education = lazy(() => import('./components/Education'));
const Works = lazy(() => import('./components/Works'));
const ArtLens = lazy(() => import('./components/ArtLens'));
const Journey = lazy(() => import('./components/Journey'));
const Tools = lazy(() => import('./components/Tools'));
const Collab = lazy(() => import('./components/Collab'));
const Footer = lazy(() => import('./components/Footer'));

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BankingProjectPage from './components/BankingProjectPage';
import AirIndiaProjectPage from './components/AirIndiaProjectPage';
import WebsiteProject1Page from './components/WebsiteProject1Page';
import WebsiteProject2Page from './components/WebsiteProject2Page';
import ResearchSeminarProjectPage from './components/ResearchSeminarProjectPage';

function App() {
    useSoundEffects();
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


    return (
        <Router>
            <div className="App">
                <ChatButton />
                <MusicPlayer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/banking" element={<BankingProjectPage />} />
                    <Route path="/project/air-india" element={<AirIndiaProjectPage />} />
                    <Route path="/project/website1" element={<WebsiteProject1Page />} />
                    <Route path="/project/website2" element={<WebsiteProject2Page />} />
                    <Route path="/project/research-seminar" element={<ResearchSeminarProjectPage />} />

                </Routes>
                <SpeedInsights />
            </div>
        </Router>
    );
}

const Home = () => (
    <>
        <Navbar />
        <Hero />
        <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
            <About />
            <Education />
            <Works />
            <Tools />
            <Journey />
            <ArtLens />
            <Collab />
            <Footer />
        </Suspense>
    </>
);

export default App;
