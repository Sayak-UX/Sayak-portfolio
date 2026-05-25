import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const posRef = useRef({ x: -100, y: -100 });
    const ringPosRef = useRef({ x: -100, y: -100 });
    const rafRef = useRef(null);

    const [cursorState, setCursorState] = useState('default'); // 'default' | 'hover' | 'click' | 'text'
    const [isVisible, setIsVisible] = useState(false);
    const isVisibleRef = useRef(false);

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = useCallback(() => {
        ringPosRef.current.x = lerp(ringPosRef.current.x, posRef.current.x, 0.1);
        ringPosRef.current.y = lerp(ringPosRef.current.y, posRef.current.y, 0.1);

        if (cursorDotRef.current) {
            cursorDotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
        }
        if (cursorRingRef.current) {
            cursorRingRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;
        }

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const onMouseMove = (e) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                setIsVisible(true);
            }
        };

        const onMouseEnter = () => { isVisibleRef.current = true; setIsVisible(true); };
        const onMouseLeave = () => { isVisibleRef.current = false; setIsVisible(false); };

        const onMouseDown = () => setCursorState('click');
        const onMouseUp = () => {
            // revert back to whatever the hover state was
            const el = document.elementFromPoint(posRef.current.x, posRef.current.y);
            if (el) {
                if (el.matches('a, button, [role="button"], .cursor-hover') || el.closest('a, button, [role="button"], .cursor-hover')) {
                    setCursorState('hover');
                } else if (el.matches('p, h1, h2, h3, h4, h5, span, input, textarea') || el.closest('p, h1, h2, h3, h4, h5')) {
                    setCursorState('text');
                } else {
                    setCursorState('default');
                }
            } else {
                setCursorState('default');
            }
        };

        const onMouseOver = (e) => {
            const target = e.target;
            if (target.matches('a, button, [role="button"], .cursor-hover') || target.closest('a, button, [role="button"], .cursor-hover')) {
                setCursorState('hover');
            } else if (target.matches('input, textarea')) {
                setCursorState('text');
            } else if (target.matches('p, h1, h2, h3, h4, h5, span') || target.closest('h1, h2, h3, h4, h5')) {
                setCursorState('default');
            } else {
                setCursorState('default');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    return (
        <>
            {/* Trailing ring — lags behind cursor with lerp */}
            <div
                ref={cursorRingRef}
                className={`cursor-ring cursor-ring--${cursorState} ${isVisible ? 'cursor--visible' : 'cursor--hidden'}`}
            >
                {/* Inner decorative arc */}
                <span className="cursor-ring__arc" />
            </div>

            {/* Sharp dot — follows cursor exactly */}
            <div
                ref={cursorDotRef}
                className={`cursor-dot cursor-dot--${cursorState} ${isVisible ? 'cursor--visible' : 'cursor--hidden'}`}
            />
        </>
    );
};

export default CustomCursor;
