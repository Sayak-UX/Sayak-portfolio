import React, { useState } from 'react';
import BlurText from './BlurText';
import './Tools.css';

const Tools = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Design', 'AI Tools', 'Research & Planning'];

    const tools = [
        {
            id: 'figma',
            name: 'Figma',
            category: 'Design',
            subCategory: 'UI/UX & Prototyping',
            description: 'My primary workspace for collaborative interface design, building design systems, and crafting responsive prototypes.',
            brandColor: '#F24E1E',
            glowColor: 'rgba(242, 78, 30, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 28.5C19 33.7467 14.7467 38 9.5 38C4.25329 38 0 33.7467 0 28.5C0 23.2533 4.25329 19 9.5 19H19V28.5Z" fill="#F24E1E"/>
                    <path d="M19 9.5C19 14.7467 14.7467 19 9.5 19C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0H19V9.5Z" fill="#FF7262"/>
                    <path d="M38 9.5C38 14.7467 33.7467 19 28.5 19C23.2533 19 19 14.7467 19 9.5C19 4.25329 23.2533 0 28.5 0H38V9.5Z" fill="#A259FF"/>
                    <path d="M38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5H38Z" fill="#1ABC9C"/>
                    <path d="M19 47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5Z" fill="#19BC9B"/>
                </svg>
            )
        },
        {
            id: 'adobe-creative-suite',
            name: 'Adobe Creative Suite',
            category: 'Design',
            subCategory: 'Visual & Assets',
            description: 'Advanced asset generation, asset prep, motion graphics, and graphic design using Photoshop, Illustrator, After Effects, and Premiere.',
            brandColor: '#FF0000',
            glowColor: 'rgba(255, 0, 0, 0.12)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="50" height="50" rx="8" fill="#FF0000"/>
                    <path d="M25 8L11 39.5H19.5L22.5 32H27.5L30.5 39.5H39L25 8ZM25 24L23.5 28.5H26.5L25 24Z" fill="white"/>
                </svg>
            )
        },
        {
            id: 'claude',
            name: 'Claude',
            category: 'AI Tools',
            subCategory: 'Brainstorming & Research',
            description: 'Harnessing Anthropic\'s large language models for copy ideation, content hierarchy planning, and structuring qualitative research notes.',
            brandColor: '#D97706',
            glowColor: 'rgba(217, 119, 6, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="50" height="50" rx="25" fill="#D97706" fillOpacity="0.15"/>
                    <path d="M25 10C27 18 32 23 40 25C32 27 27 32 25 40C23 32 18 27 10 25C18 23 23 18 25 10Z" fill="#D97706"/>
                    <circle cx="15" cy="15" r="2" fill="#D97706" fillOpacity="0.8"/>
                    <circle cx="35" cy="35" r="3" fill="#D97706" fillOpacity="0.8"/>
                </svg>
            )
        },
        {
            id: 'relume',
            name: 'Relume.io',
            category: 'Design',
            subCategory: 'UX Sitemaps & Structures',
            description: 'Utilizing AI sitemapping and structured component libraries to fast-track Information Architecture (IA) and wireframing wireframes.',
            brandColor: '#6366F1',
            glowColor: 'rgba(99, 102, 241, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="8" width="22" height="22" rx="4" stroke="#6366F1" strokeWidth="3" fill="none"/>
                    <rect x="20" y="20" width="22" height="22" rx="4" stroke="#6366F1" strokeWidth="3" fill="#6366F1" fillOpacity="0.2"/>
                    <line x1="20" y1="20" x2="30" y2="20" stroke="#6366F1" strokeWidth="3"/>
                    <line x1="20" y1="20" x2="20" y2="30" stroke="#6366F1" strokeWidth="3"/>
                </svg>
            )
        },
        {
            id: 'uizard',
            name: 'Uizard.io',
            category: 'Design',
            subCategory: 'AI Rapid Prototyping',
            description: 'Converting sketches, wireframes, and raw ideas instantly into interactive, high-fidelity UI concepts using AI automation.',
            brandColor: '#EC4899',
            glowColor: 'rgba(236, 72, 153, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 38L32 18M32 18L38 12M32 18L35 21M38 12L35 9M38 12L41 15" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M12 38L9 41" stroke="#EC4899" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M22 10L22 6M22 6L21 8M22 6L23 8" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M42 26L46 26" stroke="#EC4899" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="28" cy="12" r="1.5" fill="#EC4899"/>
                    <circle cx="40" cy="22" r="1.5" fill="#EC4899"/>
                </svg>
            )
        },
        {
            id: 'galileo',
            name: 'Galileo AI',
            category: 'Design',
            subCategory: 'Generative UI Systems',
            description: 'Leveraging text-to-UI generative models to quickly explore modern, clean interfaces and variations of design patterns.',
            brandColor: '#10B981',
            glowColor: 'rgba(16, 185, 129, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="18" stroke="#10B981" strokeWidth="2"/>
                    <circle cx="25" cy="25" r="6" fill="#10B981"/>
                    <path d="M25 4V10M25 40V46M4 25H10M40 25H46" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 14L18 18M32 32L36 36" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            id: 'flowmapp',
            name: 'FlowMapp.com',
            category: 'Research & Planning',
            subCategory: 'Sitemapping & Flows',
            description: 'Building structural maps, interactive user flows, and mapping customer journeys to visualize design architectures.',
            brandColor: '#3B82F6',
            glowColor: 'rgba(59, 130, 246, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="6" width="10" height="8" rx="2" fill="#3B82F6"/>
                    <rect x="6" y="24" width="10" height="8" rx="2" stroke="#3B82F6" strokeWidth="2"/>
                    <rect x="20" y="24" width="10" height="8" rx="2" fill="#3B82F6"/>
                    <rect x="34" y="24" width="10" height="8" rx="2" stroke="#3B82F6" strokeWidth="2"/>
                    <path d="M25 14V19H11V24M25 19H39V24M25 19V24" stroke="#3B82F6" strokeWidth="2"/>
                </svg>
            )
        },
        {
            id: 'notion',
            name: 'Notion',
            category: 'Research & Planning',
            subCategory: 'Documentation & Wiki',
            description: 'The single source of truth for design wikis, client handovers, research analysis, schedules, and structural templates.',
            brandColor: '#1A1A1A',
            glowColor: 'rgba(26, 26, 26, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="38" height="38" rx="6" fill="var(--text-main)" />
                    <path d="M14 14V36H18V21.5L32 36H36V14H32V28.5L18 14H14Z" fill="var(--bg-color)"/>
                </svg>
            )
        },
        {
            id: 'miro',
            name: 'Miro',
            category: 'Research & Planning',
            subCategory: 'Collaborative Whiteboard',
            description: 'Leading collaborative design thinking workshops, affinity mapping sessions, user journey maps, and real-time brainstorms.',
            brandColor: '#FFD000',
            glowColor: 'rgba(255, 208, 0, 0.12)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="50" height="50" rx="8" fill="#FFD000"/>
                    <path d="M10 38V12H16L25 24L34 12H40V38H34V22.5L25 34.5L16 22.5V38H10Z" fill="black"/>
                </svg>
            )
        },
        {
            id: 'typeform',
            name: 'Typeform',
            category: 'Research & Planning',
            subCategory: 'Conversational Research',
            description: 'Building human-centric, conversational forms and questionnaires to collect rich user feedback and early-stage UX surveys.',
            brandColor: '#222222',
            glowColor: 'rgba(34, 34, 34, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="38" height="38" rx="19" fill="#222222"/>
                    <path d="M25 12C17.8203 12 12 17.8203 12 25C12 32.1797 17.8203 38 25 38C32.1797 38 38 32.1797 38 25" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M25 17V33" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            id: 'surveymonkey',
            name: 'SurveyMonkey',
            category: 'Research & Planning',
            subCategory: 'Quantitative Audits',
            description: 'Deploying robust quantitative questionnaires to gather market insights, analyze stats, and validate user demographics.',
            brandColor: '#00BF6F',
            glowColor: 'rgba(0, 191, 111, 0.15)',
            icon: (
                <svg className="tool-logo-svg" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="20" fill="#00BF6F"/>
                    <circle cx="17" cy="25" r="6" fill="#FFFFFF"/>
                    <circle cx="33" cy="25" r="6" fill="#FFFFFF"/>
                    <circle cx="17" cy="25" r="2" fill="#00BF6F"/>
                    <circle cx="33" cy="25" r="2" fill="#00BF6F"/>
                    <path d="M21 31C21 31 23 33 25 33C27 33 29 31 29 31" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        }
    ];

    // Filter tools based on category (all tools are displayed in the marquee)
    return (
        <section id="tools" className="tools-section section-padding">
            <div className="container tools-inner">
                {/* ── Top header row ── */}
                <div className="tools-top-row">
                    <div className="tools-title-group">
                        <span className="tools-eyebrow">Creative Stack</span>
                        <h2 className="tools-main-title">Tools I Use</h2>
                    </div>
                </div>

                {/* ── Infinite Marquee ── */}
                <div className="tools-marquee-container">
                    <div className="tools-marquee-track">
                        {/* Group 1 */}
                        <div className="tools-marquee-group">
                            {tools.map((tool) => (
                                <div 
                                    key={`g1-${tool.id}`} 
                                    className="tool-card"
                                    style={{ 
                                        '--brand-color': tool.brandColor,
                                        '--glow-color': tool.glowColor
                                    }}
                                >
                                    <div className="tool-card-glow" />
                                    <div className="tool-card-inner">
                                        <div className="tool-header">
                                            <div className="tool-icon-wrap">
                                                {tool.icon}
                                            </div>
                                            <div className="tool-meta">
                                                <h3 className="tool-name">{tool.name}</h3>
                                                <span className="tool-subcategory">{tool.subCategory}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Group 2 (Duplicate for seamless loop) */}
                        <div className="tools-marquee-group" aria-hidden="true">
                            {tools.map((tool) => (
                                <div 
                                    key={`g2-${tool.id}`} 
                                    className="tool-card"
                                    style={{ 
                                        '--brand-color': tool.brandColor,
                                        '--glow-color': tool.glowColor
                                    }}
                                >
                                    <div className="tool-card-glow" />
                                    <div className="tool-card-inner">
                                        <div className="tool-header">
                                            <div className="tool-icon-wrap">
                                                {tool.icon}
                                            </div>
                                            <div className="tool-meta">
                                                <h3 className="tool-name">{tool.name}</h3>
                                                <span className="tool-subcategory">{tool.subCategory}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tools;
