# 🎯 YS Artifacts - Complete Preset System Guide

## Overview
The preset system allows users to save, load, and share visual configurations across all YS Artifacts tools. It features random preset loading on startup, Firebase cloud storage, and a minimal UI that perfectly aligns with the YS design system.

## 🔥 Firebase Configuration

### Project Details
- **Project Name**: ys-artifacts
- **Project ID**: ys-artifacts
- **Database**: Firestore (us-central1)
- **Password**: `yambostudio` (for saving/deleting presets)

### Firebase Config (Already in preset-manager.js)
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB3UL04FPyYfRQRpcJVhnFaJUdCkb0sw3Y",
    authDomain: "ys-artifacts.firebaseapp.com",
    projectId: "ys-artifacts",
    storageBucket: "ys-artifacts.firebasestorage.app",
    messagingSenderId: "121710895247",
    appId: "1:121710895247:web:6036b0db6151bb8e7450fa"
};
```

### Firestore Structure
```
firestore/
├── presets/
│   ├── ascii-creator/
│   │   └── items/
│   │       └── [preset-id]/
│   │           ├── name: string
│   │           ├── description: string
│   │           ├── parameters: object
│   │           ├── author: "YS Studio"
│   │           └── createdAt: timestamp
│   └── text-visualizer/
│       └── items/
│           └── [similar structure]
```

## 📁 File Structure

```
shared/
├── preset-manager.js       # Core Firebase & preset logic
├── preset-ui-component.js  # UI creation and event handling
└── preset-ui.css          # Minimal, aligned styling

tools/
├── ascii-creator/
│   └── index_v3.html      # 14 parameters integrated
└── text-visualizer/
    └── index.html         # 28+ parameters integrated
```

## 🎨 Current Tool Parameters

### ASCII Creator (14 parameters)
```javascript
{
    width: number,              // ASCII output width (40-200)
    charSet: string,            // 'standard', 'simple', 'blocks', etc.
    customChars: string,        // Custom character set
    algorithm: string,          // 'average', 'luminosity', 'lightness', etc.
    colorMode: string,          // 'mono', 'html', 'duotone', etc.
    invert: boolean,            // Invert brightness
    fontSize: number,           // Display font size (8-20)
    fontWeight: string,         // 'normal' or 'bold'
    letterSpacing: number,      // Character spacing (-2 to 8)
    lineHeight: number,         // Line height (0.8-2)
    textColor: string,          // Hex color
    bgColor: string,            // Hex color
    customColor1: string,       // Custom gradient color 1
    customColor2: string        // Custom gradient color 2
}
```

### Text Visualizer (28+ parameters)
```javascript
{
    // Text and mode
    textInput: string,          // Input text
    mode: string,               // 'words' or 'characters'

    // Animation
    isPlaying: boolean,         // Animation state
    animSpeed: number,          // Animation speed (0.1-3)

    // Effects
    effectOscillate: boolean,
    effectRotate: boolean,
    effectBreathe: boolean,
    effectWave: boolean,

    // Animation parameters
    phaseX: number,             // Movement phase X (0-100)
    phaseY: number,             // Movement phase Y (0-100)
    rotAmount: number,          // Rotation amount (0-360)
    waveFreq: number,           // Wave frequency (0.1-2)
    stagger: number,            // Animation stagger (0-0.5)

    // Advanced mode
    advancedMode: boolean,
    repetitions: number,        // Text repetitions (1-100)
    fragmentMode: string,       // 'phrase', 'words', 'characters', 'mixed'
    density: number,            // Pattern density (0.1-2)
    overlap: number,            // Element overlap (0-1)
    sizeVariation: number,      // Size variation (0-1)
    opacityVariation: number,   // Opacity variation (0-1)

    // Typography
    fontFamily: string,         // Font selection
    fontSize: number,           // Font size (10-200)
    fontWeight: number,         // Font weight (100-900)

    // Pattern
    pattern: string,            // 'grid', 'circle', 'wave', etc.
    patternCols: number,        // Grid columns
    patternGapX: number,        // Horizontal gap
    patternGapY: number,        // Vertical gap
    patternRadius: number,      // Circle/spiral radius
    patternGrowth: number       // Spiral growth factor
}
```

## 🔧 Adding Parameters to Existing Tools

### Step 1: Update Extract Function
Add new parameter to the extract function:
```javascript
window.extractToolParams = function() {
    return {
        // ... existing parameters
        newParam: document.getElementById('newParam').value,
        newCheckbox: document.getElementById('newCheckbox').checked,
        newSlider: parseInt(document.getElementById('newSlider').value)
    };
}
```

### Step 2: Update Apply Function
Add parameter application logic:
```javascript
window.applyToolPreset = function(params) {
    // ... existing applications

    if (params.newParam !== undefined) {
        document.getElementById('newParam').value = params.newParam;
        // Update any display values
        document.getElementById('newParamValue').textContent = params.newParam;
        // Trigger any necessary updates
        if (currentImage) processImage(); // for ASCII Creator
        engine.newParam = params.newParam; // for Text Visualizer
    }
}
```

### Step 3: Test
1. Save a preset with old parameters
2. Add new parameter to tool
3. Load old preset - should work (undefined parameters ignored)
4. Save new preset - should include new parameter
5. Load new preset - should apply new parameter

## 🚀 Integration for New Tools

### Complete Integration Template
```html
<!DOCTYPE html>
<html>
<head>
    <title>Tool Name - YS Studio Artifacts</title>
    <link rel="stylesheet" href="../../shared/preset-ui.css">
    <style>
        /* Tool styles */
    </style>
</head>
<body>
    <!-- Tool HTML -->
    <div class="control-panel">
        <!-- Preset container MUST be in .control-panel for ASCII-style tools -->
        <div id="presetContainer"></div>
        <!-- Other controls -->
    </div>

    <script>
        // CRITICAL: Define these globally
        window.extractToolParams = function() {
            return {
                // All tool parameters
            };
        }

        window.applyToolPreset = function(params) {
            // Apply all parameters
            // Update visualization
        }
    </script>

    <!-- Preset System Integration -->
    <script type="module">
        import { PresetManager } from '../../shared/preset-manager.js';
        import { PresetUIComponent } from '../../shared/preset-ui-component.js';

        const presetManager = new PresetManager('tool-name'); // Use kebab-case
        const presetUI = new PresetUIComponent(presetManager, window.extractToolParams);

        // Initialize when ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', async () => {
                presetUI.create('presetContainer');
                await presetManager.initialize(window.applyToolPreset);
            });
        } else {
            presetUI.create('presetContainer');
            presetManager.initialize(window.applyToolPreset);
        }

        // Debug access
        window.toolPresetManager = presetManager;
    </script>
</body>
</html>
```

## 🎨 UI Design Specifications

### Layout Structure
```
[Select preset...          ] [↻]  <- Dropdown + Refresh (grid: 1fr 32px)
[    Save    ] [   Delete   ]     <- Equal width buttons (grid: 1fr 1fr)
[   Export   ] [   Import   ]     <- Secondary actions (grid: 1fr 1fr)
Current: [Preset Name]             <- Only shows when preset loaded
```

### CSS Classes
- `.preset-row`: Grid container for button rows
- `.preset-select-row`: Special grid for dropdown + icon
- `.preset-btn`: Main action buttons (26px height)
- `.preset-btn-icon`: Square icon button (32x26px)
- `.preset-btn-secondary`: Export/Import (22px height)

### Alignment Rules
- ASCII Creator: Needs `padding: 0 12px` to match wrapper
- Text Visualizer: No padding (parent provides it)
- All buttons use CSS Grid for perfect alignment
- 4px gaps between all elements

## 🐛 Troubleshooting

### Common Issues and Solutions

#### "PresetManager not found" Error
```javascript
// Check: Exports are ES6 modules
export { PresetManager };  // ✅ Correct
window.PresetManager = PresetManager;  // ❌ Wrong
```

#### Presets Not Loading on Startup
1. Check Firebase console for data
2. Verify tool name matches Firebase collection
3. Check browser console for errors
4. Ensure `initialize()` is called after DOM ready

#### Width Alignment Issues
```css
/* Tool-specific padding adjustments */
.control-panel .preset-section { padding: 0 12px; }  /* ASCII */
.controls-panel .preset-section { padding: 0; }      /* Text Viz */
```

#### Parameters Not Saving
1. Check `extractToolParams` returns all values
2. Verify parameter names match exactly
3. Use correct type conversion (parseInt, parseFloat, etc.)
4. Check Firebase write permissions

## 📝 Testing Checklist

### Before Deployment
- [ ] Save preset with all parameters filled
- [ ] Load preset on fresh page load
- [ ] Random preset loads on startup
- [ ] Export preset to JSON
- [ ] Import preset from JSON
- [ ] Delete preset with password
- [ ] Load preset after adding new parameter
- [ ] Verify UI alignment in both tools
- [ ] Test offline fallback (disconnect internet)
- [ ] Check mobile responsive layout

## 🔐 Security Notes

- Password "yambostudio" is client-side only
- Firebase rules allow public read, no write
- Actual write happens through client-side validation
- Consider server-side auth for production
- Local storage used as fallback (50 preset limit)

## 📊 Performance Optimizations

- 5-minute cache for preset lists
- Lazy loading of Firebase SDK
- Debounced parameter changes
- Session-level preset caching
- Automatic cleanup of old local storage

## 🚦 Feature Flags

```javascript
// In preset-manager.js
const FEATURES = {
    randomOnStartup: true,      // Load random preset on page load
    autoLoadOnSelect: true,     // Load preset when selected
    localStorageFallback: true, // Use localStorage when offline
    cachePresets: true,          // Cache for 5 minutes
    passwordProtection: true    // Require password for save/delete
};
```

## 📅 Version History

- **v1.0.0** (2025-01-25): Initial implementation
  - Firebase integration
  - Random preset on startup
  - Password protection
  - Import/Export JSON
  - Perfect UI alignment
  - Two tools integrated

## 🎯 Next Steps

1. **Add preset thumbnails** - Visual preview in dropdown
2. **Preset categories** - Organize by style/mood
3. **Sharing URLs** - Direct links to presets
4. **Preset versioning** - Track changes over time
5. **Bulk operations** - Export/import multiple presets

---

**Remember**: The preset system is designed to be resilient. Old presets work with new parameters (undefined ignored), and new presets work with old tools (extra parameters ignored). Always test thoroughly when adding parameters!