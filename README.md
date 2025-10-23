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

## 🔮 Upcoming Tools

### Color Palette Generator
- Extract palettes from images
- Generate harmonious color schemes
- Export to CSS, JSON, design tokens
- Accessibility checking

### SVG Pattern Maker
- Visual pattern editor
- Seamless tiling
- Animation support
- Code export

### CSS Animation Studio
- Timeline-based animation editor
- Easing curve designer
- Live preview
- Optimized code generation

### Base64 Studio
- Encode/decode Base64 data
- Image preview
- Data URI generation
- Batch processing

### JSON Studio
- Format and validate JSON
- Schema validation
- Diff comparison
- Path extraction

## 🎯 Features

### All Tools Share:
- **Zero Dependencies**: Pure HTML/CSS/JavaScript
- **Offline Capable**: Works without internet connection
- **Responsive Design**: Mobile and desktop optimized
- **Fast Performance**: Optimized algorithms
- **Privacy First**: All processing happens client-side
- **Export Options**: Multiple output formats

## 🏗️ Project Structure

```
YS-studio-artifacts/
├── index.html                 # Main portal page
├── tools/                     # Individual tools
│   ├── ascii-creator/        # ASCII art generator
│   │   └── index.html
│   ├── color-palette/        # (Coming soon)
│   ├── svg-patterns/         # (Coming soon)
│   ├── css-animations/       # (Coming soon)
│   ├── base64-studio/        # (Coming soon)
│   └── json-studio/          # (Coming soon)
├── .claude/                   # Claude Skills and configuration
│   └── skills/
│       ├── ascii-interpreter/ # ASCII conversion logic
│       ├── webapp-testing/    # Testing capabilities
│       ├── git-commit-helper/ # Smart commits
│       └── artifacts-builder/ # HTML artifact tools
└── shared/                    # (Future) Shared resources
    ├── styles/               # Common styles
    └── scripts/              # Shared utilities
```

## 💻 Usage

### Quick Start
1. Clone the repository
2. Open `index.html` in your browser
3. Choose a tool from the gallery
4. No build process or installation required!

### Direct Tool Access
Each tool can be accessed directly:
- ASCII Creator: `/tools/ascii-creator/index.html`
- More tools coming soon!

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

## 🎨 Design Philosophy

1. **Simplicity First**: Clean, intuitive interfaces
2. **Power When Needed**: Advanced features don't clutter the basics
3. **Visual Feedback**: Real-time previews and clear status indicators
4. **Consistent Experience**: Unified design language across all tools
5. **Performance Matters**: Optimized for speed and efficiency

## 🤝 Contributing

We welcome contributions! Each tool should:
- Be self-contained in its own directory
- Include no external dependencies
- Follow the established design patterns
- Include comprehensive documentation
- Be thoroughly tested

## 📄 License

MIT License - Use these tools freely in your projects!

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **GitHub**: [YS-studio-artifacts](https://github.com/YS-studio-artifacts)
- **Documentation**: [In Progress]

## 🙏 Credits

Built with Claude Skills framework for enhanced development capabilities.

---

**Note**: This is an actively growing collection. Star the repo to stay updated with new tools!