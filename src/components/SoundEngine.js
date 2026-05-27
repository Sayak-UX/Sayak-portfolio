/**
 * SoundEngine.js
 * Generates premium micro-interaction sounds via Web Audio API.
 * Zero audio files needed — all sounds are synthesized in-browser.
 */

let ctx = null;

const getCtx = () => {
    if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
};

/**
 * Soft mechanical tick — for hover on interactive elements
 */
export const playTick = () => {
    try {
        const ac = getCtx();
        const osc = ac.createOscillator();
        const gain = ac.createGain();

        osc.connect(gain);
        gain.connect(ac.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ac.currentTime + 0.04);

        gain.gain.setValueAtTime(0.06, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.04);

        osc.start(ac.currentTime);
        osc.stop(ac.currentTime + 0.05);
    } catch (_) {}
};

/**
 * Gentle pop — for button/link clicks
 */
export const playPop = () => {
    try {
        const ac = getCtx();

        // Low body pop
        const osc1 = ac.createOscillator();
        const gain1 = ac.createGain();
        osc1.connect(gain1);
        gain1.connect(ac.destination);

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(180, ac.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(60, ac.currentTime + 0.08);
        gain1.gain.setValueAtTime(0.18, ac.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.1);
        osc1.start(ac.currentTime);
        osc1.stop(ac.currentTime + 0.12);

        // Airy high overtone
        const osc2 = ac.createOscillator();
        const gain2 = ac.createGain();
        osc2.connect(gain2);
        gain2.connect(ac.destination);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(900, ac.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(400, ac.currentTime + 0.06);
        gain2.gain.setValueAtTime(0.05, ac.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.07);
        osc2.start(ac.currentTime);
        osc2.stop(ac.currentTime + 0.08);
    } catch (_) {}
};

/**
 * Soft whoosh — for page transitions / navigation
 */
export const playWhoosh = () => {
    try {
        const ac = getCtx();
        const bufferSize = ac.sampleRate * 0.18;
        const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
        }

        const source = ac.createBufferSource();
        source.buffer = buffer;

        const filter = ac.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(200, ac.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2000, ac.currentTime + 0.1);
        filter.Q.value = 1.5;

        const gain = ac.createGain();
        gain.gain.setValueAtTime(0.0001, ac.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ac.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.18);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ac.destination);

        source.start(ac.currentTime);
    } catch (_) {}
};

/**
 * Success chime — for form submit / positive action
 */
export const playChime = () => {
    try {
        const ac = getCtx();
        const notes = [523, 659, 784]; // C5, E5, G5 — major chord

        notes.forEach((freq, i) => {
            const osc = ac.createOscillator();
            const gain = ac.createGain();
            osc.connect(gain);
            gain.connect(ac.destination);

            osc.type = 'sine';
            const t = ac.currentTime + i * 0.07;
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.1, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

            osc.start(t);
            osc.stop(t + 0.4);
        });
    } catch (_) {}
};
/**
 * Camera shutter click — 3-layer synthesis:
 *  1. Sharp noise burst  → mechanical click
 *  2. Low thud          → mirror slap body
 *  3. High-freq tick    → shutter blade snap
 */
export const playShutter = () => {
    try {
        const ac = getCtx();
        const t = ac.currentTime;

        // ── Layer 1: Sharp noise burst (the "click") ──
        const noiseLen = ac.sampleRate * 0.04;
        const noiseBuf = ac.createBuffer(1, noiseLen, ac.sampleRate);
        const noiseData = noiseBuf.getChannelData(0);
        for (let i = 0; i < noiseLen; i++) noiseData[i] = Math.random() * 2 - 1;

        const noiseSrc = ac.createBufferSource();
        noiseSrc.buffer = noiseBuf;

        const noiseFilter = ac.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 3000;

        const noiseGain = ac.createGain();
        noiseGain.gain.setValueAtTime(0.55, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ac.destination);
        noiseSrc.start(t);

        // ── Layer 2: Low thud (mirror slap body) ──
        const thudOsc = ac.createOscillator();
        const thudGain = ac.createGain();
        thudOsc.connect(thudGain);
        thudGain.connect(ac.destination);

        thudOsc.type = 'sine';
        thudOsc.frequency.setValueAtTime(120, t);
        thudOsc.frequency.exponentialRampToValueAtTime(40, t + 0.06);
        thudGain.gain.setValueAtTime(0.35, t);
        thudGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
        thudOsc.start(t);
        thudOsc.stop(t + 0.1);

        // ── Layer 3: High tick (shutter blade) — slight delay ──
        const tickOsc = ac.createOscillator();
        const tickGain = ac.createGain();
        tickOsc.connect(tickGain);
        tickGain.connect(ac.destination);

        const t2 = t + 0.05; // slight delay — reopening click
        tickOsc.type = 'square';
        tickOsc.frequency.setValueAtTime(2200, t2);
        tickOsc.frequency.exponentialRampToValueAtTime(800, t2 + 0.03);
        tickGain.gain.setValueAtTime(0.12, t2);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.04);
        tickOsc.start(t2);
        tickOsc.stop(t2 + 0.05);

    } catch (_) {}
};
