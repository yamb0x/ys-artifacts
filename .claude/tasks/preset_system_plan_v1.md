# YS Artifacts - Universal Preset System Plan v1

## Overview
Implement a comprehensive preset system for YS Artifacts tools that allows users to save, load, and share visual configurations. The system will use Firebase Firestore for cloud storage and include password protection for saving presets.

## Current Tools Analysis

### 1. ASCII Interpreter (`/tools/ascii-creator/index_v3.html`)
**Parameters to Save (13 total):**
- `width` (number) - ASCII output width
- `charSet` (string) - Character set type
- `customChars` (string) - Custom character set if applicable
- `algorithm` (string) - Brightness calculation method
- `colorMode` (string) - Color rendering mode
- `invert` (boolean) - Invert brightness
- `fontSize` (number) - Display font size
- `fontWeight` (string) - Font weight
- `letterSpacing` (number) - Character spacing
- `lineHeight` (number) - Line height
- `textColor` (string) - Text color hex
- `bgColor` (string) - Background color hex
- `customColor1`, `customColor2` (string) - Custom gradient colors

### 2. Text Visualizer (`/tools/text-visualizer/index.html`)
**Parameters to Save (28+ total):**
- `textInput` (string) - Input text
- `mode` (string) - words/characters
- `animSpeed` (number) - Animation speed
- `effects` (object) - {oscillate, rotate, breathe, wave}
- `phaseX`, `phaseY` (number) - Movement phases
- `rotAmount` (number) - Rotation amount
- `waveFreq` (number) - Wave frequency
- `stagger` (number) - Animation stagger
- `advancedMode` (boolean) - Enable advanced features
- `repetitions` (number) - Text repetitions
- `fragmentMode` (string) - Fragment type
- `density` (number) - Pattern density
- `overlap` (number) - Element overlap
- `sizeVariation` (number) - Size variation
- `opacityVariation` (number) - Opacity variation
- `fontFamily` (string) - Font selection
- `fontSize` (number) - Font size
- `fontWeight` (number) - Font weight
- `pattern` (string) - Pattern type
- Pattern-specific params (cols, gapX, gapY, radius, spiralGrowth)

## System Architecture

### 1. Core Components

```javascript
// Preset Manager Module (shared/preset-manager.js)
class PresetManager {
  - Firebase configuration and initialization
  - Authentication (password validation)
  - CRUD operations for presets
  - Tool-agnostic interface
  - Local storage fallback
}

// Preset UI Component (shared/preset-ui.js)
class PresetUI {
  - Consistent UI across all tools
  - Preset selection dropdown
  - Save/load buttons
  - Password modal
  - Success/error notifications
}

// Tool Adapters
class ToolAdapter {
  - Tool-specific parameter extraction
  - Parameter application
  - Validation logic
}
```

### 2. Firebase Structure

```
firestore/
├── presets/
│   ├── ascii-creator/
│   │   ├── [preset-id]/
│   │   │   ├── name: string
│   │   │   ├── description: string
│   │   │   ├── author: string
│   │   │   ├── createdAt: timestamp
│   │   │   ├── parameters: object
│   │   │   └── thumbnailData: string (optional)
│   │   └── ...
│   ├── text-visualizer/
│   │   └── [similar structure]
│   └── [future-tools]/
└── metadata/
    └── stats/
        ├── totalPresets: number
        └── lastUpdated: timestamp
```

### 3. Implementation Steps

#### Phase 1: Core Infrastructure
1. **Create Shared Modules**
   - `/shared/preset-manager.js` - Core preset logic
   - `/shared/preset-ui.css` - Consistent styling
   - `/shared/firebase-config.js` - Firebase initialization

2. **Firebase Setup**
   - Create Firebase project
   - Configure Firestore database
   - Set up security rules (read: public, write: password-protected)
   - Generate API keys

#### Phase 2: Tool Integration

3. **ASCII Creator Integration**
   ```javascript
   // Extract all parameters
   function extractASCIIParams() {
     return {
       width: document.getElementById('width').value,
       charSet: document.getElementById('charSet').value,
       // ... all 13 parameters
     };
   }

   // Apply preset parameters
   function applyASCIIPreset(params) {
     // Set all controls and trigger processImage()
   }
   ```

4. **Text Visualizer Integration**
   ```javascript
   // Extract all parameters including advanced mode
   function extractTextParams() {
     return {
       textInput: document.getElementById('textInput').value,
       mode: getActiveMode(),
       animParams: engine.animParams,
       advancedParams: engine.advancedParams,
       // ... all 28+ parameters
     };
   }
   ```

#### Phase 3: UI Implementation

5. **Preset UI Design**
   ```html
   <!-- Consistent UI component for all tools -->
   <div class="preset-section">
     <select id="presetSelect">
       <option value="">Select Preset...</option>
       <!-- Dynamically populated -->
     </select>
     <button id="loadPresetBtn">Load</button>
     <button id="savePresetBtn">Save New</button>
     <button id="deletePresetBtn">Delete</button>
   </div>
   ```

6. **Password Modal**
   ```html
   <div id="passwordModal" class="modal">
     <input type="password" id="presetPassword" placeholder="Enter password">
     <input type="text" id="presetName" placeholder="Preset name">
     <textarea id="presetDescription" placeholder="Description"></textarea>
     <button id="confirmSaveBtn">Save Preset</button>
   </div>
   ```

### 4. Security & Validation

- **Password**: "yambostudio" (hardcoded, client-side validation)
- **Read Access**: Public (all users can load presets)
- **Write Access**: Password-protected
- **Delete Access**: Password-protected, only for preset author
- **Validation**: Parameter type checking and range validation

### 5. User Experience Flow

#### Automatic Random Preset on Startup
1. Page loads
2. System fetches all available presets from Firebase
3. Randomly selects one preset
4. Applies preset parameters automatically
5. Shows preset name in UI for reference
6. User can change to different preset if desired

#### Loading Presets
1. User clicks preset dropdown
2. System fetches available presets from Firebase (or uses cache)
3. User selects preset
4. System applies all parameters
5. Tool updates visualization

#### Saving Presets
1. User clicks "Save New"
2. Password modal appears
3. User enters password "yambostudio"
4. User provides name and description
5. System validates and saves to Firebase
6. Success notification

### 6. Error Handling

- Network failures: Fallback to local storage
- Invalid parameters: Show warning, use defaults
- Firebase quota: Cache presets locally
- Password failures: Clear message, retry option

### 7. Future Extensibility

The system is designed to easily accommodate new tools:

1. Create tool adapter with parameter extraction/application
2. Add tool to PresetManager registry
3. Include preset UI in tool's HTML
4. No changes needed to core infrastructure

### 8. Performance Considerations

- Lazy load Firebase SDK
- Cache presets for 5 minutes
- Debounce parameter changes
- Compress preset data if > 1KB
- Use IndexedDB for offline support

## Implementation Order

1. **Day 1**: Core infrastructure setup
   - Firebase project creation
   - Shared modules development
   - Basic preset manager

2. **Day 2**: Tool integration
   - ASCII Creator adapter
   - Text Visualizer adapter
   - Parameter extraction/application

3. **Day 3**: UI and Polish
   - Preset UI components
   - Password protection
   - Testing and refinement

## Success Metrics

- ✅ All parameters saved/loaded correctly
- ✅ Password protection working
- ✅ Consistent UI across tools
- ✅ Firebase integration stable
- ✅ Easy to extend for new tools
- ✅ Offline fallback functional

## Next Steps After Implementation

1. Add preset thumbnails/previews
2. Implement preset categories/tags
3. Add user favorites system
4. Create preset sharing URLs
5. Add import/export to JSON
6. Implement preset versioning

---

**Status**: Ready for review and implementation
**Author**: YS Studio Development Team
**Date**: 2025-01-25