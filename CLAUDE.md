
# 🎨 YS Studio Artifacts - Project Guidelines

## Project Overview
**YS Studio Artifacts** is a curated collection of powerful web-based studio tools and creative utilities. Each tool is:
- **Standalone**: Self-contained HTML/CSS/JavaScript files
- **Zero Dependencies**: No external libraries or frameworks
- **Privacy First**: All processing happens client-side
- **Performance Optimized**: Fast, efficient algorithms
- **Offline Capable**: Works without internet connection

## 🚨 CRITICAL DEVELOPMENT RULES - MUST FOLLOW

**These rules are MANDATORY BLOCKERS. Violations will break the project integrity.**

### Rule 1: Design System & Menu Consistency
**MANDATORY**: All tool menus and UI components must follow the established design pattern:

- ✅ **REFERENCE TEMPLATES**:
  - `/tools/ascii-creator/index_v3.html` - Complete design system implementation
  - `/tools/text-visualizer/index.html` - Fully aligned with design system
- **Before creating any menu/UI**:
  1. Open one of the reference templates above
  2. Study the complete structure: crosses, spacing, typography, colors
  3. Copy the exact CSS patterns for consistency

**Required Design System Elements:**

1. **Title Section**
   - Large italic title: `120px` Sangbleu font, lowercase
   - Proper spacing: `margin: 20px 0`

2. **Decorative Crosses**
   - Small crosses (12×12px) in all 4 corners of each panel
   - Uses `.ys-cross-wrapper`, `.cross-row`, `.cross-small` components
   - Top and bottom cross rows with left/right corners

3. **Side Menu (Controls Panel)**
   - Fixed width: `320px`
   - White background, wrapped in cross-wrapper
   - Border only on the right side (panel divider)

4. **Layout Structure**
   - Two-panel layout: controls (320px) + canvas (flex: 1)
   - Gap between panels: `24px`
   - White background throughout (no gray)

5. **Typography & Spacing**
   - Section titles: `10px`, uppercase, `0.5px` letter-spacing
   - Labels: `10px`, uppercase, `0.3px` letter-spacing
   - Control groups: `12px` margin-bottom
   - Section spacing: `24px` margin, `16px` padding

6. **Form Controls**
   - Select/inputs: `6px` padding
   - Buttons: `10px 16px` padding, `11px` font
   - Sliders: `1px` track height, `12px` thumb
   - Checkboxes: `12×12px`, custom black/white styling
   - Toggle buttons: `8px 12px` padding, `11px` font, uppercase

7. **Color System (Monochromatic)**
   - Black: `#000000` (primary)
   - White: `#FFFFFF` (backgrounds)
   - Gray: `#D9D9D9` (borders only)
   - Red: `#FF0000` (accents - large crosses only)
   - ❌ NO BLUE anywhere

**BLOCKER**: If UI doesn't match these design system specifications, task is NOT complete.

### Rule 2: Preset Synchronization - ZERO TOLERANCE
**MANDATORY**: Every new parameter MUST be integrated into the preset system:

**Checklist for ANY new parameter:**
- [ ] Parameter added to `extractToolParams()` function in tool file
- [ ] Parameter added to `applyToolPreset()` function in tool file
- [ ] Test: Save preset with new parameter
- [ ] Test: Load preset and verify parameter applies correctly
- [ ] Test: Random preset on page load includes new parameter
- [ ] Test: Export/import JSON contains new parameter

**Reference Files:**
- `/tools/ascii-creator/index.html` - Example integration (14 parameters)
- `/tools/text-visualizer/index.html` - Example integration (28+ parameters)
- `/docs/PRESET_SYSTEM_GUIDE.md` - Complete documentation

**BLOCKER**: Cannot mark task complete until ALL checklist items verified. No exceptions.

### Rule 3: Test Before Documentation
**MANDATORY**: Never document or celebrate features until user confirms functionality:

- ❌ **FORBIDDEN**: Writing README updates before testing
- ❌ **FORBIDDEN**: Declaring completion before user validation
- ❌ **FORBIDDEN**: Updating documentation before user confirms it works
- ✅ **REQUIRED**: Test thoroughly → Get user confirmation → THEN document

**Example Workflow:**
```
1. Implement feature
2. Test manually
3. Report to user: "Feature implemented, please test"
4. Wait for user confirmation
5. Only after confirmation: Update README/docs
```

**BLOCKER**: Documentation without user confirmation violates project protocol.

---

**⚠️ VIOLATION CONSEQUENCES**: Failing to follow these rules creates technical debt, breaks user experience consistency, and requires costly rework. These are not suggestions—they are requirements.

---

## 🤖 Claude Skills Integration

### Available Skills for This Project
Use these skills to enhance your development workflow:

```bash
# For ASCII art algorithms and character mapping
Skill("ascii-interpreter")

# For automated browser testing and UI validation
Skill("webapp-testing")

# For generating descriptive commit messages
Skill("git-commit-helper")

# For creating complex HTML artifacts
Skill("artifacts-builder")
```

### MCP Servers Integration
The project has access to these MCP servers:

```bash
# Design Integration
figma-desktop: http://127.0.0.1:3845/mcp
# Provides access to Figma designs, components, and styles
# Usage: Select a frame in Figma or provide a Figma link in your prompt

# Documentation & Patterns
context7: Library documentation and code examples

# Testing & Automation
playwright: Browser automation and testing

# Development Tools
sequential-thinking: Complex analysis and planning
ide: VS Code integration and diagnostics
```

### When to Use Each Skill/MCP Server
- **ascii-interpreter**: When working on ASCII art conversion, character sets, or brightness algorithms
- **webapp-testing**: For testing HTML tools, capturing screenshots, validating UI behavior
- **git-commit-helper**: Before committing changes, to generate meaningful commit messages
- **artifacts-builder**: When creating new HTML tools requiring complex state management or components
- **figma-desktop**: When implementing designs from Figma, extracting styles, or referencing components
- **context7**: When needing library documentation or implementation patterns
- **playwright**: For automated browser testing and UI validation
- **sequential-thinking**: For complex problem-solving and multi-step analysis

## 📋 Workflow Protocol

**FIRST**: Review **🚨 CRITICAL DEVELOPMENT RULES** above - these are MANDATORY BLOCKERS.

1. **Read This File FIRST**: Always read CLAUDE.md completely before starting
   - Project-specific rules OVERRIDE framework defaults
   - Check for existing task files in `.claude/tasks/` for context
   - Pay special attention to the 3 Critical Development Rules

2. **Plan First**: Write a detailed plan to `.claude/task/plan_name_v.md`
   - Include implementation approach and reasoning
   - Break down into manageable tasks
   - Focus on MVP - don't over-engineer
   - **Verify plan adheres to Critical Rules (design consistency + preset sync)**

3. **Get Approval**: Ask for review before proceeding with implementation
   - Show the plan file content
   - Wait for explicit approval to proceed

4. **Create Task Management**: Use TodoWrite tool AFTER approval
   - Break down work into specific, trackable tasks
   - Mark first task as "in_progress" before starting
   - Include verification steps for Critical Rules in task list
   - Example tasks: Update documentation, fix bugs, implement features, verify preset sync, etc.

**🚨 VIOLATION ALERT**: If you start work without following ALL steps above, you are violating the established workflow protocol.


### During Implementation
- **Update Task Status**: Mark tasks as "in_progress" when starting, "completed" when finished
- **Update Progress**: Keep the plan updated as you work  
- **Document Changes**: Append detailed descriptions of completed work for handover
- **Single Focus**: Only ONE task should be "in_progress" at any time

### After Completion  
- **Mark Tasks Complete**: Use TodoWrite tool to mark all tasks as "completed"
- **Update Context**: Ensure session context file is current for next engineer

## 📝 Task Management System

### TodoWrite Tool Usage - MANDATORY
Every Claude session MUST use the TodoWrite tool for task tracking:

```javascript
// Example: Create tasks for HTML tool development
TodoWrite([
  {"content": "Create HTML structure for new tool", "status": "in_progress", "activeForm": "Creating HTML structure"},
  {"content": "Implement core JavaScript functionality", "status": "pending", "activeForm": "Implementing JavaScript"},
  {"content": "Add CSS styling and responsive design", "status": "pending", "activeForm": "Adding CSS styling"},
  {"content": "Test tool in multiple browsers", "status": "pending", "activeForm": "Testing in browsers"},
  {"content": "Write tool documentation", "status": "pending", "activeForm": "Writing documentation"}
])

// Update status as work progresses
TodoWrite([
  {"content": "Create HTML structure for new tool", "status": "completed", "activeForm": "Creating HTML structure"},
  {"content": "Implement core JavaScript functionality", "status": "in_progress", "activeForm": "Implementing JavaScript"},
  // ... other tasks remain pending
])
```

### Task Status Definitions
- **pending**: Task defined but not yet started
- **in_progress**: Currently active task (ONLY ONE at a time)
- **completed**: Task finished and verified

## 📋 Session Context Management

### Before ANY Work
**MANDATORY**: Check `.claude/tasks/context_session_[id].md` for full context
- If file doesn't exist, create it
- Contains: session history, overall plan, agent interactions
- Sub-agents continuously add their context

### After Work Completion
**MANDATORY**: Update `.claude/tasks/context_session_[id].md` with:
- What was accomplished
- Key decisions made
- Outstanding items
- Next steps

## 🔧 Preset System

### Complete Documentation
**📖 See [PRESET_SYSTEM_GUIDE.md](docs/PRESET_SYSTEM_GUIDE.md) for comprehensive documentation**

### Quick Overview
YS Artifacts includes a sophisticated preset system that enables:
- 🎲 **Random preset on startup** - Different look every time
- ☁️ **Firebase cloud storage** - Synced across devices
- 🔒 **Password protection** - "yambostudio" for save/delete
- 📁 **Import/Export JSON** - Offline sharing
- 💾 **Local fallback** - Works without internet
- ⚡ **Real-time loading** - Instant parameter application

### Current Integration Status
- ✅ **ASCII Creator**: 14 parameters fully integrated
- ✅ **Text Visualizer**: 28+ parameters fully integrated
- 🎨 **UI Design**: Minimal, perfectly aligned with YS system
- 📊 **Performance**: 5-minute cache, lazy loading

### Quick Integration for New Tools

1. **Add container** in HTML: `<div id="presetContainer"></div>`
2. **Define parameter functions** (extract & apply)
3. **Initialize preset system** with ES6 modules
4. **Test** with save/load/random startup

### Critical Files
```
shared/
├── preset-manager.js       # Firebase & core logic (360 lines)
├── preset-ui-component.js  # UI & events (365 lines)
└── preset-ui.css          # Aligned minimal styles (331 lines)

docs/
└── PRESET_SYSTEM_GUIDE.md  # Complete documentation (450+ lines)
```

### Adding New Parameters (Won't Break Existing Presets!)
1. Add to `extractToolParams()` function
2. Add to `applyToolPreset()` function
3. Old presets ignore new params (safe)
4. New presets include all params

### Firebase Credentials (Already Configured)
- **Project**: ys-artifacts
- **Password**: yambostudio
- **Region**: us-central1
- **Structure**: `/presets/[tool-name]/items/[preset-id]`

## 🚀 Tool Development Workflow

### Creating a New Tool
1. **Research & Design Phase**
   - Check if similar tool exists in `/tools/`
   - Review user requirements
   - Plan features and UI/UX
   - Extract design tokens from Figma if available
   ```bash
   # With Figma integration (select frame in Figma first)
   # Or provide Figma link: https://figma.com/file/...
   ```

2. **Development Phase**
   ```bash
   # Use artifacts-builder for complex tools
   Skill("artifacts-builder")

   # For ASCII-related tools
   Skill("ascii-interpreter")

   # Extract styles from Figma design
   # MCP: figma-desktop (automatic when Figma is open)
   ```

3. **Testing Phase**
   ```bash
   # Automated browser testing
   Skill("webapp-testing")
   ```

4. **Documentation Phase**
   - Create tool README with features and usage
   - Update main README tools list
   - Add inline code comments

5. **Commit Phase**
   ```bash
   # Generate descriptive commit message
   Skill("git-commit-helper")
   ```

### Tool Quality Checklist

**🚨 CRITICAL RULES (BLOCKERS):**
- [ ] Design matches ascii-creator menu pattern (Rule 1)
- [ ] All parameters integrated into preset system (Rule 2)
- [ ] User confirmed functionality before documentation (Rule 3)

**Standard Quality:**
- [ ] Zero external dependencies
- [ ] Works offline
- [ ] Responsive design (mobile + desktop)
- [ ] Fast performance (< 1s load time)
- [ ] Privacy-first (client-side only)
- [ ] Multiple export options
- [ ] Error handling implemented
- [ ] Cross-browser compatible
- [ ] README documented





## 🛠️ Tool Development Guidelines

### Directory Structure
```
ys-artifacts/
├── tools/
│   ├── tool-name/
│   │   ├── index.html      # Main tool file
│   │   ├── README.md       # Tool documentation
│   │   └── assets/         # Optional assets
│   └── another-tool/
├── shared/                  # Shared utilities (if needed)
└── docs/                    # Documentation

```

### File Creation Guidelines
- **Always** check for existing similar tools before creating new ones
- **Prefer** enhancing existing tools over creating duplicates
- **Follow** the established directory structure
- **Use** pure HTML/CSS/JavaScript - NO external dependencies
- **Create** self-contained, single HTML files when possible
- **Include** inline CSS and JavaScript for portability
- **Add** comprehensive error handling and validation
- **Document** all features and usage in tool README

### Navigation Bar Requirements

**MANDATORY**: Every page in the YS Studio Artifacts collection MUST include the standard navigation bar for consistent user experience.

#### Navigation Structure
```html
<!-- Standard YS Header - Required on ALL pages -->
<header class="ys-header">
    <a href="/" class="header-left">
        <span class="studio-name">YAMBO STUDIO</span>
        <span>—</span>
        <span class="project-type">Artifacts</span>
    </a>
    <div class="header-center">[Current Page Name]</div>
    <nav class="header-right">
        <a href="/about.html">About</a>
        <a href="/" class="active">Tools</a>
    </nav>
</header>
```

#### Navigation Rules:
1. **Logo Link**: "YAMBO STUDIO — Artifacts" must always link to homepage (`/`)
2. **Center Text**: Shows current page context (e.g., "Artifacts", "About", "ASCII Interpreter")
3. **Right Navigation**:
   - "About" links to `/about.html`
   - "Tools" links to homepage `/`
   - Mark current page with `class="active"`
4. **Consistent Styling**: Use exact CSS from main index.html header styles
5. **Fixed Position**: Header must be fixed at top with `z-index: 1000`
6. **Responsive**: Hide center text on tablet, hide right nav on mobile

### HTML Tool Requirements
```html
<!-- Every tool should include -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Name - YS Studio</title>
    <style>
        /* Include YS header styles */
        /* Tool-specific CSS */
    </style>
</head>
<body>
    <!-- YS Header (mandatory) -->
    <header class="ys-header">...</header>

    <!-- Tool UI -->
    <script>
        // All JavaScript inline
        // No external dependencies
        // Client-side processing only
    </script>
</body>
</html>
```

### Performance Standards
- **Load Time**: < 1 second
- **Processing**: Real-time feedback
- **Memory**: Efficient resource usage
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🌐 Deployment Options

### GitHub Pages
```bash
# Push to main branch
git push origin main
# Enable GitHub Pages in repository settings
# Tools available at: https://[username].github.io/ys-artifacts/tools/[tool-name]/
```

### Local Testing
```bash
# Python server
python -m http.server 8000

# Node server
npx serve

# Open browser to http://localhost:8000/tools/[tool-name]/
```

### Vercel Deployment (Future)
- One-click deployment with Vercel skill integration
- Automatic preview deployments for PRs
- Production deployment on merge to main

## 📚 Additional Resources

### Current Tools
- **ASCII Art Creator** (`/tools/ascii-creator/`): Advanced image-to-ASCII conversion
  - Multiple character sets and algorithms
  - Color support and alpha channel handling
  - Export in various formats

### Planned Tools
- Image optimizer with multiple format support
- Color palette generator
- SVG editor and optimizer
- CSS gradient builder
- Base64 encoder/decoder

### Skills Documentation
- Use `Skill("skill-name")` to invoke any available skill
- Skills provide specialized capabilities for development
- Check skill descriptions with the Skill tool for detailed usage

---

**Remember**: This is a collection of standalone, zero-dependency web tools. Each tool should be a complete, self-contained solution that works offline and prioritizes user privacy.