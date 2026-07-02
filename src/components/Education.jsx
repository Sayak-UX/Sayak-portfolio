import React, { useState, useEffect, useRef } from 'react';
import BlurText from './BlurText';
import './Education.css';

const Education = () => {
    const [activeCard, setActiveCard] = useState(0); // Index of selected milestone
    const sectionRef = useRef(null);

    const educationData = [
        {
            year: '2024 – 2026',
            degree: 'M.Des — User Experience Design',
            institution: 'Lovely Professional University, Phagwara',
            grade: 'CGPA: 8.8 / 10',
            bullets: [
                'Focused on Advanced UX Research, Human-Computer Interaction (HCI), and Interaction Design methodologies.',
                'Specialized in building high-fidelity interactive prototypes and conducting qualitative user testing sprints.',
                'Published academic research paper: "Optimizing Solar Panel Performance Through User-Experienced Monitoring Interfaces" accepted at ICPOD 2025.'
            ]
        },
        {
            year: '2019 – 2023',
            degree: 'B.Des — User Experience Design',
            institution: 'DIT University, Dehradun',
            grade: 'CGPA: 7.9 / 10',
            bullets: [
                'Gained a deep foundation in Information Architecture, Persona Creation, and Double Diamond problem-solving frameworks.',
                'Developed comprehensive mobile and web UX audits, responsive wireframes, and design systems in Figma.',
                'Completed hands-on projects including Bookstore app and EV charging parking slot locator interfaces.'
            ]
        },
        {
            year: '2019',
            degree: 'Higher Secondary (WBCHSE)',
            institution: 'Bardhhaman C.M.S High School, West Bengal',
            grade: 'Science Stream',
            bullets: [
                'Discovered strong interest in visual art, color psychology, composition, and canvas painting.',
                'Built foundational sketching and spatial composition skills which later transitioned into digital interfaces.'
            ]
        }
    ];

    // Intersection observer for entry animations of the whole section
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

        if (sectionRef.current) {
            const elements = sectionRef.current.querySelectorAll('.reveal-text');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    const selectedEdu = educationData[activeCard];

    return (
        <section id="education" className="education-section section-padding" ref={sectionRef}>
            <div className="container education-container">
                <div className="education-header reveal-text">
                    <span className="education-eyebrow">Academic Background</span>
                    <h2 className="education-title">Education</h2>
                </div>

                <div className="education-grid">
                    {/* Left Column: Interactive Timeline List */}
                    <div className="education-timeline-list">
                        {educationData.map((edu, idx) => (
                            <button
                                key={idx}
                                className={`education-milestone-btn ${activeCard === idx ? 'active' : ''}`}
                                onClick={() => setActiveCard(idx)}
                                aria-current={activeCard === idx ? 'true' : 'false'}
                            >
                                <span className="milestone-node" />
                                <span className="milestone-year">{edu.year}</span>
                                <span className="milestone-degree">{edu.degree.split('—')[0].trim()}</span>
                                <span className="milestone-inst">{edu.institution.split(',')[0]}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Detailed Showcase Panel */}
                    <div className="education-showcase-panel">
                        <div className="showcase-card">
                            {/* Keying this block ensures it animations re-run when content changes */}
                            <div className="showcase-card-inner" key={activeCard}>
                                <span className="showcase-year">{selectedEdu.year}</span>
                                <h3 className="showcase-degree">{selectedEdu.degree}</h3>
                                <p className="showcase-inst">{selectedEdu.institution}</p>
                                <span className="showcase-grade-badge">{selectedEdu.grade}</span>

                                <div className="showcase-details-section">
                                    <h4 className="showcase-details-title">Key Focus & Accomplishments</h4>
                                    <ul className="showcase-bullets">
                                        {selectedEdu.bullets.map((bullet, bulletIdx) => (
                                            <li key={bulletIdx}>{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
