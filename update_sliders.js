const fs = require('fs');
const path = require('path');

const dir = 'd:/Hostbolt/clients/Lines & thoughts (Haridwar)/testing 2';
const files = fs.readdirSync(dir).filter(f => f.startsWith('project-') && f.endsWith('.html'));

const projects = [
    { name: 'Avyanna', file: 'project-avyanna.html', category: 'Hospitality', image: 'website assests/Avyanna, Hospitality/01.png' },
    { name: 'Gauree', file: 'project-gauree.html', category: 'Commercial', image: 'website assests/Gauree, Commercial/01.png' },
    { name: 'Jewels Lounge', file: 'project-jewels-lounge.html', category: 'Commercial', image: 'website assests/Jewels Lounge, Commercial/01.png' },
    { name: 'Moshams', file: 'project-moshams.html', category: 'Hospitality', image: 'website assests/MoShams, Hospitality/01.jpg' },
    { name: 'The Burnt Wall', file: 'project-the-burnt-wall.html', category: 'Commercial', image: 'website assests/The Burnt Wall, Commercial/01.png' },
    { name: 'The Calm House', file: 'project-the-calm-house.html', category: 'Residential', image: 'website assests/The Calm House, Residential/01.jpg' },
    { name: 'The Designers\' Den', file: 'project-designers-den.html', category: 'Commercial', image: 'projects/07.jpg' },
    { name: 'The Flowing Canopy', file: 'project-the-flowing-canopy.html', category: 'Hospitality', image: 'website assests/The Flowing Canopy, Hospitality/01.jpg' },
    { name: 'The Laxmi Narayan', file: 'project-the-laxmi-narayan.html', category: 'Residential', image: 'website assests/The Laxmi Narayan, Residential/01.png' },
    { name: 'The Linear Office', file: 'project-the-linear-office.html', category: 'Commercial', image: 'website assests/The Linear Office, Commercial/01.jpg' },
    { name: 'The Mud Villas', file: 'project-the-mud-villas.html', category: 'Hospitality', image: 'website assests/The Mud Villas, Hospitality/01.png' }
];

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Determine current project's category
    const currentProject = projects.find(p => p.file === file);
    if (!currentProject) {
        console.log(`Could not find project info for ${file}`);
        return;
    }
    
    // Find matching projects
    const matchingProjects = projects.filter(p => p.category === currentProject.category && p.file !== currentProject.file);
    
    // Generate new slider HTML
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
    
    // Replace the old slider. 
    // The old slider starts at <div class="horizontal-slider" id="project-slider"> and ends at the corresponding </div> before <button class="slider-arrow right-arrow"
    const regex = /<div class="horizontal-slider" id="project-slider">[\s\S]*?<\/div>\s*<button class="slider-arrow right-arrow"/;
    if (regex.test(content)) {
        content = content.replace(regex, `${sliderHtml}\n                <button class="slider-arrow right-arrow"`);
        fs.writeFileSync(filePath, content);
        console.log(`Updated slider for ${file}`);
    } else {
        console.log(`Could not find slider regex in ${file}`);
    }
});
