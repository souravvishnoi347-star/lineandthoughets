const fs = require('fs');
const path = require('path');

const dir = 'd:/Hostbolt/clients/Lines & thoughts (Haridwar)/testing 2';
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
    if (file === 'project-designers-den.html') return; // Skip original template

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const folderName = projectsMap[file];
    if (!folderName) {
        console.log(`Skipping unknown file: ${file}`);
        return;
    }
    
    const projectName = folderName.split(',')[0].trim();
    const projectFolder = path.join(srcDir, folderName);
    
    if (!fs.existsSync(projectFolder)) {
        console.log(`Folder not found: ${projectFolder}`);
        return;
    }
    
    const images = fs.readdirSync(projectFolder).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    if (images.length === 0) {
        console.log(`No images found in ${projectFolder}`);
        return;
    }
    
    const heroImage = `${folderName}/${images[0]}`;
    
    // Replace the dynamic-hero-img src and alt
    // The tag looks like: <img src="projects/07.jpg" id="dynamic-hero-img" alt="...">
    const imgRegex = /<img\s+src="[^"]+"\s+id="dynamic-hero-img"\s+alt="[^"]*">/g;
    
    if (imgRegex.test(content)) {
        content = content.replace(imgRegex, `<img src="${heroImage}" id="dynamic-hero-img" alt="${projectName}">`);
        fs.writeFileSync(filePath, content);
        console.log(`Fixed hero image for ${file}`);
    } else {
        console.log(`Could not find hero image regex match in ${file}`);
    }
});
