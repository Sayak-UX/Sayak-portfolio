import fs from 'fs';

function getPngDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    // PNG signature check
    if (buffer.toString('ascii', 1, 4) !== 'PNG') {
        throw new Error('Not a PNG file');
    }
    const width = buffer.readInt32BE(16);
    const height = buffer.readInt32BE(20);
    return { width, height };
}

try {
    const dims = getPngDimensions('photo frame.png');
    console.log(`Dimensions of photo frame.png: ${dims.width}x${dims.height}`);
} catch (e) {
    console.error(e);
}
