const fs = require('fs');
const path = require('path');

const dir = 'd:/Hostbolt/clients/Lines & thoughts (Haridwar)/testing 2';

// 1. Add CSS to style.css
const cssPath = path.join(dir, 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const newCSS = `
/* =========================================
   PROJECT GALLERY SWIPEABLE CAROUSEL
========================================= */
.project-gallery-carousel {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin-top: 40px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    cursor: grab;
}
.project-gallery-carousel:active { cursor: grabbing; }
.project-gallery-carousel::-webkit-scrollbar { display: none; }
.project-gallery-carousel img {
    height: 450px;
    width: 85%;
    flex: 0 0 auto;
    object-fit: cover;
    scroll-snap-align: center;
}

@media screen and (max-width: 768px) {
    .project-gallery-carousel img {
        height: 300px;
        width: 90%;
    }
}
`;

if (!cssContent.includes('.project-gallery-carousel')) {
    fs.writeFileSync(cssPath, cssContent + newCSS);
    console.log('Added gallery CSS to style.css');
}

// 2. Update HTML files
const files = fs.readdirSync(dir).filter(f => f.startsWith('project-') && f.endsWith('.html'));
const srcDir = path.join(dir, 'optimized-assets');

const projectsMap = {
    'project-avyanna.html': 'Avyanna, Hospitality',
    'project-gauree.html': 'Gauree, Commercial',
    'project-jewels-lounge.html': 'Jewels Lounge, Commercial',
    'project-moshams.html': 'MoShams, Hospitality',
    'project-the-burnt-wall.html': 'The Burnt Wall, Commercial',
    'project-the-calm-house.html': 'The Calm House, Residential',
    'project-the-flowing-canopy.html': 'The Flowing Canopy, Hospitality',
    'project-the-laxmi-narayan.html': 'The Laxmi Narayan, Residential',
    'project-the-linear-office.html': 'The Linear Office, Commercial',
    'project-the-mud-villas.html': 'The Mud Villas, Hospitality'
};

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the single content image
    // E.g., <img src="Avyanna, Hospitality/02.png" style="width: 100%; margin-top: 40px; margin-bottom: 20px;" alt="Avyanna Interior">
    const imgRegex = /<img src="[^"]+" style="width: 100%; margin-top: 40px; margin-bottom: 20px;"[^>]*>/;
    
    let folderName;
    if (file === 'project-designers-den.html') {
        folderName = "The Designers' Den, Commercial";
    } else {
        folderName = projectsMap[file];
    }
    
    if (!folderName) {
        console.log(`Skipping ${file}`);
        return;
    }
    
    const projectFolder = path.join(srcDir, folderName);
    if (!fs.existsSync(projectFolder)) {
        console.log(`Folder not found: ${projectFolder}`);
        return;
    }
    
    const images = fs.readdirSync(projectFolder).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    
    // Build the gallery HTML
    let galleryHtml = '<div class="project-gallery-carousel">\n';
    images.forEach(img => {
        galleryHtml += `                    <img src="${folderName}/${img}" alt="Project Image">\n`;
    });
    galleryHtml += '                </div>';
    
    if (imgRegex.test(content)) {
        content = content.replace(imgRegex, galleryHtml);
        fs.writeFileSync(filePath, content);
        console.log(`Updated gallery for ${file}`);
    } else {
        console.log(`Could not find the target image to replace in ${file}`);
    }
});
