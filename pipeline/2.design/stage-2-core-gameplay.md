# Stage 2: Core Gameplay

## Goal
Make the puzzle playable at a basic level.

## Scope
### 2.1 Board Rendering
- Render a board grid from puzzle state.
- Render the empty slot distinctly from movable tiles.

### 2.2 Tile Movement
- Move a tile only when it is adjacent to the empty slot.
- Update state after a legal move.

### 2.3 Win Detection
- Detect when the current board matches the solved layout.
- Expose solved status to the UI.

### 2.4 Restart Flow
- Reset the board to a new starting state.
- Clear move-related transient state.

## Output of this stage
- A playable MVP with restart and solve detection.

## Dependencies
- Stage 1 foundation.

## Notes
- Keep movement and win detection logic testable without UI.
