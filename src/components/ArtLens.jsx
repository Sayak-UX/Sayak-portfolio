import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './ArtLens.css';
import BlurText from './BlurText';

/* ── Lightbox Portal ─────────────────────────────── */
const Lightbox = ({ items, index, onClose, onPrev, onNext }) => {
    const item = items[index];

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose, onPrev, onNext]);

    return createPortal(
        <div
            className="lightbox-backdrop"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            {/* Prev arrow */}
            <button
                className="lightbox-arrow prev"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous photo"
            >
                ‹
            </button>

            <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>

                {/* Full image */}
                <img
                    key={item.src}
                    src={item.src}
                    alt={item.title}
                    className="lightbox-img"
                    draggable="false"
                />

                {/* Caption */}
                <p className="lightbox-caption">{item.title}</p>
            </div>

            {/* Next arrow */}
            <button
                className="lightbox-arrow next"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next photo"
            >
                ›
            </button>
        </div>,
        document.body
    );
};

/* ── ArtLens ─────────────────────────────────────── */
const ArtLens = () => {
    const galleryItems = [
        { id: 1, src: '/assets/photography/gallery-1.jpeg', title: 'Perspective I' },
        { id: 2, src: '/assets/photography/gallery-2.jpeg', title: 'Urban Echoes' },
        { id: 4, src: '/assets/photography/gallery-4.jpeg', title: 'Composition IV' },
        { id: 5, src: '/assets/photography/gallery-5.jpeg', title: 'Shadow Play' },
        { id: 6, src: '/assets/photography/gallery-6.jpeg', title: "Nature's Form" },
        { id: 7, src: '/assets/photography/gallery-7.jpeg', title: 'Abstract View' },
        { id: 8, src: '/assets/photography/gallery-8.jpeg', title: 'Final Frame' },
    ];

    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevPhoto = useCallback(() =>
        setLightboxIndex((i) => (i - 1 + galleryItems.length) % galleryItems.length), []);
    const nextPhoto = useCallback(() =>
        setLightboxIndex((i) => (i + 1) % galleryItems.length), []);

    const handleItemClick = (index) => {
        openLightbox(index);
    };

    return (
        <>
            <section id="art" className="art-section section-padding">
                <div className="art-container">
                    <div className="art-header">
                        <h2 className="section-title">
                            <BlurText text="The Art of Seeing" delay={50} animateBy="words" tagName="span" />
                        </h2>
                        <p className="art-tagline">
                            Exploring the world through creativity and photography.
                        </p>
                    </div>
                </div>

                <div className="art-gallery-wrapper">
                    <div className="art-gallery-marquee">
                        <div className="art-marquee-track">
                            {/* Group 1 */}
                            <div className="art-marquee-group">
                                {galleryItems.map((item, index) => (
                                    <div
                                        key={`g1-${item.id}`}
                                        className="gallery-item"
                                        onClick={() => handleItemClick(index)}
                                    >
                                        <div className="stamp-inner-frame">
                                            <div className="gallery-overlay" />
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                className="gallery-image"
                                                loading="lazy"
                                                draggable="false"
                                            />
                                        </div>
                                        <div className="gallery-info">
                                            <h3 className="gallery-title">{item.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Group 2 (Duplicate for seamless loop) */}
                            <div className="art-marquee-group" aria-hidden="true">
                                {galleryItems.map((item, index) => (
                                    <div
                                        key={`g2-${item.id}`}
                                        className="gallery-item"
                                        onClick={() => handleItemClick(index)}
                                    >
                                        <div className="stamp-inner-frame">
                                            <div className="gallery-overlay" />
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                className="gallery-image"
                                                loading="lazy"
                                                draggable="false"
                                            />
                                        </div>
                                        <div className="gallery-info">
                                            <h3 className="gallery-title">{item.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    items={galleryItems}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={prevPhoto}
                    onNext={nextPhoto}
                />
            )}
        </>
    );
};

export default ArtLens;
