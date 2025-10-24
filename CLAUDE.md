
# 🎨 YS Studio Artifacts - Project Guidelines

## Project Overview
**YS Studio Artifacts** is a curated collection of powerful web-based studio tools and creative utilities. Each tool is:
- **Standalone**: Self-contained HTML/CSS/JavaScript files
- **Zero Dependencies**: No external libraries or frameworks
- **Privacy First**: All processing happens client-side
- **Performance Optimized**: Fast, efficient algorithms
- **Offline Capable**: Works without internet connection

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

1. **Read This File FIRST**: Always read CLAUDE.md completely before starting
   - Project-specific rules OVERRIDE framework defaults
   - Check for existing task files in `.claude/tasks/` for context

2. **Plan First**: Write a detailed plan to `.claude/task/plan_name_v.md`
   - Include implementation approach and reasoning
   - Break down into manageable tasks
   - Focus on MVP - don't over-engineer

3. **Get Approval**: Ask for review before proceeding with implementation
   - Show the plan file content
   - Wait for explicit approval to proceed

4. **Create Task Management**: Use TodoWrite tool AFTER approval
   - Break down work into specific, trackable tasks
   - Mark first task as "in_progress" before starting
   - Example: Update documentation, fix bugs, implement features, etc.

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
        /* All CSS inline for portability */
    </style>
</head>
<body>
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