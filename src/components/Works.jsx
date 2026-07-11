import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import './Works.css';

const ProjectCardStackItem = ({ project, idx, total, scrollYProgress, activeIndex, projectStamps, isMobile }) => {
    const step = 1 / total;
    const start = idx * step;

    // Card movement: enters from bottom (y: 500px), settles at center (y: 0), then stacks/exits to top stack (y: -25px)
    const cardY = useTransform(
        scrollYProgress,
        [start - step * 0.25, start, start + step * 0.8, start + step],
        [500, 0, 0, -25]
    );

    const cardScale = useTransform(
        scrollYProgress,
        [start - step * 0.25, start, start + step * 0.8, start + step],
        [0.94, 1, 1, 0.96]
    );

    const cardRotate = useTransform(
        scrollYProgress,
        [start - step * 0.25, start, start + step * 0.8, start + step],
        [idx % 2 === 0 ? -1 : 1, 0, 0, idx % 2 === 0 ? -0.5 : 0.5]
    );

    const cardOpacity = useTransform(
        scrollYProgress,
        [start - step * 0.25, start - step * 0.05, start + step * 0.8, start + step],
        [0, 1, 1, 1]
    );

    let zIndex = idx;
    if (idx === activeIndex) {
        zIndex = 20;
    } else if (idx < activeIndex) {
        zIndex = 10 + idx;
    }

    const motionProps = isMobile ? {} : {
        style: {
            y: cardY,
            scale: cardScale,
            rotate: cardRotate,
            opacity: cardOpacity,
            zIndex,
        }
    };

    return (
        <motion.div
            className={`project-card-stack-item project-${project.id} ${idx === activeIndex ? 'active' : ''}`}
            {...motionProps}
        >
            <article className={`work-card-row project-${project.id}`}>
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
                            <div className="work-row-btn stamp-image-btn disabled-stamp" title="Full Story Coming Soon">
                                {projectStamps[project.id] && (
                                    <img src={projectStamps[project.id]} alt="Full Story Coming Soon" className="stamp-button-img" />
                                )}
                            </div>
                        ) : project.link.startsWith('http') ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="work-row-btn stamp-image-btn">
                                {projectStamps[project.id] && (
                                    <img src={projectStamps[project.id]} alt="View Case Study" className="stamp-button-img" />
                                )}
                            </a>
                        ) : (
                            <Link to={project.link} className="work-row-btn stamp-image-btn">
                                {projectStamps[project.id] && (
                                    <img src={projectStamps[project.id]} alt="View Case Study" className="stamp-button-img" />
                                )}
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
        </motion.div>
    );
};


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

    const projectStamps = React.useMemo(() => {
        const stamps = [
            '/assets/group_83.png',
            '/assets/group_84.png',
            '/assets/group_86.png',
            '/assets/group_87.png',
            '/assets/group_88.png',
            '/assets/group_89.png'
        ];
        const shuffled = [...stamps];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const mapping = {};
        let activeIndex = 0;
        projects.forEach((project) => {
            if (project.buttonText === 'Full Story Coming Soon') {
                mapping[project.id] = '/assets/group_92.png';
            } else {
                mapping[project.id] = shuffled[activeIndex % shuffled.length];
                activeIndex++;
            }
        });
        return mapping;
    }, []);


    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1150);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filtered = projects.filter((p) => p.filter.includes(activeFilter));

    // Track scroll progress of the works section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Update activeIndex as user scrolls down the sticky deck
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isMobile) return;
        const total = filtered.length;
        if (total === 0) return;
        
        // Split progress into equal parts for each project card
        const currentIdx = Math.min(
            total - 1,
            Math.max(0, Math.floor(latest * total))
        );
        if (currentIdx !== activeIndex) {
            setActiveIndex(currentIdx);
        }
    });

    // Reset active index when filter changes, and reset mobile scroll container position
    useEffect(() => {
        setActiveIndex(0);
        if (isMobile && containerRef.current) {
            const container = containerRef.current.querySelector('.project-stack');
            if (container) {
                container.scrollLeft = 0;
            }
        }
    }, [activeFilter, isMobile]);

    // Handle scroll on mobile to update active card index based on center alignment
    const handleMobileScroll = (e) => {
        if (!isMobile) return;
        const container = e.currentTarget;
        const cards = container.children;
        if (!cards.length) return;
        
        const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
        let closestIdx = 0;
        let minDiff = Infinity;
        
        for (let i = 0; i < cards.length; i++) {
            const rect = cards[i].getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const diff = Math.abs(cardCenter - containerCenter);
            if (diff < minDiff) {
                minDiff = diff;
                closestIdx = i;
            }
        }
        
        if (closestIdx !== activeIndex) {
            setActiveIndex(closestIdx);
        }
    };

    return (
        <section 
            id="work" 
            className="works-section" 
            ref={containerRef}
            style={{ 
                '--scroll-height': isMobile ? 'auto' : `calc(100vh + ${(filtered.length - 1) * 90}vh)`
            }}
        >
            {/* Sticky Stage wrapper */}
            <div className="works-sticky-stage">
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

                    {/* Stacking Project cards deck */}
                    <div 
                        className="project-stack"
                        onScroll={handleMobileScroll}
                    >
                        {filtered.map((project, idx) => (
                            <ProjectCardStackItem 
                                key={project.id}
                                project={project}
                                idx={idx}
                                total={filtered.length}
                                scrollYProgress={scrollYProgress}
                                activeIndex={activeIndex}
                                projectStamps={projectStamps}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>

                    {/* Mobile Pagination Dots */}
                    {isMobile && filtered.length > 1 && (
                        <div className="mobile-work-dots">
                            {filtered.map((_, idx) => (
                                <span 
                                    key={idx} 
                                    className={`mobile-work-dot ${idx === activeIndex ? 'active' : ''}`}
                                    onClick={() => {
                                        const container = containerRef.current?.querySelector('.project-stack');
                                        if (container) {
                                            const cards = container.children;
                                            if (cards[idx]) {
                                                cards[idx].scrollIntoView({ 
                                                    behavior: 'smooth', 
                                                    inline: 'center', 
                                                    block: 'nearest' 
                                                });
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Works;
