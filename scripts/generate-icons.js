#!/usr/bin/env node

/**
 * Quick script to generate placeholder icons for development
 * Run with: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a simple SVG icon
const createSVGIcon = (size, color = '#3b82f6') => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="${color}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold">J</text>
</svg>`;
};

// Create favicon.ico placeholder (simple text file for now)
const faviconContent = `# This is a placeholder favicon.ico file
# Replace this with a real .ico file for production
# You can create one at: https://realfavicongenerator.net/
`;

// Create basic manifest-compliant SVG
const manifestIcon = createSVGIcon(512);

// Write files
try {
  // Write SVG favicon
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), createSVGIcon(32));
  console.log('✅ Created favicon.svg');

  // Write placeholder favicon.ico note
  fs.writeFileSync(path.join(publicDir, 'favicon.ico.txt'), faviconContent);
  console.log('✅ Created favicon.ico.txt (placeholder)');

  // Write large icon for manifest
  fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), manifestIcon);
  console.log('✅ Created icon-512.svg');

  console.log('\n🎉 Basic placeholder icons created!');
  console.log('\nFor production, you should:');
  console.log('1. Create proper PNG/ICO files');
  console.log('2. Use a service like https://realfavicongenerator.net/');
  console.log('3. Replace placeholder files with branded icons');
  console.log('4. Update manifest.json with correct file references');

} catch (error) {
  console.error('❌ Error creating icons:', error);
}