import React, { useEffect, useRef } from 'react';
import './Education.css';

const Education = () => {
    const sectionRef = useRef(null);

    const educationData = [
        {
            year: '2024 – 2026',
            degree: 'Master of Design',
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
            degree: 'Bachelor of Design',
            institution: 'DIT University, Dehradun',
            grade: 'CGPA: 7.9 / 10',
            bullets: [
                'Gained a deep foundation in Information Architecture, Persona Creation, and Double Diamond problem-solving frameworks.',
                'Developed comprehensive mobile and web UX audits, responsive wireframes, and design systems in Figma.',
                'Completed hands-on projects including Bookstore app and EV charging parking slot locator interfaces.'
            ]
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
                                <span className="education-grade-badge">{edu.grade}</span>

                                <div className="education-bullets-section">
                                    <h4 className="education-bullets-title">Key Focus & Accomplishments</h4>
                                    <ul className="education-bullets-list">
                                        {edu.bullets.map((bullet, bulletIdx) => (
                                            <li key={bulletIdx} className="education-bullet-item">
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
