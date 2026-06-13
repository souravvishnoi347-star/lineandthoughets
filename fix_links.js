const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/href="([a-zA-Z0-9_-]+)\.html"/g, 'href="/$1"');
    // Also fix index.html to /
    c = c.replace(/href="\/index"/g, 'href="/"');
    fs.writeFileSync(f, c);
    console.log('Fixed ' + f);
});
