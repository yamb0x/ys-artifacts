# YS Studio Artifacts

> A curated collection of powerful web-based studio tools and creative utilities for modern development workflows.

## 🚀 Overview

YS Studio Artifacts is a growing collection of standalone HTML tools designed for both internal studio use and public deployment. Each tool is self-contained, dependency-free, and optimized for performance.

## 🛠️ Available Tools

### 1. [ASCII Art Creator](tools/ascii-creator/)
Transform images into stunning ASCII art with advanced features:
- 6 different character sets (standard, dense, blocks, artistic, simple, extended)
- Alpha channel support with adjustable threshold
- Multiple brightness algorithms
- Color modes (monochrome, grayscale, full color)
- Real-time preview and multiple export options

**Status**: ✅ Live


## 🎯 Features

### All Tools Share:
- **Zero Dependencies**: Pure HTML/CSS/JavaScript
- **Offline Capable**: Works without internet connection
- **Responsive Design**: Mobile and desktop optimized
- **Fast Performance**: Optimized algorithms
- **Privacy First**: All processing happens client-side
- **Export Options**: Multiple output formats


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