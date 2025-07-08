# PWA Icons Setup Guide

## Required Icon Files

The following icon files are referenced in `/public/manifest.json` but need to be created:

### App Icons (Required)
- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels
- `favicon.ico` - 32x32 pixels (standard favicon)
- `favicon.svg` - Vector version of favicon
- `apple-touch-icon.png` - 180x180 pixels (for iOS)

### Screenshot Files (Optional but recommended)
- `screenshot-wide.png` - 1280x720 pixels (desktop view)
- `screenshot-narrow.png` - 375x667 pixels (mobile view)

### Shortcut Icons (Optional)
- `icon-search-96.png` - 96x96 pixels
- `icon-post-96.png` - 96x96 pixels

### OG Images (for social sharing)
- `og-image.jpg` - 1200x630 pixels
- `og-image-square.jpg` - 1200x1200 pixels

## How to Create These Icons

### Option 1: Use an Icon Generator
1. Go to https://realfavicongenerator.net/
2. Upload your logo/brand image
3. Download the generated icon pack
4. Place all files in the `/public` directory

### Option 2: Create Manually
1. Design your logo/icon in a design tool (Figma, Canva, etc.)
2. Export in the required sizes
3. Use tools like ImageOptim to optimize file sizes

### Option 3: Use PWA Asset Generator
1. Install PWA Asset Generator: `npm install -g pwa-asset-generator`
2. Run: `pwa-asset-generator logo.png public/`
3. This will generate all required icons automatically

## Current Status
❌ icon-192.png - Missing
❌ icon-512.png - Missing  
❌ favicon.ico - Missing
❌ favicon.svg - Missing
❌ apple-touch-icon.png - Missing
❌ og-image.jpg - Missing
❌ og-image-square.jpg - Missing

## Quick Setup with Placeholder Icons

For development purposes, you can create simple placeholder icons:

1. Create a simple colored square in any image editor
2. Save it as a PNG file
3. Resize to the required dimensions
4. Place in the `/public` directory with the correct names

## Brand Guidelines

When creating icons for JairoJobs:
- Use the primary brand color (#3b82f6)
- Keep the design simple and recognizable at small sizes
- Ensure good contrast for visibility
- Consider using the "J" letter mark or briefcase icon
- Maintain consistency across all icon sizes