# Animation Export Implementation Plan
**Version**: 1.0
**Date**: 2025-10-25
**Tool**: Text Visualizer
**Goal**: Enable export of animated loops as MP4/WebM/GIF

---

## 📋 Current State Analysis

### Existing Export System
- **Location**: `tools/text-visualizer/index.html:1355-1364`
- **Current Functionality**: Exports single PNG frame via `canvas.toBlob()`
- **Export Button**: Line 840, labeled "Export Frame ↓"

### Animation System Architecture
- **Engine**: `AnimatedTextEngine` class (line 873)
- **Animation Loop**: `requestAnimationFrame` based (line 1305-1329)
- **Time Management**:
  - `this.time` - continuous time tracker
  - `this.animationSpeed` - speed multiplier (0.1x to 3x)
  - `this.deltaTime` - frame delta for smooth animation
- **Animation Effects**:
  - Oscillate (sin/cos based position)
  - Rotate (periodic rotation)
  - Breathe (scale pulsing)
  - Wave (wave motion)
- **FPS Tracking**: Real-time FPS counter (line 1317-1325)

### Loop Period Calculation
All effects use periodic functions (sin/cos) with complete cycles at 2π:
- **Oscillate**: `Math.sin(time + offset)`
- **Rotate**: `Math.sin(time * 0.5 + offset)`
- **Breathe**: `Math.sin(time * 2 + offset)`
- **Wave**: `Math.sin(time * frequency)`
- **Orbital**: `time * 0.3` (custom period)
- **Spiral**: `time * 0.5` (custom period)

---

## 🎯 Technical Approach

### Selected Technology: **MediaRecorder API**

**Why MediaRecorder?**
1. ✅ **Zero Dependencies**: Native Web API, no external libraries
2. ✅ **Client-Side**: All processing in browser, privacy-first
3. ✅ **Real-Time Encoding**: No memory overhead from storing frames
4. ✅ **Format Support**: WebM (universal), MP4 (some browsers)
5. ✅ **Perfect Loop Control**: Can precisely control recording duration
6. ✅ **Quality**: Good compression with configurable bitrate

**Browser Compatibility**:
- Chrome/Edge: WebM (VP8/VP9), MP4 (H.264) ✅
- Firefox: WebM (VP8/VP9) ✅
- Safari: MP4 (H.264) ✅ (limited WebM)

**Fallback Strategy**:
- Primary: WebM (best compatibility)
- Secondary: MP4 (where supported)
- GIF: Future enhancement (requires library)

---

## 🔧 Implementation Strategy

### Phase 1: Core Recording System

#### 1.1 Add Recording State to Engine
```javascript
// New properties in AnimatedTextEngine constructor
this.isRecording = false;
this.recordingStartTime = 0;
this.recordingDuration = 0;
this.mediaRecorder = null;
this.recordedChunks = [];
```

#### 1.2 Create Loop Duration Calculator
```javascript
calculateLoopDuration() {
    // Find the longest period across all active effects
    let maxPeriod = 2 * Math.PI; // Base period for sin/cos

    // Adjust for effect-specific periods
    if (this.effects.rotate) {
        // rotation uses time * 0.5, so period is 4π
        maxPeriod = Math.max(maxPeriod, 4 * Math.PI);
    }
    if (this.effects.breathe) {
        // breathe uses time * 2, so period is π
        maxPeriod = Math.max(maxPeriod, Math.PI);
    }
    if (this.pattern === 'orbital') {
        // orbital custom period
        maxPeriod = Math.max(maxPeriod, 2 * Math.PI / 0.3);
    }

    // Convert to seconds (divided by animation speed)
    const durationSeconds = maxPeriod / this.animationSpeed;

    return durationSeconds;
}
```

**Logic Explanation**:
- Sin/cos functions complete one cycle at 2π
- Different effects have different multipliers on time
- To get perfect loop, need LCM of all periods
- Simplified: take the longest period
- Divide by animationSpeed to get real-world duration

#### 1.3 Implement MediaRecorder Integration
```javascript
async startRecording(duration, format = 'webm') {
    // 1. Reset animation to start of loop
    this.time = 0;
    this.isPlaying = true;
    this.isRecording = true;
    this.recordingStartTime = this.time;
    this.recordingDuration = duration;
    this.recordedChunks = [];

    // 2. Create media stream from canvas
    const fps = 60; // Target 60fps for smooth animation
    const stream = this.canvas.captureStream(fps);

    // 3. Determine codec based on format
    let mimeType;
    if (format === 'webm') {
        // Try VP9 first, fall back to VP8
        mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : 'video/webm;codecs=vp8';
    } else if (format === 'mp4') {
        mimeType = 'video/mp4;codecs=h264';
    }

    // 4. Create MediaRecorder with high quality settings
    const options = {
        mimeType: mimeType,
        videoBitsPerSecond: 8000000 // 8 Mbps for high quality
    };

    this.mediaRecorder = new MediaRecorder(stream, options);

    // 5. Handle data available
    this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
        }
    };

    // 6. Handle recording stop
    this.mediaRecorder.onstop = () => {
        this.finishRecording(format);
    };

    // 7. Start recording
    this.mediaRecorder.start();

    // 8. Stop recording after duration
    setTimeout(() => {
        this.stopRecording();
    }, duration * 1000);
}

stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
    }
    this.isRecording = false;
}

finishRecording(format) {
    // Create blob from chunks
    const blob = new Blob(this.recordedChunks, {
        type: format === 'webm' ? 'video/webm' : 'video/mp4'
    });

    // Download file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `text-visual-animated-${Date.now()}.${format}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);

    // Clean up
    this.recordedChunks = [];
}
```

### Phase 2: UI Implementation

#### 2.1 Update Export Section HTML
Replace the current export section (line 836-842) with:

```html
<div class="control-section">
    <h3 class="section-title">Export</h3>

    <!-- Export Type Toggle -->
    <div class="control-group">
        <label>Export Type</label>
        <div class="toggle-group">
            <button class="toggle-btn active" data-export="frame">Frame</button>
            <button class="toggle-btn" data-export="animation">Animation</button>
        </div>
    </div>

    <!-- Frame Export (existing functionality) -->
    <div id="frameExportControls">
        <div class="control-group">
            <button id="exportBtn" class="btn btn-primary">Export Frame (PNG) ↓</button>
        </div>
    </div>

    <!-- Animation Export (new functionality) -->
    <div id="animationExportControls" style="display: none;">
        <div class="control-group">
            <label>Format</label>
            <select id="animationFormat">
                <option value="webm">WebM (Best Compatibility)</option>
                <option value="mp4">MP4 (Safari)</option>
            </select>
        </div>

        <div class="control-group">
            <label>Duration Mode</label>
            <div class="toggle-group">
                <button class="toggle-btn active" data-duration="auto">Auto Loop</button>
                <button class="toggle-btn" data-duration="custom">Custom</button>
            </div>
        </div>

        <div id="customDurationControls" style="display: none;">
            <div class="control-group">
                <label>Duration: <span id="customDurationValue">5</span>s</label>
                <div class="slider-container">
                    <input type="range" id="customDuration" min="1" max="30" value="5">
                    <span class="slider-value">5</span>
                </div>
            </div>
        </div>

        <div class="control-group">
            <div id="loopInfo" style="font-size: 11px; opacity: 0.7; margin-bottom: 8px;">
                Loop duration: <strong><span id="autoLoopDuration">6.28</span>s</strong>
            </div>
        </div>

        <div class="control-group">
            <button id="exportAnimationBtn" class="btn btn-primary">
                <span id="exportAnimationText">Export Animation ↓</span>
            </button>
        </div>

        <!-- Recording Indicator -->
        <div id="recordingIndicator" style="display: none;">
            <div style="padding: 12px; border: 1px solid var(--ys-red); background: rgba(255,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <div style="width: 8px; height: 8px; background: var(--ys-red); border-radius: 50%; animation: pulse 1s infinite;"></div>
                    <span style="font-size: 11px; font-weight: 500;">RECORDING</span>
                </div>
                <div style="font-size: 11px;">
                    Progress: <span id="recordingProgress">0</span>%
                </div>
            </div>
        </div>
    </div>
</div>

<style>
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}
</style>
```

#### 2.2 JavaScript UI Controllers
```javascript
// Export type toggle
const exportTypeButtons = document.querySelectorAll('[data-export]');
const frameExportControls = document.getElementById('frameExportControls');
const animationExportControls = document.getElementById('animationExportControls');

exportTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        exportTypeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const type = btn.dataset.export;
        frameExportControls.style.display = type === 'frame' ? 'block' : 'none';
        animationExportControls.style.display = type === 'animation' ? 'block' : 'none';

        if (type === 'animation') {
            updateLoopDuration();
        }
    });
});

// Duration mode toggle
const durationModeButtons = document.querySelectorAll('[data-duration]');
const customDurationControls = document.getElementById('customDurationControls');

durationModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        durationModeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.dataset.duration;
        customDurationControls.style.display = mode === 'custom' ? 'block' : 'none';
    });
});

// Update loop duration display
function updateLoopDuration() {
    const duration = engine.calculateLoopDuration();
    document.getElementById('autoLoopDuration').textContent = duration.toFixed(2);
}

// Update loop duration when parameters change
document.getElementById('animSpeed').addEventListener('input', updateLoopDuration);
// ... add listeners for other animation parameters

// Custom duration slider
document.getElementById('customDuration').addEventListener('input', (e) => {
    updateSliderDisplay(e.target, document.getElementById('customDurationValue'), 's');
});

// Export animation button
document.getElementById('exportAnimationBtn').addEventListener('click', async () => {
    const format = document.getElementById('animationFormat').value;
    const durationMode = document.querySelector('[data-duration].active').dataset.duration;

    let duration;
    if (durationMode === 'auto') {
        duration = engine.calculateLoopDuration();
    } else {
        duration = parseFloat(document.getElementById('customDuration').value);
    }

    // Check browser support
    const mimeType = format === 'webm' ? 'video/webm' : 'video/mp4';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
        alert(`Sorry, your browser doesn't support ${format.toUpperCase()} recording. Try a different format.`);
        return;
    }

    // Show recording indicator
    document.getElementById('recordingIndicator').style.display = 'block';
    document.getElementById('exportAnimationBtn').disabled = true;

    // Start recording with progress updates
    await engine.startRecordingWithProgress(duration, format, (progress) => {
        document.getElementById('recordingProgress').textContent = Math.round(progress * 100);
    });

    // Hide recording indicator
    document.getElementById('recordingIndicator').style.display = 'none';
    document.getElementById('exportAnimationBtn').disabled = false;
});
```

### Phase 3: Progress Tracking Enhancement

```javascript
// Enhanced recording with progress callback
async startRecordingWithProgress(duration, format, progressCallback) {
    // Same setup as before...
    this.time = 0;
    this.isPlaying = true;
    this.isRecording = true;
    this.recordingStartTime = performance.now();
    this.recordingDuration = duration * 1000; // Convert to ms

    // ... MediaRecorder setup ...

    // Progress tracking interval
    const progressInterval = setInterval(() => {
        if (this.isRecording) {
            const elapsed = performance.now() - this.recordingStartTime;
            const progress = Math.min(elapsed / this.recordingDuration, 1);
            progressCallback(progress);
        } else {
            clearInterval(progressInterval);
        }
    }, 100);

    this.mediaRecorder.start();

    setTimeout(() => {
        this.stopRecording();
        clearInterval(progressInterval);
    }, this.recordingDuration);
}
```

---

## 🎨 Perfect Loop Logic

### Understanding Loop Periods

For a perfect loop, the animation must return to its exact starting state. Here's the math:

```
Base period (2π) ≈ 6.28 seconds at 1x speed

For a function: f(t) = sin(ω·t + φ)
- Period T = 2π/ω

Our effects:
1. Oscillate: sin(t) → period = 2π
2. Rotate: sin(0.5t) → period = 4π
3. Breathe: sin(2t) → period = π
4. Wave: sin(freq·t) → period = 2π/freq

Perfect loop = LCM of all active periods
```

### Simplified Approach
```javascript
calculateLoopDuration() {
    // Start with base period
    let basePeriod = 2 * Math.PI;

    // For perfect synchronization, use the longest period
    // This ensures all effects complete at least one full cycle

    let periods = [basePeriod];

    if (this.effects.rotate) {
        periods.push(4 * Math.PI); // Slowest rotation cycle
    }
    if (this.effects.breathe) {
        periods.push(Math.PI); // Fastest breathing cycle
    }
    if (this.effects.wave) {
        periods.push(2 * Math.PI / this.animParams.waveFrequency);
    }

    // For patterns with custom speeds
    if (this.pattern === 'orbital') {
        periods.push(2 * Math.PI / 0.3);
    }
    if (this.pattern === 'spiral') {
        periods.push(2 * Math.PI / 0.5);
    }

    // Find LCM (simplified: use max for now)
    const maxPeriod = Math.max(...periods);

    // Convert to seconds, accounting for animation speed
    return maxPeriod / this.animationSpeed;
}
```

---

## 📦 File Size & Quality Optimization

### Codec Selection Priority
```javascript
function selectBestCodec(format) {
    if (format === 'webm') {
        // VP9 > VP8 (better compression)
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            return 'video/webm;codecs=vp9';
        }
        return 'video/webm;codecs=vp8';
    } else {
        // H.264 for MP4
        return 'video/mp4;codecs=h264';
    }
}
```

### Bitrate Guidelines
- **High Quality** (1920x1080): 8-10 Mbps
- **Medium Quality** (1920x1080): 4-6 Mbps
- **Low Quality** (1920x1080): 2-3 Mbps

For our case: Start with 8 Mbps, make adjustable if needed.

---

## 🚨 Edge Cases & Error Handling

### 1. Browser Compatibility Check
```javascript
function checkRecordingSupport() {
    if (!window.MediaRecorder) {
        return { supported: false, reason: 'MediaRecorder not available' };
    }

    if (!HTMLCanvasElement.prototype.captureStream) {
        return { supported: false, reason: 'Canvas capture not available' };
    }

    const formats = {
        webm: MediaRecorder.isTypeSupported('video/webm'),
        mp4: MediaRecorder.isTypeSupported('video/mp4')
    };

    if (!formats.webm && !formats.mp4) {
        return { supported: false, reason: 'No supported video formats' };
    }

    return { supported: true, formats };
}
```

### 2. Memory Management
```javascript
// Clear recorded chunks after download
finishRecording() {
    // ... create download ...

    // Clean up
    this.recordedChunks = [];
    this.recordedChunks.length = 0; // Ensure GC
}
```

### 3. User Feedback
- Show recording indicator with pulsing red dot
- Display progress percentage
- Disable controls during recording
- Show success message after download
- Handle errors gracefully with user-friendly messages

---

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Export animation in WebM format
- [ ] Export animation in MP4 format (Safari)
- [ ] Auto-detect loop duration correctly
- [ ] Custom duration works as expected
- [ ] Perfect loop verification (start === end state)
- [ ] Recording indicator shows during export
- [ ] Progress bar updates correctly
- [ ] File downloads automatically

### Animation Tests
- [ ] All effects export correctly (oscillate, rotate, breathe, wave)
- [ ] All patterns export correctly (grid, circle, spiral, etc.)
- [ ] Advanced mode parameters work in export
- [ ] Different animation speeds work
- [ ] Multiple repetitions work

### Edge Cases
- [ ] Very short duration (1s)
- [ ] Very long duration (30s)
- [ ] High element count (100+ elements)
- [ ] Different canvas sizes
- [ ] Pause/resume during recording (should prevent)
- [ ] Multiple rapid export attempts

### Browser Compatibility
- [ ] Chrome/Edge (WebM VP9)
- [ ] Firefox (WebM VP8/VP9)
- [ ] Safari (MP4 H.264)
- [ ] Mobile browsers

### Quality Tests
- [ ] Visual quality acceptable
- [ ] File size reasonable
- [ ] FPS maintained at 60
- [ ] No frame drops
- [ ] Loop is seamless (no jump)

---

## 📈 Future Enhancements (Out of Scope for v1)

1. **GIF Export**
   - Requires: gif.js library (external dependency)
   - Benefit: Universal compatibility, smaller file sizes for short loops
   - Trade-off: Limited to 256 colors

2. **Quality Settings**
   - Add bitrate slider (Low/Medium/High/Custom)
   - Resolution scaling option
   - FPS selection (30/60)

3. **Preview Before Export**
   - Show preview modal with loop playing
   - "This is what will be exported" confirmation

4. **Batch Export**
   - Export multiple preset variations
   - Export at different resolutions
   - Export with different effects enabled

5. **APNG Support**
   - Better quality than GIF
   - Full color support
   - Requires encoder library

---

## 🎯 Implementation Priority

### Must Have (MVP)
1. ✅ MediaRecorder integration
2. ✅ WebM export
3. ✅ Auto loop duration calculation
4. ✅ Recording indicator
5. ✅ Progress tracking
6. ✅ Perfect loop logic

### Should Have
1. ✅ MP4 export option
2. ✅ Custom duration control
3. ✅ Format selection
4. ✅ Error handling
5. ✅ Browser compatibility checks

### Nice to Have
1. ⏸️ Quality/bitrate settings
2. ⏸️ GIF export option
3. ⏸️ Preview before export
4. ⏸️ Batch export

---

## 🔐 Preset System Integration

**CRITICAL**: All new animation export parameters must be integrated into the preset system!

### New Parameters to Add:
```javascript
function extractTextParams() {
    return {
        // ... existing params ...

        // Export settings
        exportType: 'frame', // or 'animation'
        animationFormat: 'webm', // or 'mp4'
        durationMode: 'auto', // or 'custom'
        customDuration: 5
    };
}
```

### Apply Preset:
```javascript
function applyTextPreset(params) {
    // ... existing apply logic ...

    // Export settings
    if (params.exportType !== undefined) {
        document.querySelectorAll('[data-export]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.export === params.exportType);
        });
        // Show/hide appropriate controls
    }

    if (params.animationFormat !== undefined) {
        document.getElementById('animationFormat').value = params.animationFormat;
    }

    if (params.durationMode !== undefined) {
        document.querySelectorAll('[data-duration]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.duration === params.durationMode);
        });
    }

    if (params.customDuration !== undefined) {
        document.getElementById('customDuration').value = params.customDuration;
        document.getElementById('customDurationValue').textContent = params.customDuration;
    }
}
```

---

## ⚡ Performance Considerations

### Canvas Performance
- **60 FPS Target**: Canvas rendering must keep up
- **Large Element Counts**: May impact recording performance
- **Resolution**: 1920x1080 is standard, higher may cause issues

### Memory Usage
- **MediaRecorder**: Buffers video data in memory
- **Chunks Array**: Grows during recording
- **Mitigation**: Clear chunks immediately after download

### Encoding Performance
- **VP9**: Best compression, slower encoding
- **VP8**: Faster encoding, larger files
- **H.264**: Good balance, hardware accelerated

### Recommendations
- Warn users about long recordings (>30s)
- Suggest lowering animation speed for longer exports
- Consider pausing other browser tabs during recording

---

## 📚 Key Files to Modify

1. **`tools/text-visualizer/index.html`**
   - Lines 836-842: Update export section HTML
   - Lines 873-1365: Add recording methods to `AnimatedTextEngine`
   - Lines 1584-1586: Update export button handler
   - Lines 1701-1933: Update preset extract/apply functions

2. **Testing**
   - Manual testing in Chrome, Firefox, Safari
   - Test on mobile devices
   - Verify file playback in different video players

---

## 🎬 Success Criteria

✅ **Definition of Done**:
1. User can export animated loop as WebM
2. User can export animated loop as MP4 (browser support permitting)
3. Loop duration is automatically calculated for perfect loops
4. User can specify custom duration
5. Recording indicator shows progress
6. All animation effects and patterns work correctly
7. Export settings integrated into preset system
8. Browser compatibility checks in place
9. Error handling for unsupported scenarios
10. User can download and play exported video file

---

## 🚀 Next Steps

1. **Seek User Approval** on this plan
2. **Create TodoList** with specific implementation tasks
3. **Implement Phase 1**: Core recording system
4. **Implement Phase 2**: UI components
5. **Implement Phase 3**: Progress tracking
6. **Testing**: Comprehensive testing across browsers
7. **Preset Integration**: Add export params to preset system
8. **Documentation**: Update tool README with export instructions
9. **User Testing**: Get user to confirm perfect loops

---

**Notes**:
- This approach maintains the zero-dependency philosophy
- All processing is client-side for privacy
- MediaRecorder API is widely supported in modern browsers
- Perfect loop math ensures seamless playback
- Implementation is straightforward and maintainable

**Estimated Complexity**: Medium
**Estimated Time**: 2-4 hours for full implementation + testing
