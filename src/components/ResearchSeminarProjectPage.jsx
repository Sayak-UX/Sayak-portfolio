import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ResearchSeminarProjectPage.css';
import PageLoader from './PageLoader';

const ResearchSeminarProjectPage = () => {
    // Reset scroll when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="research-seminar-project-page meridian-page-theme">
            <PageLoader title="Research Seminar" category="AI & UX Case Study" forceLoaded={true} number="03" />

            {/* Main Wrapper */}
            <div className="meridian-container">
                
                {/* Back Button */}
                <div className="back-nav">
                    <Link to="/" className="back-link">
                        ← Back
                    </Link>
                </div>

                {/* Hero Showcase Hero */}
                <header className="meridian-hero">
                    <span className="meridian-eyebrow">Case Study</span>
                    <h1 className="meridian-title">Adaptive Traffic AI</h1>
                    <p className="meridian-subtitle">
                        Co-designing an explainable AI-driven dashboard and real-time commuter framework for intelligent urban mobility.
                    </p>
                    <div style={{ marginTop: '20px' }}>
                        <a 
                            href="https://smartflow-traffic-ai.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)',
                                color: '#3b82f6',
                                textDecoration: 'none',
                                borderRadius: '30px',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                border: '1.5px solid rgba(59, 130, 246, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.2) 100%)';
                                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.8)';
                                e.currentTarget.style.boxShadow = '0 6px 24px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)';
                                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)';
                                e.currentTarget.style.transform = 'none';
                            }}
                        >
                            Launch Live Platform App 🚦
                        </a>
                    </div>
                </header>

                {/* Challenge Section (The Problem) */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Challenge</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Bridging the trust gap in autonomous city infrastructure</h2>
                            <p className="meridian-body">
                                Urban congestion is skyrocketing, rendering static timer-based intersections highly inefficient. While AI-driven adaptive signals can optimize flow dynamically, a primary roadblock remains: <strong>the trust gap</strong>.
                            </p>
                            <p className="meridian-body">
                                Traffic control room operators routinely override automated AI schedules because they cannot understand or interpret the system's reasoning during peak jams. There is a critical need to design explainable models that build trust and collaboration between autonomous systems and human operators.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Problem Statement Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Problem Statement</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Defining the core disconnect in intelligent mobility</h2>
                            <p className="meridian-body">
                                Urban commuters face unpredictable delays due to outdated, timer-based signal patterns that do not adapt to real-time traffic volumes. At the same time, transit control operators lack transparency into why modern adaptive AI routing makes specific decisions, causing them to override automated flows. The goal is to design an explainable AI scheduling interface and real-time guidance system that aligns system autonomy with human trust.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Design Thinking Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Design Thinking</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">An empathetic, iterative approach to system controls</h2>
                            <p className="meridian-body">
                                We structured our design process around the double-diamond model: Empathize, Define, Ideate, Prototype, and Test. By immersing ourselves in the environment of traffic control operator centers, we identified critical friction points where human operators felt alienated by black-box automation algorithms.
                            </p>
                        </div>
                    </div>
                </section>

                {/* User Scenario / User Persona Empathy Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">User Persona & Empathy</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Understanding our primary operators and daily commuters</h2>
                            <p className="meridian-body">
                                <strong>Operator Persona: Sarah, Traffic Controller</strong>
                                <br />
                                Sarah needs a clear explanation for signal phase adjustments during high-congestion periods. She feels anxious when the AI changes patterns without explanation, leading her to override the system. Her main goal is reducing congestion safely while maintaining oversight.
                            </p>
                            <p className="meridian-body">
                                <strong>Commuter Persona: David, Daily Driver</strong>
                                <br />
                                David seeks predictable, stress-free route guidance to work. He feels frustrated by stop-and-go patterns. David wants to know the optimal speed to maintain to catch green lights consistently.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Customer Journey Map Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Customer Journey Map</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Mapping the operator experience through traffic disruptions</h2>
                            <p className="meridian-body">
                                We mapped the operator journey from the moment congestion begins to build:
                                <br />
                                1. <strong>Awareness:</strong> Operator notices queue build-up on CCTV. Feel: Attentive.
                                <br />
                                2. <strong>AI Action:</strong> Adaptive system shifts signal duration. Feel: Curious/Skeptical.
                                <br />
                                3. <strong>Explanation:</strong> Operator reviews XAI logs explaining the reasoning ("Congestion detected on NS Lane"). Feel: Reassured/Informed.
                                <br />
                                4. <strong>Collaboration:</strong> Operator allows autonomous execution or adjusts flow parameters rather than manually overriding. Feel: Confident.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Information Architecture Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Information Architecture</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Structuring high-density, real-time data flows</h2>
                            <p className="meridian-body">
                                The information architecture was designed to prioritize scannability under high-stress conditions:
                                <br />
                                - <strong>Primary View:</strong> Interactive spatial layout of intersections with live status.
                                <br />
                                - <strong>Secondary View:</strong> XAI explanation log showing natural language justifications.
                                <br />
                                - <strong>Tertiary View:</strong> High-level system performance KPIs (e.g., delay reduction, carbon footprint, vehicle throughput).
                            </p>
                        </div>
                    </div>
                </section>

                {/* Design System Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Design System</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Creating an atomic design library for dark-mode dashboards</h2>
                            <p className="meridian-body">
                                To support quick recognition under varying lighting conditions, we engineered a dark-mode first design system:
                                <br />
                                - <strong>Color Palette:</strong> Slate gray bases with high-contrast indicator accents (Adaptive Blue, Green Wave, and Alert Red).
                                <br />
                                - <strong>Typography:</strong> Inter and clean sans-serif families optimized for legibility at small sizes on industrial displays.
                                <br />
                                - <strong>Components:</strong> Modular cards, status badges, real-time chart elements, and interactive control toggles.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Prototyping Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Prototyping</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">From low-fidelity wireframes to interactive simulators</h2>
                            <p className="meridian-body">
                                The design progressed from paper sketches to medium-fidelity interactive Figma wireframes. Finally, we built a fully-functional high-fidelity React prototype to validate real-time interaction patterns, dynamic feedback loops, and visual hierarchy under live conditions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Process</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Co-designing explainable AI dashboards & adaptive signal systems</h2>
                            <p className="meridian-body">
                                We approached this by designing a dual framework: a real-time <strong>Explainable AI (XAI) Operator Dashboard</strong> and a companion <strong>Commuter Green Wave Application</strong>. By providing visual queue indicators and dynamic explanation logs, we give operators the exact context needed to support autonomous scheduling decisions.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Application Showcase Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Application</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Empowering commuters with real-time green wave routing</h2>
                            <p className="meridian-body">
                                The accompanying commuter application interfaces directly with the smart grid's predictive engines. By analyzing upcoming signals, the app guides drivers to maintain exact speed limits, unlocking a "green wave" that eliminates bumper-to-bumper stops and optimizes fuel efficiency.
                            </p>


                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="meridian-section border-top">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Results</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2">Measurable urban optimization outcomes</h2>
                            <p className="meridian-body">
                                The co-designed interfaces were tested across simulated urban environments. The inclusion of explainable decision structures resulted in significant efficiency gains and solidified trust.
                            </p>

                            {/* Stats Columns Grid */}
                            <div className="stats-grid-row">
                                <div className="stat-column">
                                    <span className="stat-value">-35%</span>
                                    <span className="stat-label">Average Delay</span>
                                </div>
                                <div className="stat-column">
                                    <span className="stat-value">87%</span>
                                    <span className="stat-label">Green Wave Precision</span>
                                </div>
                                <div className="stat-column">
                                    <span className="stat-value">+45%</span>
                                    <span className="stat-label">Operator Trust Index</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="meridian-section border-top contact-section">
                    <div className="meridian-section-grid">
                        <div className="meridian-section-label">
                            <span className="meridian-eyebrow">Work together</span>
                        </div>
                        <div className="meridian-section-content">
                            <h2 className="meridian-h2 contact-h2">Are you ready to take the next step?</h2>
                            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group-row">
                                    <div className="form-field">
                                        <label htmlFor="name">Your name</label>
                                        <input type="text" id="name" placeholder="Name" required />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email">Your email</label>
                                        <input type="email" id="email" placeholder="Email" required />
                                    </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="message">How can I help you?</label>
                                    <textarea id="message" rows="4" placeholder="Description" required></textarea>
                                </div>
                                <button type="submit" className="form-submit-btn">Send message</button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Footer brand callout */}
                <footer className="meridian-footer border-top">
                    <div className="footer-top-row">
                        <h2 className="footer-logo">Let's build a smarter future together.</h2>
                    </div>
                    <div className="footer-bottom-row">
                        <div className="footer-social-links">
                            <a href="https://www.linkedin.com/in/sayak-sarkar-9a1a671ba/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://www.instagram.com/sayak_7heaven" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://www.behance.net/sayaksarkar2" target="_blank" rel="noopener noreferrer">Behance</a>
                        </div>
                        <div className="footer-copyright">
                            <span>© 2026 Sayak Sarkar. All rights reserved.</span>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
};

export default ResearchSeminarProjectPage;
