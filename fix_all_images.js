const fs = require('fs');
const path = require('path');

const dir = 'd:/Hostbolt/clients/Lines & thoughts (Haridwar)/testing 2';
const files = fs.readdirSync(dir).filter(f => f.startsWith('project-') && f.endsWith('.html'));

const srcDir = path.join(dir, 'website assests');

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
    if (file === 'project-designers-den.html') return;

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const folderName = projectsMap[file];
    if (!folderName) return;
    
    const projectName = folderName.split(',')[0].trim();
    const projectFolder = path.join(srcDir, folderName);
    
    if (!fs.existsSync(projectFolder)) return;
    
    // Case-insensitive check
    const images = fs.readdirSync(projectFolder).filter(f => {
        const ext = f.toLowerCase();
        return ext.endsWith('.jpg') || ext.endsWith('.png') || ext.endsWith('.jpeg');
    });
    
    if (images.length === 0) return;
    
    // 1. Fix Hero Image
    const heroImage = `website assests/${folderName}/${images[0]}`;
    const imgRegex = /<img\s+src="[^"]+"\s+id="dynamic-hero-img"\s+alt="[^"]*">/g;
    
    if (imgRegex.test(content)) {
        content = content.replace(imgRegex, `<img src="${heroImage}" id="dynamic-hero-img" alt="${projectName}">`);
    }
    
    // 2. Fix Gallery
    const galleryRegex = /<div class="project-gallery-carousel">[\s\S]*?<\/div>/;
    let galleryHtml = '<div class="project-gallery-carousel">\n';
    images.forEach(img => {
        galleryHtml += `                    <img src="website assests/${folderName}/${img}" alt="Project Image">\n`;
    });
    galleryHtml += '                </div>';
    
    if (galleryRegex.test(content)) {
        content = content.replace(galleryRegex, galleryHtml);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fully fixed ${file}`);
});
