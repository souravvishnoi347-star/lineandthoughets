const fs = require('fs');
const path = require('path');

const srcDir = 'optimized-assets';
const templatePath = 'project-designers-den.html';
const templateHTML = fs.readFileSync(templatePath, 'utf8');

const folders = fs.readdirSync(srcDir).filter(f => fs.statSync(path.join(srcDir, f)).isDirectory());

folders.forEach(folder => {
    // folder looks like "Avyanna, Hospitality"
    const parts = folder.split(',');
    const projectName = parts[0].trim();
    const category = parts[1] ? parts[1].trim() : 'Project';
    
    // Slugify for URL
    const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newFilename = `project-${slug}.html`;
    
    if (newFilename === 'project-the-designers-den.html') {
        return; // Skip the template one since it already exists and is configured
    }
    
    // Get images
    const projectDir = path.join(srcDir, folder);
    const images = fs.readdirSync(projectDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    
    const image1 = images.length > 0 ? `${folder}/${images[0]}` : 'projects/07.jpg';
    const image2 = images.length > 1 ? `${folder}/${images[1]}` : 'projects/den-proj1.jpg';
    
    // Create new HTML by replacing
    let newHTML = templateHTML;
    
    // Title
    newHTML = newHTML.replace(/<title>The Designers' Den \| Lines & Thoughts<\/title>/g, `<title>${projectName} | Lines & Thoughts</title>`);
    
    // Category
    newHTML = newHTML.replace(/<span class="project-cat">Commercial<\/span>/g, `<span class="project-cat">${category}</span>`);
    
    // Main Title
    newHTML = newHTML.replace(/<h1 class="project-title-main">The Designers' Den<\/h1>/g, `<h1 class="project-title-main">${projectName}</h1>`);
    
    // Hero Image
    newHTML = newHTML.replace(/<img src="projects\/07.jpg" id="dynamic-hero-img" alt="The Designers Den">/g, `<img src="${image1}" id="dynamic-hero-img" alt="${projectName}">`);
    
    // Second Image
    newHTML = newHTML.replace(/<img src="projects\/den-proj1.jpg" style="width: 100%; margin-top: 40px; margin-bottom: 20px;">/g, `<img src="${image2}" style="width: 100%; margin-top: 40px; margin-bottom: 20px;" alt="${projectName} Interior">`);
    
    // Write the new file
    fs.writeFileSync(newFilename, newHTML);
    console.log(`Created ${newFilename}`);
});
