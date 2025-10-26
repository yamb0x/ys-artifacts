# Tool Thumbnails

This folder contains preview thumbnails for all YS Studio Artifacts tools, displayed on the main index.html page.

## File Naming Convention
- Format: `[tool-name].png`
- Example: `ascii-creator.png`, `text-visualizer.png`, `sickollage.png`

## Specifications
- **Dimensions**: 800x560px (maintains 10:7 aspect ratio for 280px height display)
- **Format**: PNG (supports transparency)
- **File Size**: Aim for < 500KB (optimize with tools like TinyPNG)
- **Content**: Representative screenshot or preview of the tool in action

## Current Thumbnails
- ✅ `sickollage.png` - Sickollage glitch art preview
- ✅ `displacement-mapper.png` - Displacement mapper effects preview
- ⏳ `ascii-creator.png` - **TODO**: Create from ASCII Creator tool
- ⏳ `text-visualizer.png` - **TODO**: Create from Text Visualizer tool

## Updating Thumbnails
1. Create or capture new thumbnail image (800x560px recommended)
2. Optimize file size if needed
3. Save as `[tool-name].png` in this folder
4. Commit and push to GitHub
5. Changes will appear immediately on the live site

## Creating Thumbnails
### Option 1: Screenshot from Tool
1. Open the tool in browser
2. Create interesting example output
3. Take screenshot
4. Crop to tool preview area
5. Resize to 800x560px

### Option 2: Custom Design
- Use Figma, Photoshop, or similar
- Follow YS Studio design system (black, white, accent colors)
- Export as PNG

## Notes
- Thumbnails are grayscale filtered by default in index.html
- Color appears on hover for visual effect
- Keep visual style consistent across all tools
- Ensure thumbnail represents the tool's core functionality
