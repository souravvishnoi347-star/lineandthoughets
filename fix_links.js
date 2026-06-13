const fs = require('fs');
const path = require('path');

const dir = 'd:/Hostbolt/clients/Lines & thoughts (Haridwar)/testing 2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = {
    'project-avyannna.html': 'project-avyanna.html',
    'project-flowing-canopy.html': 'project-the-flowing-canopy.html',
    'project-linear-office.html': 'project-the-linear-office.html',
    'project-mud-villas.html': 'project-the-mud-villas.html',
    'project-laxmi-narayan.html': 'project-the-laxmi-narayan.html',
    'project-burnt-wall.html': 'project-the-burnt-wall.html',
    'project-calm-house.html': 'project-the-calm-house.html'
};

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix href replacements
    for (const [oldLink, newLink] of Object.entries(replacements)) {
        // use regex to replace all instances
        const regex = new RegExp(`href=["']${oldLink}["']`, 'g');
        content = content.replace(regex, `href="${newLink}"`);
    }
    
    // In index.html, convert <div class="project-card"> to <a href="..." ...>
    if (file === 'index.html') {
        // Map names to their correct links
        const nameToLink = {
            'Avyannna': 'project-avyanna.html',
            'Moshams': 'project-moshams.html',
            'The Flowing Canopy': 'project-the-flowing-canopy.html',
            'The Linear Office': 'project-the-linear-office.html',
            'The Mud Villas': 'project-the-mud-villas.html'
        };
        
        // This is a bit manual but robust for index.html
        content = content.replace(/<div class="project-card">\s*<img src="[^"]+" alt="(Avyannna|Moshams|The Flowing Canopy|The Linear Office|The Mud Villas)" class="project-img">\s*<div class="project-overlay">[\s\S]*?<\/h3>\s*<\/div>\s*<\/div>/g, (match, name) => {
            const link = nameToLink[name];
            return match.replace('<div class="project-card">', `<a href="${link}" class="project-card" style="display: block; text-decoration: none;">`).replace(/<\/div>$/, '</a>');
        });
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated links in ${file}`);
});
