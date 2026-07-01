import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef(null);
    const fadeRef = useRef(null);
    const hoverTimer = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = 0;
        audio.loop = true;
    }, []);

    const fadeTo = (targetVol, duration = 1200) => {
        const audio = audioRef.current;
        clearInterval(fadeRef.current);
        const steps = 30;
        const interval = duration / steps;
        const delta = (targetVol - audio.volume) / steps;

        fadeRef.current = setInterval(() => {
            audio.volume = Math.min(1, Math.max(0, audio.volume + delta));
            if (
                (delta > 0 && audio.volume >= targetVol) ||
                (delta < 0 && audio.volume <= targetVol)
            ) {
                audio.volume = targetVol;
                clearInterval(fadeRef.current);
                if (targetVol === 0) audio.pause();
            }
        }, interval);
    };

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            fadeTo(0, 800);
            setIsPlaying(false);
        } else {
            audio.play().then(() => {
                fadeTo(0.35, 1200);
                setIsPlaying(true);
            }).catch(() => {
                console.warn('Autoplay blocked — user must interact first.');
            });
        }
    };

    const handleMouseEnter = () => {
        clearTimeout(hoverTimer.current);
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        hoverTimer.current = setTimeout(() => setIsExpanded(false), 800);
    };

    return (
        <>
            {/* 
                🎵 Drop your ambient .mp3 into: /public/assets/ambient.mp3
                Free lo-fi/ambient tracks: https://pixabay.com/music/search/ambient/
            */}
            <audio ref={audioRef} src="/assets/ambient.mp3" preload="auto" />

            <div
                className={`music-player ${isPlaying ? 'playing' : ''} ${isExpanded ? 'expanded' : ''}`}
                onClick={togglePlay}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title={isPlaying ? 'Pause music' : 'Play music'}
                role="button"
                aria-label="Toggle music"
            >
                {/* Tooltip */}
                <span className="music-tooltip">
                    {isPlaying ? 'Pause' : 'Play lofi'}
                </span>

                {/* Vinyl disc */}
                <div className="music-disc" />

                {/* Track info */}
                <div className="music-label">
                    <span className="music-track-name">Lofi</span>
                    <span className="music-status">
                        {isPlaying ? '▶ Now playing' : '❚❚ Paused'}
                    </span>
                </div>

                {/* Sound wave bars */}
                <div className="music-bars">
                    <span className="music-bar" />
                    <span className="music-bar" />
                    <span className="music-bar" />
                    <span className="music-bar" />
                </div>
            </div>
        </>
    );
};

export default MusicPlayer;
