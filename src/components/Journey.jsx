import React, { useEffect, useRef } from 'react';
import BlurText from './BlurText';
import './Journey.css';

const Journey = () => {
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
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            const elements = sectionRef.current.querySelectorAll('.journey-item');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="journey" className="journey-section section-padding" ref={sectionRef}>
            <div className="container">
                <div className="section-title-wrapper">
                    <BlurText
                        text="My Professional Journey"
                        className="section-title"
                        delay={50}
                        animateBy="words"
                    />
                </div>

                <div className="journey-timeline">
                    <div className="journey-item" style={{ transitionDelay: '0.2s' }}>
                        <div className="journey-year">
                            <BlurText text="Internship" delay={30} className="journey-year-text" />
                        </div>
                        <div className="journey-content">
                            <h3>
                                <BlurText text="Apka Kisan Agrotech Pvt. Ltd." delay={30} className="journey-title-text" />
                            </h3>
                            <div className="journey-desc">
                                <BlurText
                                    text="I completed my internship at Apka Kisan Agrotech Pvt. Ltd., where I gained hands-on experience in UI/UX design while addressing real-world challenges."
                                    delay={20}
                                    className="journey-p-text"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="journey-item" style={{ transitionDelay: '0.4s' }}>
                        <div className="journey-year">
                            <BlurText text="Growth" delay={30} className="journey-year-text" />
                        </div>
                        <div className="journey-content">
                            <h3>
                                <BlurText text="Skill Enhancement" delay={30} className="journey-title-text" />
                            </h3>
                            <div className="journey-desc">
                                <BlurText
                                    text="From analysing the website to developing packaging concepts, I enhanced my creative and analytical skills."
                                    delay={20}
                                    className="journey-p-text"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="journey-item" style={{ transitionDelay: '0.6s' }}>
                        <div className="journey-year">
                            <BlurText text="Future" delay={30} className="journey-year-text" />
                        </div>
                        <div className="journey-content">
                            <h3>
                                <BlurText text="User-Centred Focus" delay={30} className="journey-title-text" />
                            </h3>
                            <div className="journey-desc">
                                <BlurText
                                    text="This experience deepened my passion for user-centred design and prepared me for future professional opportunities."
                                    delay={20}
                                    className="journey-p-text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
