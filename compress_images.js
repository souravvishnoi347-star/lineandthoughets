const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'optimized-assets');
const outputDir = path.join(__dirname, 'optimized-assets');

function ensureDirSync(dirpath) {
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true });
    }
}

async function processDirectory(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        const relativePath = path.relative(inputDir, fullPath);
        const outputPath = path.join(outputDir, relativePath);

        if (entry.isDirectory()) {
            ensureDirSync(outputPath);
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                try {
                    const image = sharp(fullPath);
                    const metadata = await image.metadata();

                    // Resize if larger than 1920px
                    let pipeline = image;
                    if (metadata.width > 1920 || metadata.height > 1920) {
                        pipeline = pipeline.resize({
                            width: 1920,
                            height: 1920,
                            fit: 'inside',
                            withoutEnlargement: true
                        });
                    }

                    if (ext === '.jpg' || ext === '.jpeg') {
                        await pipeline.jpeg({ quality: 80 }).toFile(outputPath);
                    } else if (ext === '.png') {
                        await pipeline.png({ quality: 80, compressionLevel: 8 }).toFile(outputPath);
                    }
                    console.log(`Saved: ${relativePath}`);
                } catch (err) {
                    console.error(`Error processing ${relativePath}:`, err);
                }
            } else {
                try {
                    fs.copyFileSync(fullPath, outputPath);
                    console.log(`Copied: ${relativePath}`);
                } catch (err) {
                    console.error(`Error copying ${relativePath}:`, err);
                }
            }
        }
    }
}

async function run() {
    ensureDirSync(outputDir);
    console.log('Starting image compression...');
    await processDirectory(inputDir);
    console.log('Compression complete!');
}

run();
