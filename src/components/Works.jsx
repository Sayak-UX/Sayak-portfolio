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
            tags: ['UI Design', 'Fintech', 'Research'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'A modern fintech mobile banking experience focused on clarity, trust, and seamless transactions — from onboarding to daily spend tracking.',
            image: '/assets/mobile_app_project1.svg',
            link: '/project/banking',
            filter: ['All', 'Apps'],
        },
        {
            id: 2,
            title: 'Air India App Redesign',
            titleHighlight: 'Redesign',
            category: 'Mobile',
            subcategory: 'UX Audit',
            tags: ['Mobile', 'Redesign', 'Accessibility'],
            badge: 'Featured',
            badgeColor: '#1a56db',
            year: '2025',
            description: 'A comprehensive UX audit and redesign concept for India\'s flagship airline — improving booking flows, wayfinding, and brand coherence.',
            image: '/assets/mobile app project2.svg',
            link: '/project/air-india',
            filter: ['All', 'Apps', 'Redesigns'],
        },
        {
            id: 3,
            title: 'Music Application',
            titleHighlight: 'Music',
            category: 'Mobile',
            subcategory: 'UI Research',
            tags: ['UI Design', 'Research', 'Branding'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'An immersive music discovery app concept balancing aesthetic depth with intuitive navigation and deep personalisation.',
            image: '/assets/mobile app project3.svg',
            link: '/project/music',
            filter: ['All', 'Apps'],
        },
        {
            id: 4,
            title: 'Govt Portal Website Redesign',
            titleHighlight: 'Website Redesign',
            category: 'Web',
            subcategory: 'UX Audit',
            tags: ['Accessibility', 'Heuristics', 'UX Audit'],
            badge: 'Featured',
            badgeColor: '#6b21a8',
            year: '2025',
            description: 'A heuristic-driven redesign of a government digital portal to improve usability, accessibility standards, and citizen trust.',
            image: '/assets/website background 1.svg',
            link: '/project/website1',
            filter: ['All', 'Website', 'Redesigns'],
        },
        {
            id: 5,
            title: 'Solar Service Website Design',
            titleHighlight: 'Solar Service',
            category: 'Web',
            subcategory: 'Visual Design',
            tags: ['Visual Design', 'Branding', 'Web'],
            badge: null,
            badgeColor: null,
            year: '2025',
            description: 'A bold, brand-forward web design for a solar energy company — exploring identity systems, typography, and strong layout principles.',
            image: '/assets/website back solar.svg',
            link: '/project/website2',
            filter: ['All', 'Website'],
        },
    ];

    const filtered = projects.filter((p) => p.filter.includes(activeFilter));

    // Group by category for category headings
    const grouped = filtered.reduce((acc, project) => {
        const key = `${project.category} — ${project.subcategory !== project.category ? project.category + ' Design' : project.subcategory}`;
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

                        {/* 2-column grid */}
                        <div className="works-grid">
                            {groupProjects.map((project) => (
                                <article key={project.id} className="work-card">
                                    <Link to={project.link} className="work-card-link">

                                        {/* ── Image ── */}
                                        <div className="work-image-wrap">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="work-image"
                                                loading="lazy"
                                            />
                                            {project.badge && (
                                                <span
                                                    className="work-badge"
                                                    style={{ background: project.badgeColor }}
                                                >
                                                    {project.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* ── Card body ── */}
                                        <div className="work-body">
                                            <span className="work-meta">
                                                {project.category}&nbsp;/&nbsp;
                                                <span>{project.subcategory}</span>
                                            </span>

                                            <h3 className="work-title">
                                                {project.title.replace(project.titleHighlight, '').trim()}{' '}
                                                <em>{project.titleHighlight}</em>
                                            </h3>

                                            <p className="work-desc">{project.description}</p>

                                            <div className="work-tags">
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className="work-tag">{tag}</span>
                                                ))}
                                            </div>

                                            <span className="work-cta">
                                                View Case Study&nbsp;→
                                            </span>
                                        </div>

                                    </Link>
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
