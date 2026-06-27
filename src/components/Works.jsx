import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Works.css';

const Works = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Apps', 'Website', 'Redesigns', 'Design with AI'];

    const projects = [
        {
            id: 1,
            title: 'Mobile Bank App',
            titleHighlight: 'Bank App',
            category: 'Mobile',
            subcategory: 'UI Exploration',
            eyebrow: '/ IOS & ANDROID',
            tags: ['UI DESIGN', 'FINTECH', 'USER RESEARCH'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'A modern fintech mobile banking experience focused on clarity, trust, and seamless transactions — from onboarding to daily spend tracking.',
            image: '/assets/mobile_app_project1_real.png',
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
            description: 'Frog Design laid the foundation. I came in at Phase 3 to fix what **4M users** were struggling with leading 6 designers across buying, servicing, and loyalty.',
            image: '/assets/mobile app project2_real.png',
            link: '/project/air-india',
            filter: ['All', 'Apps', 'Redesigns'],
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
            image: '/assets/website_background_1_real.png',
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
            tags: ['VISUAL DESIGN', 'BRANDING', 'WEB DESIGN'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'A bold, brand-forward web design for a solar energy company — exploring identity systems, typography, and strong layout principles.',
            image: '/assets/website_solar_bg.png',
            link: '/project/website2',
            filter: ['All', 'Website'],
            buttonText: 'View Case Study'
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
        <section id="work" className="works-section section-padding">
            <div className="container works-inner">

                {/* ── Top header row ── */}
                <div className="works-top-row">
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
                        <div className="works-group-header">
                            <span className="works-group-eyebrow">Category</span>
                            <p className="works-group-label">{categoryLabels[groupKey]}</p>
                        </div>

                        {/* Stack of row cards */}
                        <div className="works-list-container">
                            {groupProjects.map((project) => (
                                <article key={project.id} className="work-card-row">
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
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className="work-row-tag">{tag}</span>
                                                ))}
                                            </div>
                                            
                                            {project.buttonText === 'Full Story Coming Soon' ? (
                                                <div className="work-row-btn disabled">
                                                    {project.buttonText}
                                                </div>
                                            ) : (
                                                <Link to={project.link} className="work-row-btn">
                                                    {project.buttonText}
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
