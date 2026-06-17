# Stage 2.2: Board Rendering

## Goal
Render a visible puzzle board in the browser using the current puzzle state.

## Scope
### 2.2.1 Board Container
- Create a board container that sizes responsively.
- Keep the board centered in the app shell.

### 2.2.2 Tile Layout
- Render tiles in a grid based on board size.
- Preserve consistent square tile sizing.

### 2.2.3 Empty Slot
- Render the empty slot distinctly from normal tiles.
- Keep the empty slot visually clear but unobtrusive.

### 2.2.4 Image Source Binding
- Use the default image as the board source.
- Connect image metadata to rendered tiles.

### 2.2.5 App Integration
- Mount the board into the React app shell.
- Ensure the board renders on local startup.

## Output of this stage
- A visible puzzle board in the browser.
- A board shell ready for tile movement and win detection in later stages.

## Dependencies
- Stage 1 foundation.
- Tailwind styling setup.
- React bootstrap setup.

## Notes
- Keep rendering logic separate from movement logic.
- Do not implement shuffle or solved-state celebration in this stage.
- Arrow-key movement and swipe gestures are out of scope for this stage and should be added with gameplay input support.
