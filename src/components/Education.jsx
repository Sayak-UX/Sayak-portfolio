import React, { useEffect, useRef } from 'react';
import './Education.css';

const Education = () => {
    const sectionRef = useRef(null);

    const educationData = [
        {
            year: '2024 – 2026',
            degree: 'Master in User Experience Design',
            institution: 'Lovely Professional University, Phagwara'
        },
        {
            year: '2019 – 2023',
            degree: 'Bachelor in User Experience Design',
            institution: 'DIT University, Dehradun'
        }
    ];

    // Intersection observer for entry animations of the timeline items
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
            const elements = sectionRef.current.querySelectorAll('.education-item');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="education" className="education-section section-padding" ref={sectionRef}>
            <div className="container education-container">
                <div className="education-header">
                    <span className="education-eyebrow">Academic Background</span>
                    <h2 className="education-title">Education</h2>
                </div>

                <div className="education-timeline">
                    {educationData.map((edu, idx) => (
                        <div key={idx} className="education-item" style={{ transitionDelay: `${idx * 0.15}s` }}>
                            <div className="education-timeline-marker">
                                <span className="education-marker-node">
                                    <span className="education-marker-node-inner" />
                                </span>
                            </div>
                            <div className="education-content-block">
                                <span className="education-year">{edu.year}</span>
                                <h3 className="education-degree">{edu.degree}</h3>
                                <p className="education-inst">{edu.institution}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
