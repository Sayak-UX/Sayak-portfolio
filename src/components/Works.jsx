import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Works.css';

const Works = () => {
    const [activeFilter, setActiveFilter] = useState('All');
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
            { threshold: 0.05 }
        );

        if (sectionRef.current) {
            // Find all reveal-on-scroll elements that aren't already visible
            const elements = sectionRef.current.querySelectorAll('.reveal-on-scroll:not(.visible)');
            elements.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, [activeFilter]);

    const filters = ['All', 'Apps', 'Website', 'Redesigns', 'Design with AI'];

    const projects = [
        {
            id: 1,
            title: 'One app One banking',
            titleHighlight: 'One banking',
            category: 'Mobile',
            subcategory: 'UI Exploration',
            eyebrow: '/ IOS & ANDROID',
            tags: ['USER SURVEY ANALYSIS', 'PERSONA', 'DESIGN SYSTEM', 'UX INPUTS', 'BETTER ACCESSIBILITY'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'A modern fintech mobile banking experience focused on clarity, trust, and seamless transactions — from onboarding to daily spend tracking.',
            image: '/assets/banking_app26_cover.png',
            link: '/project/banking',
            filter: ['All', 'Apps'],
            buttonText: 'View Case Study'
        },
        {
            id: 2,
            title: 'Air India App Redesign',
            titleHighlight: 'Redesign',
            category: 'Mobile',
            subcategory: 'UX Audit',
            eyebrow: '/ IOS & ANDROID',
            tags: ['UX AUDIT', 'ACCESSIBILITY', 'REDESIGN'],
            badge: 'Featured',
            badgeColor: '#1a56db',
            year: '2025',
            description: 'A comprehensive **UX audit and redesign** of the Air India mobile app — streamlining check-ins, booking flows, and loyalty programs to resolve core friction points for **over 4 million travellers**.',
            image: '/assets/airindia_app26_cover.png',
            link: '/project/air-india',
            filter: ['All', 'Apps', 'Redesigns'],
            buttonText: 'View Case Study'
        },
        {
            id: 3,
            title: 'Adaptive Traffic AI',
            titleHighlight: 'Traffic AI',
            category: 'Web',
            subcategory: 'AI & UX Case Study',
            eyebrow: '/ AI & UX RESEARCH',
            tags: ['AI DASHBOARD', 'EXPLAINABLE AI', 'UX RESEARCH'],
            badge: 'Featured',
            badgeColor: '#10b981',
            year: '2025',
            description: 'Co-designing an explainable AI-driven dashboard and real-time commuter framework for intelligent urban mobility and trust.',
            image: '/assets/ai_traffic_monitoring26_cover.png',
            link: 'https://smartflow-traffic-ai.vercel.app/',
            filter: ['All', 'Website', 'Design with AI'],
            buttonText: 'View Case Study'
        },
        {
            id: 4,
            title: 'Govt Portal Website Redesign',
            titleHighlight: 'Website Redesign',
            category: 'Web',
            subcategory: 'UX Audit',
            eyebrow: '/ ACCESSIBILITY & WEB',
            tags: ['ACCESSIBILITY', 'HEURISTIC EVALUATION', 'UX AUDIT'],
            badge: 'Featured',
            badgeColor: '#6b21a8',
            year: '2025',
            description: 'A heuristic-driven redesign of a government digital portal to improve usability, accessibility standards, and citizen trust across diverse demographics.',
            image: '/assets/govtweb26_cover.png',
            link: '/project/website1',
            filter: ['All', 'Website', 'Redesigns'],
            buttonText: 'View Case Study'
        },
        {
            id: 5,
            title: 'Solar Service Website Design',
            titleHighlight: 'Solar Service',
            category: 'Web',
            subcategory: 'Visual Design',
            eyebrow: '/ BRANDING & WEB',
            tags: ['USER RESEARCH & SURVEY', 'ETHNOGRAPHY RESEARCH', 'SCAMPER', 'WEBSITE DESIGN'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'A bold, brand-forward web design for a solar energy company — exploring identity systems, typography, and strong layout principles.',
            image: '/assets/solarweb26_cover.png',
            link: '/project/website2',
            filter: ['All', 'Website'],
            buttonText: 'View Case Study'
        },
        {
            id: 6,
            title: 'Music App',
            titleHighlight: 'Music App',
            category: 'Mobile',
            subcategory: 'UI Exploration',
            eyebrow: '/ IOS & ANDROID',
            tags: ['USER CENTRIC APPROACH', 'COLOR PSYCHOLOGY'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'An immersive and interactive music application designed for clean aesthetics, seamless transitions, and personalized audio spaces.',
            image: '/assets/musicapp26_cover.png',
            link: '/project/music',
            filter: ['All', 'Apps'],
            buttonText: 'Full Story Coming Soon'
        },
    ];

    const filtered = projects.filter((p) => p.filter.includes(activeFilter));

    // Group by category for category headings
    const grouped = filtered.reduce((acc, project) => {
        const groupKey = project.category;
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(project);
        return acc;
    }, {});

    const categoryLabels = {
        Mobile: 'Apps — Mobile & Product Design',
        Web: 'Website — Digital & Interactive Design',
    };

    return (
        <section id="work" className="works-section section-padding" ref={sectionRef}>
            <div className="container works-inner">

                {/* ── Top header row ── */}
                <div className="works-top-row reveal-on-scroll">
                    <div className="works-title-group">
                        <span className="works-eyebrow">Selected Work</span>
                        <h2 className="works-main-title">Projects</h2>
                    </div>

                    {/* Filter pills */}
                    <div className="works-filters" role="tablist">
                        {filters.map((f) => (
                            <button
                                key={f}
                                role="tab"
                                aria-selected={activeFilter === f}
                                className={`works-filter-btn ${activeFilter === f ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Category groups ── */}
                {Object.entries(grouped).map(([groupKey, groupProjects]) => (
                    <div key={groupKey} className="works-group">
                        <div className="works-group-header reveal-on-scroll">
                            <span className="works-group-eyebrow">Category</span>
                            <p className="works-group-label">{categoryLabels[groupKey]}</p>
                        </div>

                        {/* Stack of row cards */}
                        <div className="works-list-container">
                            {groupProjects.map((project, idx) => (
                                <article 
                                    key={project.id} 
                                    className={`work-card-row project-${project.id} reveal-on-scroll`}
                                    style={{ 
                                        '--card-index': idx,
                                        '--card-rotation': `${idx % 2 === 0 ? '-0.6deg' : '0.6deg'}`
                                    }}
                                >
                                    {/* ── Left Content column ── */}
                                    <div className="work-row-content">
                                        <div className="work-row-top-info">
                                            <span className="work-row-eyebrow">{project.eyebrow}</span>
                                            
                                            <h3 className="work-row-title">
                                                {project.title.replace(project.titleHighlight, '').trim()}{' '}
                                                <em>{project.titleHighlight}</em>
                                            </h3>
                                            
                                            <p className="work-row-desc">
                                                {project.description.includes('**') ? (
                                                    project.description.split('**').map((text, i) => 
                                                        i % 2 === 1 ? <strong key={i} className="highlight-text">{text}</strong> : text
                                                    )
                                                ) : (
                                                    project.description
                                                )}
                                            </p>
                                        </div>

                                        <div className="work-row-mid-section">
                                            <div className="work-row-tags">
                                                {project.tags.map((tag) => {
                                                    const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                                    return (
                                                        <span key={tag} className={`work-row-tag tag-${slug}`}>
                                                            {tag}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            
                                            {project.buttonText === 'Full Story Coming Soon' ? (
                                                <div className="work-row-btn disabled">
                                                    {project.buttonText}
                                                </div>
                                            ) : project.link.startsWith('http') ? (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="work-row-btn stamp-image-btn">
                                                    <img src="/assets/yellow_barr.png" alt="View Case Study" className="stamp-button-img stamp-light-only" />
                                                    <img src="/assets/green_barr.png" alt="View Case Study" className="stamp-button-img stamp-dark-only" />
                                                </a>
                                            ) : (
                                                <Link to={project.link} className="work-row-btn stamp-image-btn">
                                                    <img src="/assets/yellow_barr.png" alt="View Case Study" className="stamp-button-img stamp-light-only" />
                                                    <img src="/assets/green_barr.png" alt="View Case Study" className="stamp-button-img stamp-dark-only" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Right Image column ── */}
                                    <div className="work-row-image-wrap">
                                        {project.buttonText === 'Full Story Coming Soon' ? (
                                            <div className="work-row-image-container">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="work-row-image"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : project.link.startsWith('http') ? (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="work-row-image-container">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="work-row-image"
                                                    loading="lazy"
                                                />
                                            </a>
                                        ) : (
                                            <Link to={project.link} className="work-row-image-container">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="work-row-image"
                                                    loading="lazy"
                                                />
                                            </Link>
                                        )}
                                        {project.badge && (
                                            <span
                                                className="work-row-badge"
                                                style={{ background: project.badgeColor }}
                                            >
                                                {project.badge}
                                            </span>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}


            </div>
        </section>
    );
};

export default Works;
