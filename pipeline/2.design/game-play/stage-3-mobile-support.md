# Stage 3: Mobile Support

## Goal
Make gameplay usable on mobile browsers.

## Scope
### 3.1 Responsive Layout
- Scale the board for desktop and mobile widths.
- Keep tiles usable on small screens.

### 3.2 Pointer and Touch Input
- Support pointer-based selection on desktop.
- Support swipe interaction on mobile browsers.

### 3.2.1 Keyboard Input
- Support arrow-key movement for desktop users.
- Move tiles by keyboard input without requiring tile selection first.
- Keep keyboard behavior consistent with pointer and touch gameplay.

### 3.3 Interaction Feedback
- Highlight tappable/movable tiles.
- Keep input response predictable during rapid taps.

## Output of this stage
- Responsive gameplay that feels natural on phones and tablets.

## Dependencies
- Stage 2 core gameplay.

## Notes
- Input handling should not assume hover or mouse-only interaction.
- Keyboard arrow movement is part of the gameplay input model.
- Mobile gameplay uses swipe gestures; no tap-to-select tile flow is required on mobile.
