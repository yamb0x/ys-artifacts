# direction-type

**Tool #006** - Experimental directional typography where text flows toward your cursor.

## Overview

direction-type is an interactive typography experiment that lets you control the directional flow of text in real-time. As you type, letters are placed along a vector from your text cursor to your mouse position, creating dynamic, flowing text compositions.

## Features

### Core Functionality
- **Real-time Direction Control**: Text flows toward mouse cursor position
- **Positioning Mode**: Press Enter to place cursor anywhere on canvas before starting new line
- **Multi-line Composition**: Create complex typographic layouts with multiple directional segments
- **Navigation Mode**: Select, move, and delete text lines (ESC key)

### Control Modes
- **Cursor Mode** (default): Text direction follows mouse cursor
- **Free-Spirit Mode**: Organic, noise-based directional flow independent of mouse

### Typography Controls
- **5 YS Studio Fonts**: Suisse Intl, SangBleu Republic, Courier Prime, Kalice, Basis Grotesque
- **6 Font Weights**: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700), Black (900)
- **Font Size**: 12px - 120px
- **Letter Spacing**: 0px - 50px

### Visual Indicators
- **`{` symbol**: Text cursor (where letters are placed)
- **Dashed line**: Direction vector
- **`}` symbol**: Target (mouse position or free-spirit point)
- **`+` symbol**: Positioning cursor (when placing new line)

### Export Options
- PNG export with optional 2× resolution
- JPG export with quality control
- Optional transparent background

## How to Use

### Basic Typing
1. Move your mouse around the canvas
2. Start typing - letters flow toward your cursor
3. Text advances along the direction vector as you type

### Positioning New Lines
1. Type your text (e.g., "hello")
2. Press **Enter once** → Cursor changes to `+`
3. Move mouse to position where next line should start
4. Press **Enter again** → Start typing from new position

### Free-Spirit Mode
1. Click **"Free-Spirit Mode"** button
2. Target moves organically using Perlin noise
3. Just type and watch text flow naturally
4. Click **"Cursor Mode"** to return to mouse control

### Navigation Mode
1. Press **ESC** to enter navigation mode
2. **Click** to select a line (red box appears)
3. **Delete** key to remove selected line
4. Press **ESC** again to return to typing

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Type** | Place letters along direction |
| **Enter (1st)** | Enter positioning mode (`+` cursor) |
| **Enter (2nd)** | Start new line from positioned cursor |
| **Backspace** | Remove last character |
| **ESC** | Toggle navigation mode |
| **Delete** | Remove selected line (in navigation mode) |

## Technical Details

- **Canvas Resolution**: 1280×720px
- **Zero Dependencies**: Pure HTML/CSS/JavaScript
- **Client-side Processing**: All operations run in browser
- **Offline Capable**: Works without internet connection
- **60fps Rendering**: Smooth real-time preview

## Tips & Tricks

1. **Create Spirals**: Move mouse in circular motion while typing
2. **Waves**: Move mouse left-right rhythmically as you type
3. **Multi-directional**: Use positioning mode to create text from multiple origins
4. **Free-Spirit Poetry**: Let the noise guide your words organically
5. **Layer Text**: Use different font weights and sizes for depth
6. **Hide Indicators**: Toggle off direction line/cursors for clean export

## Font Weight Availability

| Font | Light | Regular | Medium | SemiBold | Bold | Black |
|------|-------|---------|--------|----------|------|-------|
| **Suisse Intl** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **SangBleu Republic** | ✓ | ✓ | ✓ | — | ✓ | — |
| **Courier Prime** | — | ✓ | — | — | ✓ | — |
| **Kalice** | — | ✓ | — | — | — | — |
| **Basis Grotesque** | — | ✓ | — | — | — | — |

## Examples

### Radial Text
```
Type "HELLO" → Enter → Move cursor to center → Enter → Type "WORLD"
Result: Text radiating from center point
```

### Spiral Effect
```
Enable Free-Spirit Mode → Type continuously → Organic spiral forms
```

### Multi-angle Composition
```
Type → Enter → Position → Enter → Type → Repeat
Result: Text from multiple angles creating complex layout
```

## Inspiration

Inspired by [Constraint Systems](https://constraint.systems/)'s experimental typography project "Type", reimagined with positioning mode, Free-Spirit flow, and the YS Studio design system.

## Browser Compatibility

- Chrome/Edge: ✓ Full support
- Firefox: ✓ Full support
- Safari: ✓ Full support
- Mobile: ✓ Touch support enabled

## Privacy

All processing happens client-side in your browser. No data is uploaded or stored externally.

---

**Part of YS Studio Artifacts** - A collection of experimental creative tools.
