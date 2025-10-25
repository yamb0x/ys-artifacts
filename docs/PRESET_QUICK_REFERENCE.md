# 🚀 Preset System - Quick Reference Card

## Essential Info
- **Password**: `yambostudio`
- **Firebase Project**: `ys-artifacts`
- **Tool Names**: `ascii-creator`, `text-visualizer` (use kebab-case)

## Copy-Paste Integration

### 1. HTML Head
```html
<link rel="stylesheet" href="../../shared/preset-ui.css">
```

### 2. HTML Body (where controls are)
```html
<div id="presetContainer"></div>
```

### 3. JavaScript Functions (before closing body)
```javascript
window.extractToolParams = function() {
    return {
        // Your tool's parameters
        param1: document.getElementById('param1').value,
        // Add ALL parameters here
    };
}

window.applyToolPreset = function(params) {
    if (params.param1 !== undefined) {
        document.getElementById('param1').value = params.param1;
        // Update your tool's display
    }
    // Handle ALL parameters here
}
```

### 4. Module Script (at very end)
```html
<script type="module">
    import { PresetManager } from '../../shared/preset-manager.js';
    import { PresetUIComponent } from '../../shared/preset-ui-component.js';

    const presetManager = new PresetManager('your-tool-name');
    const presetUI = new PresetUIComponent(presetManager, window.extractToolParams);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', async () => {
            presetUI.create('presetContainer');
            await presetManager.initialize(window.applyToolPreset);
        });
    } else {
        presetUI.create('presetContainer');
        presetManager.initialize(window.applyToolPreset);
    }
</script>
```

## Adding New Parameters to Existing Tool

### ✅ Safe to Add - Won't Break Old Presets!

1. **Add to extract**:
```javascript
newParam: document.getElementById('newParam').value,
```

2. **Add to apply**:
```javascript
if (params.newParam !== undefined) {
    document.getElementById('newParam').value = params.newParam;
    updateVisualization(); // Your update function
}
```

## Common Gotchas

### ❌ Wrong
```javascript
// DON'T use window.PresetManager
// DON'T forget window. prefix for functions
// DON'T use camelCase for tool names in PresetManager
```

### ✅ Right
```javascript
// DO use ES6 imports
// DO use window.extractToolParams
// DO use kebab-case: 'my-tool-name'
```

## UI Layout Result
```
[Select preset...          ] [↻]
[    Save    ] [   Delete   ]
[   Export   ] [   Import   ]
```

## Testing Commands
```bash
# Start server
python3 -m http.server 8000

# Open tool
http://localhost:8000/tools/[tool-name]/

# Test password
yambostudio

# Check console for debug
window.asciiPresetManager  # or window.textPresetManager
```

## Emergency Fixes

### Presets not showing?
1. Check Firebase Console: https://console.firebase.google.com
2. Check tool name matches exactly
3. Check browser console for errors

### UI not aligned?
```css
/* ASCII-style tools */
.control-panel .preset-section { padding: 0 12px; }

/* Text Visualizer style */
.controls-panel .preset-section { padding: 0; }
```

### Parameters not saving?
- Check extract function returns ALL parameters
- Use correct types: `parseInt()`, `parseFloat()`, `.checked` for booleans
- Parameter names must match EXACTLY

---
**Full Guide**: [PRESET_SYSTEM_GUIDE.md](./PRESET_SYSTEM_GUIDE.md)
**Last Updated**: 2025-01-25