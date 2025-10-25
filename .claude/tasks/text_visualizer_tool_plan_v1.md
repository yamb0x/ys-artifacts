# Text Visualizer Tool - Implementation Plan v1
**Date**: 2025-01-25
**Project**: YS Studio Artifacts - Tool #2

## Executive Summary
Create a text visualization tool inspired by TEXTR (https://antlii.work/TEXTR-Tool) that transforms text into artistic patterns using pure HTML/CSS/JavaScript. This will be the second tool in the YS-artifacts collection, following the design system established by the ASCII Interpreter.

## Core Concept
A web-based tool that takes user input text and distributes it across a canvas in various patterns, with controls for typography and spatial arrangements. Unlike the original TEXTR which uses P5.js/Paper.js for vector manipulation, our implementation will use HTML5 Canvas API for rendering.

## Technical Constraints & Decisions

### Constraints
- **No external dependencies**: Pure HTML/CSS/JavaScript only
- **No vector libraries**: Cannot use P5.js, Paper.js, or similar
- **Black & white only**: Initial version without color (as requested)
- **No letter scaling effects**: Simplified from original (as requested)
- **Browser-native only**: Must work offline

### Technical Approach
- **Rendering Engine**: HTML5 Canvas 2D Context
- **Font System**: Web Fonts API + FontFace for custom fonts
- **Export Format**: PNG via canvas.toBlob()
- **Pattern Math**: JavaScript implementations of distribution algorithms
- **State Management**: Pure JavaScript with history for undo/redo

## Feature Set

### Phase 1 - MVP Features
1. **Text Input**
   - Multi-line text area
   - Character/word mode toggle
   - Real-time preview updates

2. **Typography Controls**
   - Font selection (5-10 curated web fonts)
   - Font size (10px - 200px)
   - Font weight (if variable font)
   - Letter spacing

3. **Distribution Patterns**
   - Grid (rows × columns)
   - Circle (radial distribution)
   - Wave (sine wave path)
   - Random scatter
   - Line (horizontal/vertical)

4. **Pattern Parameters**
   - Spacing (X/Y independently)
   - Rotation (global or per-character)
   - Opacity (global)
   - Pattern-specific controls (radius, amplitude, frequency)

5. **Export Options**
   - Download as PNG
   - Copy to clipboard
   - Multiple resolution presets

### Phase 2 - Enhanced Features (Future)
- Spiral pattern
- Custom path drawing
- Animation/motion export
- Color support
- Gradient effects
- Preset system with save/load
- SVG export option

## UI/UX Design

### Layout Structure
```
┌─────────────────────────────────────────────────┐
│                  YS HEADER                      │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌─────────────────────────┐ │
│  │              │  │                         │ │
│  │   CONTROLS   │  │      CANVAS PREVIEW     │ │
│  │              │  │                         │ │
│  │  - Text      │  │      [Real-time         │ │
│  │  - Font      │  │       Visualization]    │ │
│  │  - Pattern   │  │                         │ │
│  │  - Params    │  │                         │ │
│  │  - Export    │  │                         │ │
│  │              │  │                         │ │
│  └──────────────┘  └─────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Design System Alignment
- **Header**: Standard YS navigation (fixed, black border bottom)
- **Typography**: Suisse for UI, SangBleu for display
- **Colors**: Black (#000000) on White (#FFFFFF)
- **Spacing**: 24px padding, 40px between sections
- **Borders**: 1px solid black for panels
- **Interactions**: Opacity 0.7 on hover, red (#FF0000) for active states

### Control Panel Sections

#### 1. Text Input Section
```
TEXT INPUT
├── Textarea (3 rows, resizable)
├── Mode: [Words] [Characters] (toggle)
└── Character count display
```

#### 2. Typography Section
```
TYPOGRAPHY
├── Font: [Dropdown - Helvetica, Georgia, Courier, etc.]
├── Size: [Slider: 10-200px]
├── Weight: [Slider: 100-900]
└── Spacing: [Slider: -10 to 50]
```

#### 3. Pattern Section
```
PATTERN
├── Type: [Grid|Circle|Wave|Random|Line]
└── Dynamic parameters based on selection:
    Grid → Columns, Rows, Gap
    Circle → Radius, Count, Start Angle
    Wave → Amplitude, Frequency, Phase
    Random → Density, Bounds
    Line → Direction, Spacing
```

#### 4. Transform Section
```
TRANSFORM
├── Rotation: [Slider: 0-360°]
├── Opacity: [Slider: 0-100%]
└── □ Apply to each character (checkbox)
```

#### 5. Actions Section
```
ACTIONS
├── [Clear Canvas]
├── [Render]
└── [Export PNG ↓]
```

## Implementation Architecture

### File Structure
```
tools/
└── text-visualizer/
    ├── index.html          # Single-file tool
    └── README.md          # Documentation
```

### Core Components

#### 1. TextEngine Class
```javascript
class TextEngine {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.text = '';
    this.mode = 'characters'; // or 'words'
    this.font = {
      family: 'Helvetica',
      size: 48,
      weight: 400,
      spacing: 0
    };
  }

  render(pattern, params) { }
  clear() { }
  export() { }
}
```

#### 2. Pattern Functions
```javascript
const patterns = {
  grid: (text, params) => {
    // Return array of {char, x, y, rotation}
  },
  circle: (text, params) => {
    // Radial distribution logic
  },
  wave: (text, params) => {
    // Sine wave positioning
  },
  // ... more patterns
};
```

#### 3. Canvas Renderer
```javascript
function renderText(ctx, elements, font) {
  ctx.font = `${font.weight} ${font.size}px ${font.family}`;
  ctx.fillStyle = '#000000';

  elements.forEach(({char, x, y, rotation}) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
}
```

## Pattern Algorithms

### 1. Grid Pattern
```javascript
function gridPattern(text, {cols, rows, gapX, gapY}) {
  const chars = text.split('');
  const positions = [];

  chars.forEach((char, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.push({
      char,
      x: col * gapX,
      y: row * gapY,
      rotation: 0
    });
  });

  return positions;
}
```

### 2. Circle Pattern
```javascript
function circlePattern(text, {radius, centerX, centerY}) {
  const chars = text.split('');
  const angleStep = (2 * Math.PI) / chars.length;

  return chars.map((char, i) => ({
    char,
    x: centerX + radius * Math.cos(i * angleStep),
    y: centerY + radius * Math.sin(i * angleStep),
    rotation: i * angleStep + Math.PI / 2
  }));
}
```

### 3. Wave Pattern
```javascript
function wavePattern(text, {amplitude, frequency, phase}) {
  const chars = text.split('');
  const spacing = canvasWidth / chars.length;

  return chars.map((char, i) => ({
    char,
    x: i * spacing,
    y: centerY + amplitude * Math.sin(frequency * i + phase),
    rotation: Math.atan(amplitude * frequency * Math.cos(frequency * i + phase))
  }));
}
```

## Development Phases

### Phase 1: Foundation (2-3 hours)
- [ ] Create HTML structure with YS header
- [ ] Set up two-panel layout (controls + canvas)
- [ ] Implement responsive canvas sizing
- [ ] Add basic CSS styling following design system

### Phase 2: Text Engine (2-3 hours)
- [ ] Create TextEngine class
- [ ] Implement basic text rendering on canvas
- [ ] Add font loading and management
- [ ] Test with multiple fonts

### Phase 3: Pattern System (3-4 hours)
- [ ] Implement grid pattern algorithm
- [ ] Implement circle pattern algorithm
- [ ] Implement wave pattern algorithm
- [ ] Implement random scatter algorithm
- [ ] Add line pattern

### Phase 4: Controls Integration (2-3 hours)
- [ ] Wire up text input with live preview
- [ ] Connect font controls to renderer
- [ ] Implement pattern selector and parameters
- [ ] Add transform controls (rotation, opacity)

### Phase 5: Export & Polish (2 hours)
- [ ] Implement PNG export functionality
- [ ] Add clear/reset functionality
- [ ] Performance optimizations
- [ ] Cross-browser testing
- [ ] Write documentation

## Performance Considerations

1. **Rendering Optimization**
   - Use requestAnimationFrame for updates
   - Debounce input events (100ms)
   - Cache font metrics
   - Limit max characters (1000) for real-time preview

2. **Memory Management**
   - Clear canvas before each render
   - Dispose of blob URLs after download
   - Limit undo history to 10 states

3. **Canvas Resolution**
   - Default: 1920×1080
   - Retina support with devicePixelRatio
   - Max canvas size: 4096×4096

## Testing Checklist

- [ ] Text rendering works with all fonts
- [ ] All patterns distribute text correctly
- [ ] Export produces correct resolution PNG
- [ ] Controls update preview in real-time
- [ ] Works offline (no external dependencies)
- [ ] Responsive on tablet/desktop
- [ ] Keyboard navigation accessible
- [ ] Performance with 1000+ characters
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)

## Success Metrics

1. **Functional**: All 5 patterns working with customizable parameters
2. **Performance**: < 100ms render time for 500 characters
3. **Quality**: Pixel-perfect text rendering at all sizes
4. **Usability**: Intuitive controls matching YS design system
5. **Export**: High-quality PNG output up to 4K resolution

## Known Limitations vs Original TEXTR

1. **No vector path access**: Canvas renders text as pixels, not paths
2. **Limited animation**: No built-in animation timeline
3. **No custom path drawing**: Predefined patterns only
4. **Export format**: PNG only (no SVG/video in MVP)
5. **Font limitations**: Web fonts only, no local file support initially

## Future Enhancements

1. **Advanced Patterns**: Spiral, hexagon, custom paths
2. **Animation System**: Keyframe-based motion
3. **Color Support**: Gradients, multiple colors
4. **Import/Export**: Save/load compositions as JSON
5. **Collaborative**: Share via URL parameters
6. **Mobile Support**: Touch-optimized interface

## Approval Request

This plan outlines a **text visualization tool** that:
- ✅ Works with pure HTML/CSS/JavaScript (no dependencies)
- ✅ Follows YS Studio design system
- ✅ Provides 5 distribution patterns
- ✅ Exports high-quality PNG images
- ✅ Works completely offline

**Estimated Development Time**: 12-15 hours

Please review and approve this plan before proceeding with implementation.

---

*Note: This tool will be significantly simpler than the original TEXTR due to technology constraints (HTML Canvas vs P5.js/Paper.js), but will provide a solid foundation for creative text compositions within our zero-dependency requirement.*