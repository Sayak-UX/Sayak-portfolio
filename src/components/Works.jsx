import React from 'react';
import { Link } from 'react-router-dom';
import './Works.css';

const Works = () => {
    const projects = [
        {
            id: 1,
            title: 'Mobile Bank App',
            category: 'UI Exploration',
            image: '/assets/mobile app project1.svg',
            link: '/project/banking'
        },
        {
            id: 2,
            title: 'Air India Redesign',
            category: 'Concept',
            image: '/assets/mobile app project2.svg',
            link: '/project/air-india'
        },
        {
            id: 3,
            title: 'Music Application',
            category: 'Case Study',
            image: '/assets/mobile app project3.svg',
            link: '/project/music'
        },
        {
            id: 4,
            title: 'Website Project 1',
            category: 'Web Design',
            image: '/assets/website background 1.svg',
            link: '/project/website1'
        },
        {
            id: 5,
            title: 'Website Project 2',
            category: 'Web Design',
            image: '/assets/website back solar.svg',
            link: '/project/website2'
        },

    ];

    const renderProjectCard = (project) => (
        <>
            <img
                src={project.image}
                alt={project.title}
                className="work-image"
                loading="lazy"
            />
            <div className="work-info">
                <h3>{project.title}</h3>
                <span>{project.category}</span>
            </div>
        </>
    );

    return (
        <section id="work" className="works-section section-padding">
            <div className="container-fluid">
                <h2 className="section-title container">Selected Works</h2>
                <div className="works-carousel">
                    <div className="works-track">
                        {/* First set of projects */}
                        {projects.map((project) => (
                            <div key={`a-${project.id}`} className="work-card">
                                {project.link ? (
                                    <Link to={project.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {renderProjectCard(project)}
                                    </Link>
                                ) : (
                                    renderProjectCard(project)
                                )}
                            </div>
                        ))}
                        {/* Duplicate set for infinite scroll */}
                        {projects.map((project) => (
                            <div key={`b-${project.id}`} className="work-card">
                                {project.link ? (
                                    <Link to={project.link} style={{ textDecoration: 'none', color: 'inherit' }}>
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
