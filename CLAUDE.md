
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
// Example: Create tasks immediately when receiving work
TodoWrite([
  {"id": "1", "content": "Fix TypeScript errors in seed file", "status": "in_progress"},
  {"id": "2", "content": "Update CLAUDE.md documentation", "status": "pending"},
  {"id": "3", "content": "Test development server setup", "status": "pending"}
])

// Update status as work progresses  
TodoWrite([
  {"id": "1", "content": "Fix TypeScript errors in seed file", "status": "completed"},
  {"id": "2", "content": "Update CLAUDE.md documentation", "status": "in_progress"},
  {"id": "3", "content": "Test development server setup", "status": "pending"}
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





### File Creation Guidelines
- **Always** check for existing similar files before creating new ones
- **Prefer** editing existing files over creating new ones
- **Follow** the established naming and directory conventions
- **Use** TypeScript for all new files
- **Include** proper imports and exports
- **Add** appropriate error handling and validation