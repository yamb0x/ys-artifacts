---
name: ASCII Interpreter
description: Advanced ASCII art conversion with customizable character mapping, brightness algorithms, and alpha channel support for creating beautiful ASCII representations from images and videos
priority: high
---

# ASCII Interpreter Skill

Transform images and videos into stunning ASCII art with advanced character mapping and alpha channel support.

## Core Capabilities

### 1. Character Mapping Rules
The ASCII interpreter uses brightness-based character mapping with multiple character sets:

#### Standard ASCII Set (Low to High Brightness)
```javascript
const STANDARD_ASCII = ' .·:;+=xX#%@█';
// Brightness ranges: 0-20, 21-40, 41-60, 61-80, 81-100, 101-120, 121-140, 141-160, 161-180, 181-200, 201-220, 221-255
```

#### Dense ASCII Set
```javascript
const DENSE_ASCII = ' .,-~:;=!*#$@';
// More characters for higher detail
```

#### Block Elements Set
```javascript
const BLOCK_ASCII = ' ░▒▓█';
// Unicode block characters for smoother gradients
```

#### Artistic Set
```javascript
const ARTISTIC_ASCII = ' ·•◦○◉●◐◑◒◓';
// Circular elements for artistic effect
```

### 2. Brightness Calculation Algorithms

#### Standard Luminance
```javascript
function calculateLuminance(r, g, b) {
  // ITU-R BT.709 standard
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

#### Perceived Brightness
```javascript
function perceivedBrightness(r, g, b) {
  // Human eye perception weighted
  return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
}
```

### 3. Alpha Channel Processing

#### Transparency Handling
```javascript
function processAlpha(alpha, char, threshold = 128) {
  if (alpha < threshold) {
    return ' '; // Fully transparent
  }
  // Blend character with alpha
  return char;
}
```

#### Alpha Blending
```javascript
function alphaBlend(foreground, background, alpha) {
  const a = alpha / 255;
  return {
    char: a > 0.5 ? foreground : background,
    opacity: a
  };
}
```

### 4. Image Processing Pipeline

1. **Load Image**: Read image data with alpha channel
2. **Resize/Sample**: Adjust resolution for ASCII output
3. **Calculate Brightness**: Apply selected algorithm
4. **Map to Characters**: Use selected character set
5. **Apply Alpha**: Process transparency
6. **Generate Output**: Create final ASCII art

### 5. Video Processing

#### Frame Extraction
```javascript
async function processVideo(videoPath, options) {
  const frames = await extractFrames(videoPath, options.fps);
  const asciiFrames = [];

  for (const frame of frames) {
    const ascii = await convertToAscii(frame, options);
    asciiFrames.push(ascii);
  }

  return asciiFrames;
}
```

### 6. Optimization Techniques

#### Adaptive Sampling
- Dynamic resolution based on image complexity
- Edge detection for preserving details
- Smart downsampling for performance

#### Character Density Control
```javascript
function adjustDensity(ascii, density) {
  // density: 0.0 (sparse) to 1.0 (dense)
  const step = Math.max(1, Math.floor(1 / density));
  return ascii.filter((_, i) => i % step === 0);
}
```

## Configuration Options

```javascript
const asciiConfig = {
  // Character set selection
  charset: 'standard', // standard | dense | blocks | artistic | custom
  customCharset: null, // Array of characters from dark to light

  // Processing options
  width: 80,           // Output width in characters
  height: 'auto',      // Output height (auto maintains aspect ratio)
  colorMode: 'mono',   // mono | grayscale | color

  // Algorithm selection
  brightnessAlgorithm: 'luminance', // luminance | perceived | average

  // Alpha handling
  alphaEnabled: true,
  alphaThreshold: 128, // 0-255

  // Performance
  useCaching: true,
  parallel: true,      // Use worker threads

  // Output format
  outputFormat: 'text', // text | html | svg | json
  includeStyles: true   // Add CSS/styling to output
};
```

## Usage Examples

### Basic Image Conversion
```javascript
// Convert image with standard settings
const ascii = await asciiInterpreter.convert('image.jpg');
console.log(ascii);
```

### Advanced Configuration
```javascript
// High-detail artistic conversion
const ascii = await asciiInterpreter.convert('portrait.png', {
  charset: 'artistic',
  width: 120,
  brightnessAlgorithm: 'perceived',
  alphaEnabled: true
});
```

### Video Processing
```javascript
// Convert video to ASCII animation
const frames = await asciiInterpreter.processVideo('clip.mp4', {
  fps: 15,
  width: 80,
  charset: 'blocks'
});
```

## HTML Artifact Generation

### Template Structure
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .ascii-art {
      font-family: 'Courier New', monospace;
      font-size: 10px;
      line-height: 1;
      white-space: pre;
      background: #000;
      color: #0f0;
    }
  </style>
</head>
<body>
  <div id="ascii-container" class="ascii-art"></div>
  <script>
    // ASCII conversion logic here
  </script>
</body>
</html>
```

## Best Practices

1. **Character Selection**: Choose character sets based on output medium
   - Terminal: Use standard ASCII
   - Web: Can use Unicode and custom fonts
   - Print: Consider ink density

2. **Performance**:
   - Downsample large images before processing
   - Use web workers for browser-based conversion
   - Cache processed frames for video

3. **Quality**:
   - Adjust width based on viewing distance
   - Use perceived brightness for portraits
   - Enable alpha for overlays

4. **Accessibility**:
   - Provide alt text for ASCII art
   - Consider screen reader compatibility
   - Offer high-contrast options

## Error Handling

```javascript
try {
  const ascii = await asciiInterpreter.convert(image);
} catch (error) {
  if (error.code === 'INVALID_FORMAT') {
    console.error('Unsupported image format');
  } else if (error.code === 'PROCESSING_ERROR') {
    console.error('Failed to process image:', error.message);
  }
}
```

## Testing Checklist

- [ ] Character mapping accuracy
- [ ] Alpha channel preservation
- [ ] Aspect ratio maintenance
- [ ] Performance benchmarks
- [ ] Memory usage limits
- [ ] Browser compatibility
- [ ] Mobile responsiveness