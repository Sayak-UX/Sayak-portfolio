import React from 'react';
import { Link } from 'react-router-dom';
import './Works.css';

const Works = () => {
    const projects = [
        {
            id: 1,
            title: 'Mobile Bank App',
            category: 'UI Exploration',
            tags: 'UX Design · Fintech',
            year: '2025',
            image: '/assets/mobile_app_project1.svg',
            link: '/project/banking'
        },
        {
            id: 2,
            title: 'Air India Application Redesign',
            category: 'Mobile Redesign Concept',
            tags: 'UX Audit · Redesign',
            year: '2025',
            image: '/assets/mobile app project2.svg',
            link: '/project/air-india'
        },
        {
            id: 3,
            title: 'Music Application',
            category: 'Case Study',
            tags: 'UI Design · Research',
            year: '2025',
            image: '/assets/mobile app project3.svg',
            link: '/project/music'
        },
        {
            id: 4,
            title: 'Govt Portal Website Redesign',
            category: 'Web Redesign Case Study',
            tags: 'Accessibility · Heuristics',
            year: '2025',
            image: '/assets/website background 1.svg',
            link: '/project/website1'
        },
        {
            id: 5,
            title: 'Website Project 2',
            category: 'Web Design',
            tags: 'Visual Design · Branding',
            year: '2025',
            image: '/assets/website back solar.svg',
            link: '/project/website2'
        },
    ];

    const renderProjectCard = (project) => (
        <>
            {/* Image area with year badge + hover overlay */}
            <div className="work-image-wrap">
                <img
                    src={project.image}
                    alt={project.title}
                    className="work-image"
                    loading="lazy"
                />
                {project.year && (
                    <span className="work-year-badge">{project.year}</span>
                )}
                {/* Hover overlay */}
                <div className="work-hover-overlay">
                    <span className="work-hover-cta">
                        VIEW CASE STUDY&nbsp;→
                    </span>
                </div>
            </div>

            {/* Info footer */}
            <div className="work-info">
                <div className="work-info-row">
                    <span className="work-info-category">{project.category}</span>
                    {project.tags && (
                        <span className="work-info-tags">{project.tags}</span>
                    )}
                </div>
                <h3 className="work-info-title">{project.title}</h3>
            </div>
        </>
    );

    return (
        <section id="work" className="works-section section-padding">
            <div className="container-fluid">
                <h2 className="section-title container">Selected Works</h2>
                <div className="works-carousel">
                    <div className="works-track">
                        {/* First set */}
                        {projects.map((project) => (
                            <div key={`a-${project.id}`} className="work-card">
                                {project.link ? (
                                    <Link to={project.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                        {renderProjectCard(project)}
                                    </Link>
                                ) : (
                                    renderProjectCard(project)
                                )}
                            </div>
                        ))}
                        {/* Duplicate for infinite scroll */}
                        {projects.map((project) => (
                            <div key={`b-${project.id}`} className="work-card">
                                {project.link ? (
                                    <Link to={project.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                        {renderProjectCard(project)}
                                    </Link>
                                ) : (
                                    renderProjectCard(project)
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Works;
