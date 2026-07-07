const fs = require('fs');
const PNG = require('pngjs').PNG;

const inputPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\5aca51c0-2971-4625-b984-e5147fa313f7\\media__1783294298476.png';

const data = fs.readFileSync(inputPath);
const png = PNG.sync.read(data);

const width = png.width;
const height = png.height;

// Find columns that contain stamp pixels (which are bright cream/colors)
const colBrightness = [];
for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = 0; y < height; y++) {
        const idx = (width * y + x) << 2;
        const r = png.data[idx];
        const g = png.data[idx + 1];
        const b = png.data[idx + 2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        sum += luma;
    }
    colBrightness.push(Math.round(sum / height));
}

// Find contiguous blocks of columns with average luma > threshold
console.log('Brightness profile (selected samples):');
for (let i = 0; i < width; i += 16) {
    console.log(`x=${i}: luma=${colBrightness[i]}`);
}

const blocks = [];
let inBlock = false;
let start = 0;
const threshold = 18; // Background luma is around 8-12
for (let x = 0; x < width; x++) {
    const val = colBrightness[x];
    if (val > threshold) {
        if (!inBlock) {
            start = x;
            inBlock = true;
        }
    } else {
        if (inBlock) {
            blocks.push({ start, end: x - 1 });
            inBlock = false;
        }
    }
}
if (inBlock) {
    blocks.push({ start, end: width - 1 });
}

console.log('\nDetected blocks:');
blocks.forEach((b, i) => {
    console.log(`Block ${i}: x = ${b.start} to ${b.end} (width: ${b.end - b.start + 1})`);
});
