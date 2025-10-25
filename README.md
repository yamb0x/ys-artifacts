# YS Studio Artifacts

> A curated collection of powerful web-based studio tools and creative utilities for modern development workflows.

## 🚀 Overview

YS Studio Artifacts is a growing collection of standalone HTML tools designed for both internal studio use and public deployment. Each tool is self-contained, dependency-free, and optimized for performance.

## 🛠️ Available Tools

### 1. [ASCII Art Creator](tools/ascii-creator/index_v3.html)
Transform images into stunning ASCII art with advanced features:
- 6 different character sets (standard, simple, blocks, extended, binary, custom)
- Multiple brightness algorithms (average, luminosity, lightness, value, luma)
- 7 color modes (mono, html, duotone, gradient, matrix, retro, cyberpunk)
- Real-time preview with adjustable parameters
- Export to TXT, HTML, PNG (2K/4K with alpha channel)

**Status**: ✅ Live | **Presets**: ✅ Integrated

### 2. [Text Visualizer](tools/text-visualizer/)
Create animated typographic patterns with real-time effects:
- 6 pattern types (grid, circle, wave, spiral, random, orbital)
- Multiple animation effects (oscillate, rotate, breathe, wave)
- Advanced mode with repetitions, fragmentation, density control
- Real-time canvas rendering at 60 FPS
- Export frames as PNG images

**Status**: ✅ Live | **Presets**: ✅ Integrated


## 🎯 Features

### All Tools Share:
- **Zero Dependencies**: Pure HTML/CSS/JavaScript
- **Offline Capable**: Works without internet connection
- **Responsive Design**: Mobile and desktop optimized
- **Fast Performance**: Optimized algorithms
- **Privacy First**: All processing happens client-side
- **Export Options**: Multiple output formats

### 🎨 Preset System
All tools now include a sophisticated preset management system:
- **Random Presets**: Automatic random preset loading on startup
- **Cloud Storage**: Firebase Firestore backend for preset syncing
- **Import/Export**: JSON file support for offline sharing
- **Password Protected**: Secure saving with "yambostudio" password
- **Local Fallback**: Works offline with localStorage caching
- **Parameter Safety**: Old presets work with new tool versions

For implementation details, see [Preset System Guide](docs/PRESET_SYSTEM_GUIDE.md)


## 🤖 Claude Skills Integration

This project leverages Claude Skills for enhanced development:

### Custom Skills
- **ascii-interpreter**: Character mapping algorithms and brightness calculations
- **webapp-testing**: Automated testing framework
- **git-commit-helper**: Intelligent commit message generation
- **artifacts-builder**: HTML artifact creation utilities

### Planned Skills
- **vercel-deployer**: One-click Vercel deployment
- **design-system**: Consistent design tokens and components
- **performance-monitor**: Real-time performance analytics

## 🚀 Deployment

### GitHub Pages
The entire collection can be deployed to GitHub Pages:
```bash
git push origin main
# Enable GitHub Pages in repository settings
```

### Vercel (Coming Soon)
One-click deployment with Vercel skill integration.

### Self-Hosting
Simply serve the files with any static file server:
```bash
python -m http.server 8000
# or
npx serve
```