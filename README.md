# ASCII Art Creator

A powerful web-based ASCII art generator that transforms images into beautiful ASCII representations with alpha channel support.

## Features

### Core Functionality
- **Image to ASCII Conversion**: Upload any image and convert it to ASCII art
- **Multiple Character Sets**: Choose from 6 different character sets for varied artistic styles
- **Alpha Channel Support**: Preserves transparency for layered compositions
- **Color Modes**: Monochrome, grayscale, and full color HTML output
- **Real-time Preview**: See changes instantly as you adjust settings

### Character Sets Available
1. **Standard**: `.·:;+=xX#%@█` - Classic ASCII gradient
2. **Dense**: `.,-~:;=!*#$@` - More detailed representation
3. **Blocks**: `░▒▓█` - Unicode block characters for smooth gradients
4. **Artistic**: `·•◦○◉●◐◑◒◓` - Circular elements for artistic effect
5. **Simple**: `.oO@` - Minimalist approach
6. **Extended**: 70+ character gradient for maximum detail

### Advanced Options
- **Brightness Algorithms**:
  - Luminance (ITU-R BT.709 standard)
  - Perceived (Human eye weighted)
  - Average (Simple RGB average)
- **Adjustable Width**: Control output resolution (10-300 characters)
- **Alpha Threshold**: Fine-tune transparency handling
- **Invert Mode**: Reverse the brightness mapping

## Usage

1. **Open the Application**: Simply open `ascii-creator.html` in your web browser
2. **Upload an Image**: Click the upload area or drag & drop an image
3. **Adjust Settings**: Customize character set, width, and algorithms
4. **Convert**: The conversion happens automatically or click "Convert to ASCII"
5. **Export**: Download as text file or HTML with styling

## Supported Formats
- JPG/JPEG
- PNG (with alpha channel)
- GIF
- WebP

## Export Options
- **Plain Text**: ASCII art as .txt file
- **HTML**: Styled HTML file with colors preserved
- **Clipboard**: Copy directly to clipboard

## Claude Skills Integration

This project includes custom Claude Skills for enhanced development:

### ASCII Interpreter Skill
Located in `.claude/skills/ascii-interpreter/`, this skill provides:
- Character mapping rules and algorithms
- Brightness calculation methods
- Alpha channel processing logic
- Performance optimization techniques

### Additional Skills
- **webapp-testing**: Automated testing capabilities
- **git-commit-helper**: Smart git commit generation
- **artifacts-builder**: HTML artifact creation tools

## Performance

- Processes 1920x1080 images in < 2 seconds
- Real-time preview updates
- Optimized character mapping algorithms
- Efficient memory management

## Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Development

### Project Structure
```
ascii-creator/
├── ascii-creator.html      # Main application
├── .claude/                # Claude Skills and configuration
│   └── skills/
│       ├── ascii-interpreter/
│       ├── webapp-testing/
│       ├── git-commit-helper/
│       └── artifacts-builder/
└── README.md
```

### Running Locally
No build process required! Simply open `ascii-creator.html` in your browser.

### Testing
The webapp-testing skill provides automated testing capabilities. Use the testing skill to validate functionality.

## Future Enhancements
- Video/GIF animation support
- Custom character set editor
- Batch processing for multiple images
- API endpoint for programmatic access
- WebAssembly optimization for larger images

## License
MIT License - Feel free to use and modify for your projects

## Credits
Built with Claude Skills framework for enhanced development capabilities.

---

**Live Demo**: Open `ascii-creator.html` in your browser to start creating ASCII art!