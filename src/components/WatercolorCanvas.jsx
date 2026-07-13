import React, { useEffect, useRef, useState } from 'react';
import './WatercolorCanvas.css';

// Preset watercolor pigments
const PRESET_COLORS = [
    { name: 'Prussian Blue', hex: '#003153' },
    { name: 'Rose Madder', hex: '#e32636' },
    { name: 'Viridian Green', hex: '#40826d' },
    { name: 'Gamboge Yellow', hex: '#e49b0f' },
    { name: 'Burnt Sienna', hex: '#e97451' },
    { name: 'Cobalt Violet', hex: '#9000ff' },
    { name: 'Teal Wash', hex: '#008080' },
    { name: 'Charcoal Black', hex: '#363636' },
    { name: 'White Gouache', hex: '#f5f5f5' }
];

const WatercolorCanvas = () => {
    const [isVisible, setIsVisible] = useState(false); // Controls if the easter egg is loaded
    const [showPalette, setShowPalette] = useState(false); // Controls if the floating palette is open
    const [currentColor, setCurrentColor] = useState('#003153');
    const [brushSize, setBrushSize] = useState(35);
    const [brushOpacity, setBrushOpacity] = useState(0.15);
    const [brushMode, setBrushMode] = useState('brush'); // 'brush', 'splatter', 'eraser'
    const [showHint, setShowHint] = useState(false);

    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const lastPointRef = useRef({ x: 0, y: 0 });

    // Listen for custom activation event from Navbar logo
    useEffect(() => {
        const handleActivate = () => {
            setIsVisible(true);
            setShowPalette(true);
            setShowHint(true);
            
            // Auto hide hint after 4 seconds
            const timer = setTimeout(() => {
                setShowHint(false);
            }, 4000);

            return () => clearTimeout(timer);
        };

        window.addEventListener('activate-watercolor-paint', handleActivate);
        return () => window.removeEventListener('activate-watercolor-paint', handleActivate);
    }, []);

    // Set up canvas sizing
    useEffect(() => {
        if (!isVisible || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            
            // Save current drawing content
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            if (canvas.width > 0 && canvas.height > 0) {
                tempCtx.drawImage(canvas, 0, 0);
            }
            
            // Resize canvas to cover hero section
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Restore previous drawing content
            const ctx = canvas.getContext('2d');
            ctx.drawImage(tempCanvas, 0, 0);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [isVisible]);

    // Helper: converts a hex color to rgba with opacity
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Realistic watercolor wash and bleeding drawing logic
    const drawWatercolor = (ctx, x, y, lastX, lastY, color, size, opacity, mode, isFirstPoint) => {
        if (mode === 'eraser') {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            
            // Soft eraser brush to delete pigment smoothly
            const distance = Math.hypot(x - lastX, y - lastY);
            const steps = isFirstPoint ? 1 : Math.max(1, Math.floor(distance / (size * 0.15)));
            
            for (let i = 0; i < steps; i++) {
                const t = steps > 1 ? i / steps : 1;
                const cx = lastX + (x - lastX) * t;
                const cy = lastY + (y - lastY) * t;
                
                const grad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size);
                grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
                grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(cx, cy, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            return;
        }

        ctx.save();
        ctx.globalCompositeOperation = 'source-over'; // Classic watercolor layering

        const distance = Math.hypot(x - lastX, y - lastY);
        const steps = isFirstPoint ? 1 : Math.max(1, Math.floor(distance / (size * 0.15)));

        if (mode === 'brush') {
            for (let i = 0; i < steps; i++) {
                const t = steps > 1 ? i / steps : 1;
                const cx = lastX + (x - lastX) * t;
                const cy = lastY + (y - lastY) * t;

                // 1. Core soft radial color wash (very low opacity for layering build-up)
                ctx.save();
                ctx.globalAlpha = opacity * 0.4;
                const grad = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size);
                grad.addColorStop(0, color);
                grad.addColorStop(0.3, color);
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(cx, cy, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // 2. Soft wet bleeding effect (occasional random spread offsets)
                if (Math.random() < 0.15) {
                    ctx.save();
                    ctx.globalAlpha = opacity * 0.2;
                    const bleedSize = size * (0.6 + Math.random() * 0.8);
                    const offsetX = (Math.random() - 0.5) * size * 1.0;
                    const offsetY = (Math.random() - 0.5) * size * 1.0;
                    
                    const bleedGrad = ctx.createRadialGradient(
                        cx + offsetX, 
                        cy + offsetY, 
                        bleedSize * 0.05, 
                        cx + offsetX, 
                        cy + offsetY, 
                        bleedSize
                    );
                    bleedGrad.addColorStop(0, color);
                    bleedGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    
                    ctx.fillStyle = bleedGrad;
                    ctx.beginPath();
                    ctx.arc(cx + offsetX, cy + offsetY, bleedSize, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }

                // 3. Raw pigment granules texture (simulating paper grain)
                if (Math.random() < 0.25) {
                    ctx.save();
                    ctx.globalAlpha = opacity * 0.6;
                    const grainSize = 0.5 + Math.random() * 2;
                    const offsetX = (Math.random() - 0.5) * size * 0.85;
                    const offsetY = (Math.random() - 0.5) * size * 0.85;
                    
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(cx + offsetX, cy + offsetY, grainSize, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }
        } else if (mode === 'splatter') {
            // Paints watercolor drops and random splatters
            for (let i = 0; i < steps; i++) {
                const t = steps > 1 ? i / steps : 1;
                const cx = lastX + (x - lastX) * t;
                const cy = lastY + (y - lastY) * t;

                if (Math.random() < 0.3) {
                    const numSplats = 3 + Math.floor(Math.random() * 5);
                    for (let j = 0; j < numSplats; j++) {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = Math.random() * size * 1.5;
                        const sx = cx + Math.cos(angle) * dist;
                        const sy = cy + Math.sin(angle) * dist;
                        const splatSize = 1 + Math.random() * (size * 0.2);

                        ctx.save();
                        ctx.globalAlpha = opacity * (0.3 + Math.random() * 0.6);
                        
                        const splatGrad = ctx.createRadialGradient(sx, sy, splatSize * 0.05, sx, sy, splatSize);
                        splatGrad.addColorStop(0, color);
                        splatGrad.addColorStop(0.5, color);
                        splatGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                        ctx.fillStyle = splatGrad;
                        ctx.beginPath();
                        ctx.arc(sx, sy, splatSize, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }
            }
        }
        ctx.restore();
    };

    // Pointer event handlers
    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        
        // Touch or mouse support
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        // Only draw if control palette is not clicked
        if (e.target.closest('.watercolor-palette')) return;
        
        isDrawingRef.current = true;
        const coord = getCoordinates(e);
        lastPointRef.current = coord;
        
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawWatercolor(
                ctx, 
                coord.x, 
                coord.y, 
                coord.x, 
                coord.y, 
                currentColor, 
                brushSize, 
                brushOpacity, 
                brushMode, 
                true
            );
        }
    };

    const draw = (e) => {
        if (!isDrawingRef.current) return;
        e.preventDefault(); // Prevents touch scrolling while painting
        
        const coord = getCoordinates(e);
        const canvas = canvasRef.current;
        
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawWatercolor(
                ctx, 
                coord.x, 
                coord.y, 
                lastPointRef.current.x, 
                lastPointRef.current.y, 
                currentColor, 
                brushSize, 
                brushOpacity, 
                brushMode, 
                false
            );
        }
        lastPointRef.current = coord;
    };

    const stopDrawing = () => {
        isDrawingRef.current = false;
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const handleExit = () => {
        handleClear();
        setShowPalette(false);
        setIsVisible(false);
    };

    // Do not render anything if not unlocked
    if (!isVisible) return null;

    return (
        <div className={`watercolor-container ${showPalette ? 'painting-active' : ''}`}>
            
            {/* Painting Canvas */}
            <canvas
                ref={canvasRef}
                className={`watercolor-canvas ${showPalette ? 'brush-cursor-active' : ''}`}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />

            {/* Watercolor Activation Toast */}
            <div className={`paint-hint-toast ${showHint ? 'visible' : ''}`}>
                🎨 <span>Watercolor Paint Active! Click & drag on Hero to paint.</span>
            </div>

            {/* Float control button if palette is minimized but canvas is active */}
            {!showPalette && (
                <button 
                    className="action-btn btn-primary"
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 99999,
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                    onClick={() => setShowPalette(true)}
                >
                    🎨 Open Palette
                </button>
            )}

            {/* Glassmorphic Palette Widget */}
            <div className={`watercolor-palette ${showPalette ? 'visible' : ''}`}>
                
                <div className="palette-header">
                    <div className="palette-title">
                        <span>Sayak's Watercolor Palette 🎨</span>
                        <span className="palette-subtitle">(Easter Egg unlocked!)</span>
                    </div>
                    <button className="palette-close-btn" onClick={() => setShowPalette(false)} aria-label="Minimize palette">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Color choices grid */}
                <div className="palette-colors-section">
                    <div className="control-label">
                        <span>Select Pigment</span>
                        <span style={{ color: currentColor, fontWeight: 'bold' }}>
                            {PRESET_COLORS.find(c => c.hex.toLowerCase() === currentColor.toLowerCase())?.name || 'Custom'}
                        </span>
                    </div>
                    <div className="color-grid">
                        {PRESET_COLORS.map((color, i) => (
                            <button
                                key={i}
                                className={`color-swatch ${currentColor.toLowerCase() === color.hex.toLowerCase() ? 'active' : ''}`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => setCurrentColor(color.hex)}
                                title={color.name}
                            />
                        ))}
                        {/* Custom picker */}
                        <div className={`color-picker-container ${!PRESET_COLORS.some(c => c.hex.toLowerCase() === currentColor.toLowerCase()) ? 'active' : ''}`}>
                            <input 
                                type="color" 
                                className="custom-color-input"
                                value={currentColor}
                                onChange={(e) => setCurrentColor(e.target.value)}
                                title="Custom Color Picker"
                            />
                        </div>
                    </div>
                </div>

                {/* Size and transparency controls */}
                <div className="palette-controls">
                    <div className="control-group">
                        <div className="control-label">
                            <span>Brush Size</span>
                            <span className="control-value">{brushSize}px</span>
                        </div>
                        <div className="slider-container">
                            <input
                                type="range"
                                className="palette-slider"
                                min="10"
                                max="85"
                                value={brushSize}
                                onChange={(e) => setBrushSize(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="control-group">
                        <div className="control-label">
                            <span>Water Density (Flow)</span>
                            <span className="control-value">{Math.round(brushOpacity * 100)}%</span>
                        </div>
                        <div className="slider-container">
                            <input
                                type="range"
                                className="palette-slider"
                                min="2"
                                max="45"
                                value={Math.round(brushOpacity * 100)}
                                onChange={(e) => setBrushOpacity(Number(e.target.value) / 100)}
                            />
                        </div>
                    </div>
                </div>

                {/* Brush styles and actions */}
                <div className="palette-tools-section">
                    <div className="tool-group-buttons">
                        <button 
                            className={`tool-btn ${brushMode === 'brush' ? 'active' : ''}`}
                            onClick={() => setBrushMode('brush')}
                        >
                            🖌️ Soft Wash
                        </button>
                        <button 
                            className={`tool-btn ${brushMode === 'splatter' ? 'active' : ''}`}
                            onClick={() => setBrushMode('splatter')}
                        >
                            💦 Splatter
                        </button>
                        <button 
                            className={`tool-btn ${brushMode === 'eraser' ? 'active' : ''}`}
                            onClick={() => setBrushMode('eraser')}
                        >
                            🧽 Water Wash
                        </button>
                    </div>

                    <div className="action-buttons">
                        <button className="action-btn" onClick={handleClear}>
                            🗑️ Clear
                        </button>
                        <button className="action-btn btn-danger" onClick={handleExit}>
                            ❌ Exit Egg
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatercolorCanvas;
