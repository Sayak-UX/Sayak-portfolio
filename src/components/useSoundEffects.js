import { useEffect } from 'react';
import { playPop, playTick, playWhoosh } from './SoundEngine';

/**
 * useSoundEffects
 * Globally attaches micro-interaction sounds to:
 *  - All <button>, <a>, .work-card-link  → pop on click
 *  - Filter buttons, nav links           → tick on hover
 *  - React Router navigations            → whoosh
 */
const useSoundEffects = () => {
    useEffect(() => {
        // ── Click sound on buttons & links ──────────────────────
        const handleClick = (e) => {
            const target = e.target.closest(
                'button, a, [role="button"], .gallery-item, .work-card-link'
            );
            if (target) playPop();
        };

        // ── Hover tick on nav + filter pills ────────────────────
        let lastHovered = null;
        const handleMouseOver = (e) => {
            const target = e.target.closest(
                '.works-filter-btn, .nav-link, .work-cta, .music-player'
            );
            if (target && target !== lastHovered) {
                lastHovered = target;
                playTick();
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest(
                '.works-filter-btn, .nav-link, .work-cta, .music-player'
            );
            if (target) lastHovered = null;
        };

        document.addEventListener('click', handleClick, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseout', handleMouseOut, { passive: true });

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);
};

export default useSoundEffects;
