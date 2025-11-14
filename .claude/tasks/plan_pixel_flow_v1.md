# Pixel Flow Tool - Implementation Plan v1

**Date**: 2025-01-14
**Tool Name**: `pixel-flow`
**Reference**: https://flow.constraint.systems/
**Estimated Complexity**: Medium (400-500 lines)

---

## 🎯 Project Overview

Build a standalone HTML/CSS/JavaScript tool that creates mesmerizing pixel-flow effects by applying directional pixel shifts to selected rectangular regions on an image. Think of it as "liquid pixels" - you select areas and watch them flow continuously in your chosen direction.

### Visual Effect
- User uploads an image
- Draws rectangular selection boxes
- Chooses flow direction (↑↓←→)
- Pixels within that region continuously wrap/shift
- Multiple flow regions can be stacked
- Creates hypnotic, fluid visual effects

---

## 🚨 Critical Requirements (BLOCKERS)

### 1. Design System Compliance (Rule 1)
**Reference Template**: `/tools/ascii-creator/index_v3.html`

Must include:
- ✅ Large italic title (120px Sangbleu, lowercase)
- ✅ Small crosses (12×12px) in all 4 corners of panels
- ✅ Side menu (320px fixed width, white background)
- ✅ Two-panel layout: controls + canvas
- ✅ Typography: 10px uppercase labels, 0.3px letter-spacing
- ✅ Monochromatic colors: black/white/gray (#D9D9D9)
- ✅ NO BLUE anywhere (use cyan #00FFFF for cursor)

### 2. Preset System Integration (Rule 2)
**Reference**: `/tools/text-visualizer/index.html`, `/docs/PRESET_SYSTEM_GUIDE.md`

Must implement:
- ✅ `extractToolParams()` - Capture all flow regions + image state
- ✅ `applyToolPreset()` - Load and apply saved configurations
- ✅ Random preset on page load
- ✅ Firebase cloud save/load with password protection
- ✅ Import/Export JSON functionality
- ✅ Test save/load/random workflows

Parameters to save:
```javascript
{
  flows: [
    { x, y, width, height, direction },
    // ... multiple flow regions
  ],
  gridCellWidth: number,
  gridCellHeight: number,
  gridOffsetX: number,
  gridOffsetY: number,
  showGrid: boolean,
  showFlowOutlines: boolean,
  cursorColor: string,
  flowSpeed: number (milliseconds between frames)
}
```

### 3. User Testing Before Documentation (Rule 3)
- ❌ DO NOT update README until user confirms it works
- ❌ DO NOT celebrate completion until user validates
- ✅ Implement → Test → Report → Wait for user confirmation → THEN document

---

## 📐 Architecture Design

### State Management (Single Object)
```javascript
const state = {
  // Image
  originalImage: null,
  currentImage: null,

  // Canvas & Display
  zoom: 1,
  canvasWidth: 0,
  canvasHeight: 0,

  // Grid System
  grid: {
    cellWidth: 32,
    cellHeight: 32,
    offsetX: 0,
    offsetY: 0,
    cols: 0,
    rows: 0
  },

  // Cursor (Selection Rectangle)
  cursor: {
    x: 2,       // grid coordinates
    y: 8,
    width: 14,
    height: 12
  },

  // Flow Regions
  flows: [
    // { x, y, width, height, direction: 'n'|'s'|'e'|'w' }
  ],

  // UI State
  mode: 'move',  // 'move' | 'flow' | 'resize'
  showGrid: false,
  showFlowOutlines: false,
  isFlowing: true,  // pause/play
  flowSpeed: 20,    // milliseconds
  cursorColor: '#00ffff'
};
```

### Core Algorithm (Pixel Flow)
```javascript
// Inspired by App.js lines 251-263
function applyFlow(imageData, flow) {
  const { x, y, width, height, direction } = flow;
  const tempCanvas = document.createElement('canvas');
  const ctx = tempCanvas.getContext('2d');

  tempCanvas.width = width;
  tempCanvas.height = height;

  // Extract region
  ctx.drawImage(currentCanvas, x, y, width, height, 0, 0, width, height);

  // Shift pixels based on direction
  switch(direction) {
    case 'e': // East (right)
      // Shift all columns right by 1
      ctx.drawImage(tempCanvas, 0, 0, width-1, height, 1, 0, width-1, height);
      // Wrap rightmost → leftmost
      ctx.drawImage(tempCanvas, width-1, 0, 1, height, 0, 0, 1, height);
      break;

    case 'w': // West (left)
      ctx.drawImage(tempCanvas, 1, 0, width-1, height, 0, 0, width-1, height);
      ctx.drawImage(tempCanvas, 0, 0, 1, height, width-1, 0, 1, height);
      break;

    case 's': // South (down)
      ctx.drawImage(tempCanvas, 0, 0, width, height-1, 0, 1, width, height-1);
      ctx.drawImage(tempCanvas, 0, height-1, width, 1, 0, 0, width, 1);
      break;

    case 'n': // North (up)
      ctx.drawImage(tempCanvas, 0, 1, width, height-1, 0, 0, width, height-1);
      ctx.drawImage(tempCanvas, 0, 0, width, 1, 0, height-1, width, 1);
      break;
  }

  // Write back to main canvas
  mainCtx.drawImage(tempCanvas, 0, 0, width, height, x, y, width, height);
}

// Animation loop (60fps using requestAnimationFrame)
let lastFlowTime = 0;
function animate(timestamp) {
  if (timestamp - lastFlowTime >= state.flowSpeed) {
    state.flows.forEach(flow => applyFlow(imageData, flow));
    render();
    lastFlowTime = timestamp;
  }
  if (state.isFlowing) requestAnimationFrame(animate);
}
```

### Canvas Layers (Simplified)
Unlike the React version with OffscreenCanvas, we'll use a simpler approach:
1. **Main Canvas** - Displays final composite
2. **Working Canvas** (offscreen) - Where pixel flows are applied
3. **Direct drawing** for grid, cursor, flow outlines

---

## 🎨 UI/UX Design

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│ YAMBO STUDIO — Artifacts        pixel-flow        Tools │ ← Header
├────────────┬────────────────────────────────────────────┤
│ × Controls │                                            │
│ ─────────  │                                            │
│            │                                            │
│ IMAGE      │          Canvas Display Area              │
│ • Load     │      (Responsive, centered image)         │
│ • Revert   │                                            │
│ • Save PNG │      [Cursor selection overlay]           │
│            │      [Flow direction controls]            │
│ GRID       │                                            │
│ Cell W: 32 │                                            │
│ Cell H: 32 │                                            │
│ Offset X   │                                            │
│ Offset Y   │                                            │
│ [×] Grid   │                                            │
│            │                                            │
│ FLOWS      │                                            │
│ [Pause]    │                                            │
│ Speed: 20ms│                                            │
│ [×] Show   │                                            │
│ [Clear All]│                                            │
│            │                                            │
│ VIEW       │                                            │
│ Zoom: 100% │                                            │
│ [+] [-]    │                                            │
│            │                                            │
│ ☰ Presets  │                                            │
└────────────┴────────────────────────────────────────────┘
```

### Cursor Interaction (On Canvas)
When in "flow" mode, show directional arrows:
```
     ↑
  ← [×] →
     ↓
```
- Click arrows to set flow direction
- Click × to switch to resize mode
- Resize mode shows corner handles
- Move mode allows dragging cursor

### Keyboard Shortcuts
```
Movement:
  ←↑↓→      Move cursor by 1 cell
  shift+↑   Move cursor by cursor.height

Flow Mode:
  enter     Enter flow selection mode
  ←↑↓→      Choose direction & create flow
  escape    Cancel

Image:
  o         Open image
  i         Revert to original
  p         Save as PNG
  space     Toggle pause/play
  c         Clear all flows

Grid:
  g         Toggle grid visibility

View:
  +/-       Zoom in/out
  0         Reset zoom
```

---

## 🔧 Implementation Phases

### Phase 1: Core Structure (MVP)
**Goal**: Basic image display + single flow region

Tasks:
1. Create HTML structure with YS design system
   - Navigation header
   - Two-panel layout with crosses
   - Controls menu (320px)
   - Canvas container

2. Implement image loading
   - File input button
   - Drag & drop support
   - Paste from clipboard
   - Auto-fit zoom on load

3. Basic canvas rendering
   - Display image scaled to fit
   - Zoom controls (+/-)
   - Pan/scroll support

4. Cursor system
   - Draw selection rectangle
   - Keyboard movement (arrows)
   - Bounds checking

5. Core flow algorithm
   - Single flow region (hardcoded for testing)
   - Direction: East only
   - requestAnimationFrame loop
   - Verify wrapping works correctly

**Deliverable**: Can load image, see cursor, apply one east-flowing region

---

### Phase 2: Full Flow Functionality
**Goal**: Multi-directional flows + UI controls

Tasks:
6. Flow direction UI
   - Show arrow buttons when in flow mode
   - Implement all 4 directions (N/S/E/W)
   - Add flow to state.flows array
   - Visual feedback (button states)

7. Flow management
   - Display active flows list in sidebar
   - Delete individual flows
   - Clear all flows button
   - Toggle flow outlines visualization

8. Cursor resize mode
   - Corner handles (4 corners)
   - Drag to resize selection
   - Maintain grid snapping
   - Visual indicators

9. Pause/Play controls
   - Toggle button in sidebar
   - Stop/start animation loop
   - Speed adjustment slider (10-100ms)

**Deliverable**: Full interaction - select regions, apply flows, manage multiple flows

---

### Phase 3: Grid System
**Goal**: Configurable grid for precise control

Tasks:
10. Grid rendering
    - Draw grid lines on canvas
    - Cell width/height inputs
    - Offset X/Y controls
    - Toggle visibility

11. Grid snapping
    - Cursor snaps to grid cells
    - Calculate grid coordinates
    - Update bounds based on grid

12. Grid presets
    - Quick presets: 16×16, 32×32, 64×64
    - "Match Image Pixels" (1×1 grid)

**Deliverable**: Precise grid-based region selection

---

### Phase 4: Preset System Integration (CRITICAL)
**Goal**: Save/load configurations + random startup

Tasks:
13. Add preset container to HTML
    ```html
    <div id="presetContainer"></div>
    ```

14. Import preset modules
    ```html
    <script type="module">
      import PresetManager from '../../shared/preset-manager.js';
      import PresetUI from '../../shared/preset-ui-component.js';
    </script>
    ```

15. Implement `extractToolParams()`
    ```javascript
    function extractToolParams() {
      return {
        flows: state.flows,
        gridCellWidth: state.grid.cellWidth,
        gridCellHeight: state.grid.cellHeight,
        gridOffsetX: state.grid.offsetX,
        gridOffsetY: state.grid.offsetY,
        showGrid: state.showGrid,
        showFlowOutlines: state.showFlowOutlines,
        cursorColor: state.cursorColor,
        flowSpeed: state.flowSpeed
      };
    }
    ```

16. Implement `applyToolPreset(preset)`
    ```javascript
    function applyToolPreset(preset) {
      if (!preset) return;

      // Apply flows
      if (preset.flows) {
        state.flows = preset.flows;
      }

      // Apply grid settings
      if (preset.gridCellWidth) state.grid.cellWidth = preset.gridCellWidth;
      if (preset.gridCellHeight) state.grid.cellHeight = preset.gridCellHeight;
      if (preset.gridOffsetX) state.grid.offsetX = preset.gridOffsetX;
      if (preset.gridOffsetY) state.grid.offsetY = preset.gridOffsetY;
      if (preset.showGrid !== undefined) state.showGrid = preset.showGrid;
      if (preset.showFlowOutlines !== undefined) state.showFlowOutlines = preset.showFlowOutlines;
      if (preset.cursorColor) state.cursorColor = preset.cursorColor;
      if (preset.flowSpeed) state.flowSpeed = preset.flowSpeed;

      // Update UI
      updateControls();
      render();
    }
    ```

17. Initialize preset system
    ```javascript
    const presetManager = new PresetManager('pixel-flow', {
      extractParams: extractToolParams,
      applyPreset: applyToolPreset,
      defaultPresets: [/* curated presets */]
    });

    const presetUI = new PresetUI(presetManager, 'presetContainer');

    // Load random preset on startup
    await presetManager.loadRandomPreset();
    ```

18. Test preset workflows
    - Save preset with multiple flows
    - Load preset and verify all parameters apply
    - Random preset on page refresh
    - Import/Export JSON
    - Firebase sync (password: yambostudio)

**Deliverable**: Full preset system with save/load/random/cloud sync

---

### Phase 5: Polish & Export
**Goal**: Production-ready tool

Tasks:
19. Export functionality
    - Save as PNG button
    - Filename: `pixel-flow-[timestamp].png`
    - Export at original image size (not zoomed)

20. Keyboard shortcuts
    - Implement all shortcuts from design
    - Add shortcuts panel (toggle with ?)
    - Visual indicators for modes

21. Responsive design
    - Mobile layout adjustments
    - Touch support for cursor/flows
    - Min/max canvas sizes

22. Error handling
    - Invalid images
    - Browser compatibility checks
    - Performance warnings (large images)

23. Create thumbnail
    - Generate 800×560px preview
    - Show interesting flow effect
    - Save to `/thumbnails/pixel-flow.png`

**Deliverable**: Polished, production-ready tool

---

### Phase 6: Documentation (AFTER USER CONFIRMATION)
**IMPORTANT**: Only after user confirms everything works!

Tasks:
24. Tool README (`/tools/pixel-flow/README.md`)
    - Feature list
    - Usage instructions
    - Keyboard shortcuts
    - Technical details

25. Update main README
    - Add pixel-flow to tools list
    - Link to tool directory

26. Create demo presets
    - 3-5 interesting flow configurations
    - Upload to Firebase
    - Test sharing

**Deliverable**: Complete documentation

---

## 🎨 Default Presets (Ideas)

```javascript
const defaultPresets = [
  {
    name: "Waterfall",
    flows: [
      { x: 0, y: 0, width: 20, height: 40, direction: 's' }
    ],
    gridCellWidth: 16,
    gridCellHeight: 16,
    flowSpeed: 30
  },
  {
    name: "Tornado",
    flows: [
      { x: 5, y: 0, width: 10, height: 10, direction: 'e' },
      { x: 15, y: 0, width: 10, height: 10, direction: 's' },
      { x: 15, y: 10, width: 10, height: 10, direction: 'w' },
      { x: 5, y: 10, width: 10, height: 10, direction: 'n' }
    ],
    gridCellWidth: 32,
    gridCellHeight: 32,
    flowSpeed: 20
  },
  {
    name: "Glitch",
    flows: [
      { x: 0, y: 10, width: 30, height: 2, direction: 'e' },
      { x: 0, y: 20, width: 30, height: 2, direction: 'w' },
      { x: 0, y: 30, width: 30, height: 2, direction: 'e' }
    ],
    gridCellWidth: 8,
    gridCellHeight: 8,
    flowSpeed: 15
  },
  {
    name: "Crossflow",
    flows: [
      { x: 0, y: 15, width: 40, height: 5, direction: 'e' },
      { x: 15, y: 0, width: 5, height: 40, direction: 's' }
    ],
    gridCellWidth: 32,
    gridCellHeight: 32,
    flowSpeed: 25
  }
];
```

---

## 📊 Technical Considerations

### Performance
- Use `requestAnimationFrame` for smooth 60fps animation
- Only redraw affected regions (not entire canvas)
- Add performance warning for images > 2000×2000px
- Throttle flow speed control (10-100ms range)

### Browser Compatibility
- Test in Chrome, Firefox, Safari, Edge
- Fallback for browsers without canvas support
- Touch event handling for mobile

### Memory Management
- Clear intervals on page unload
- Dispose of offscreen canvases when not needed
- Limit maximum number of flows (e.g., 20)

---

## ✅ Definition of Done

Tool is complete when:
- ✅ All 6 phases implemented
- ✅ Design system matches ascii-creator exactly
- ✅ Preset system fully integrated and tested
- ✅ User confirms all functionality works
- ✅ Thumbnail created (800×560px)
- ✅ Zero external dependencies
- ✅ Works offline
- ✅ Cross-browser compatible
- ✅ Documentation complete (after user approval)
- ✅ Committed to repo with proper naming

---

## 🚀 Estimated Timeline

- Phase 1 (Core Structure): ~1 hour
- Phase 2 (Full Flow): ~1 hour
- Phase 3 (Grid System): ~30 minutes
- Phase 4 (Presets): ~45 minutes
- Phase 5 (Polish): ~45 minutes
- Phase 6 (Documentation): ~30 minutes

**Total**: ~4.5 hours of focused development

---

## 🎯 Success Metrics

1. Can load any image format (jpg, png, gif, webp)
2. Can create multiple flow regions with different directions
3. Flows animate smoothly at 60fps
4. Grid system allows precise selection
5. Preset system saves/loads all parameters correctly
6. Random preset on load creates interesting effects
7. Export produces clean PNG
8. Keyboard shortcuts work as documented
9. Tool matches YS design system perfectly
10. User reports: "This is awesome!" 🎨✨

---

**Ready to build?** Awaiting approval to proceed with Phase 1! 🚀
