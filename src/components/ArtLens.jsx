import React from 'react';
import './ArtLens.css';
import BlurText from './BlurText';

const ArtLens = () => {
    const galleryItems = [
        { id: 1, src: '/assets/photography/gallery-1.jpeg', title: 'Perspective I' },
        { id: 2, src: '/assets/photography/gallery-2.jpeg', title: 'Urban Echoes' },
        { id: 3, src: '/assets/photography/gallery-3.jpeg', title: 'Silent Light' },
        { id: 4, src: '/assets/photography/gallery-4.jpeg', title: 'Composition IV' },
        { id: 5, src: '/assets/photography/gallery-5.jpeg', title: 'Shadow Play' },
        { id: 6, src: '/assets/photography/gallery-6.jpeg', title: 'Nature’s Form' },
        { id: 7, src: '/assets/photography/gallery-7.jpeg', title: 'Abstract View' },
        { id: 8, src: '/assets/photography/gallery-8.jpeg', title: 'Final Frame' },
    ];

    return (
        <section id="art" className="art-section section-padding">
            <div className="art-container">
                <div className="art-header">
                    <h2 className="section-title">
                        <BlurText text="Art & Lens" delay={50} animateBy="words" tagName="span" />
                    </h2>
                    <p className="art-tagline">
                        Exploring the world through creativity and photography.
                    </p>
                </div>

                <div className="art-gallery">
                    {galleryItems.map((item) => (
                        <div key={item.id} className="gallery-item">
                            <div className="gallery-overlay"></div>
                            <img
                                src={item.src}
                                alt={item.title}
                                className="gallery-image"
                                loading="lazy"
                            />
                            <div className="gallery-info">
                                <h3 className="gallery-title">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArtLens;
