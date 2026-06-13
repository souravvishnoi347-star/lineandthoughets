const fs = require('fs');
const path = require('path');

const dir = 'd:/Hostbolt/clients/Lines & thoughts (Haridwar)/testing 2';
const srcDir = path.join(dir, 'website assests');

const files = fs.readdirSync(dir).filter(f => f.startsWith('project-') && f.endsWith('.html'));

const projects = [
    { name: 'Avyanna', file: 'project-avyanna.html', category: 'Hospitality', folder: 'Avyanna, Hospitality' },
    { name: 'Gauree', file: 'project-gauree.html', category: 'Commercial', folder: 'Gauree, Commercial' },
    { name: 'Jewels Lounge', file: 'project-jewels-lounge.html', category: 'Commercial', folder: 'Jewels Lounge, Commercial' },
    { name: 'Moshams', file: 'project-moshams.html', category: 'Hospitality', folder: 'MoShams, Hospitality' },
    { name: 'The Burnt Wall', file: 'project-the-burnt-wall.html', category: 'Commercial', folder: 'The Burnt Wall, Commercial' },
    { name: 'The Calm House', file: 'project-the-calm-house.html', category: 'Residential', folder: 'The Calm House, Residential' },
    { name: 'The Designers\' Den', file: 'project-designers-den.html', category: 'Commercial', folder: "The Designers' Den, Commercial" },
    { name: 'The Flowing Canopy', file: 'project-the-flowing-canopy.html', category: 'Hospitality', folder: 'The Flowing Canopy, Hospitality' },
    { name: 'The Laxmi Narayan', file: 'project-the-laxmi-narayan.html', category: 'Residential', folder: 'The Laxmi Narayan, Residential' },
    { name: 'The Linear Office', file: 'project-the-linear-office.html', category: 'Commercial', folder: 'The Linear Office, Commercial' },
    { name: 'The Mud Villas', file: 'project-the-mud-villas.html', category: 'Hospitality', folder: 'The Mud Villas, Hospitality' }
];

// Pre-compute actual hero images for all projects
projects.forEach(p => {
    // Hardcoded fallback for designers den if folder doesn't match perfectly
    if (p.name === "The Designers' Den") {
        p.image = 'projects/07.jpg';
    } else {
        const pPath = path.join(srcDir, p.folder);
        if (fs.existsSync(pPath)) {
            const imgs = fs.readdirSync(pPath).filter(f => {
                const ext = f.toLowerCase();
                return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png');
            });
            if (imgs.length > 0) {
                p.image = `website assests/${p.folder}/${imgs[0]}`;
            } else {
                p.image = 'assets/office.jpg'; // fallback
            }
        } else {
            p.image = 'assets/office.jpg'; // fallback
        }
    }
});

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const currentProject = projects.find(p => p.file === file);
    if (!currentProject) return;
    
    // Find matching projects for slider
    const matchingProjects = projects.filter(p => p.category === currentProject.category && p.file !== currentProject.file);
    
    let sliderHtml = '<div class="horizontal-slider" id="project-slider">\n';
    matchingProjects.forEach(p => {
        sliderHtml += `                    <a href="${p.file}" class="slider-card">
                        <img src="${p.image}" alt="${p.name}">
                        <div class="slider-info">
                            <span style="font-size: 10px; letter-spacing: 2px; color: #ddd; text-transform: uppercase;">${p.category}</span>
                            <h4 style="font-size: 18px; margin-top: 5px; text-transform: uppercase;">${p.name}</h4>
                        </div>
                    </a>\n`;
    });
    sliderHtml += '                </div>';
    
    // The previous update_sliders.js might have replaced this block
    const regex = /<div class="horizontal-slider" id="project-slider">[\s\S]*?<\/div>\s*<button class="slider-arrow right-arrow"/;
    if (regex.test(content)) {
        content = content.replace(regex, `${sliderHtml}\n                <button class="slider-arrow right-arrow"`);
        fs.writeFileSync(filePath, content);
        console.log(`Fixed explore slider in ${file}`);
    } else {
        console.log(`Could not find slider to fix in ${file}`);
    }
});
