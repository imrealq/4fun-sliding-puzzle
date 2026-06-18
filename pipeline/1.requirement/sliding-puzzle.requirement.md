# Sliding Puzzle Requirement

## Product Goal
Build a sliding puzzle game where players move tiles to restore an image to its original correct layout.

## Scope
- Playable on web and mobile browsers.
- Implemented in JavaScript.
- Must support touch and pointer interaction.
- Must be developed in feature increments, not all at once.

## Confirmed Functional Needs
- Show a reference image for the solved puzzle.
- Split the image into movable tiles with one empty slot.
- Allow tiles adjacent to the empty slot to move into it.
- Detect when the puzzle is solved.
- Provide a restart/reset action.
- Support responsive gameplay for desktop and mobile sizes.
- Provide a project structure under `./src` suitable for incremental development.
- Add a beginner instructions modal for new players.
- Instructions must include steps for both mobile and desktop play.
- Instructions must include a skip action so players can start quickly.
- Instructions should open as a modal, not a separate page.
- Instructions should be more user-friendly and visual, not text-heavy.
- Intro should include three steps:
  - Step 1: explain the goal of the game and show the solved 4×3 result image.
  - Step 2: show that mobile players use an index finger swipe up/down, while desktop players use arrow keys.
  - Step 3: explain that players can click an icon to view the reference image and solved result.
- The onboarding should behave like a step-by-step modal with a Next action.
- The mobile swipe cue should feel animated/moving instead of a static icon.
- Step 1 should use the 5×3 solved image preview.
- The step indicator should use centered dots instead of the text labels "Step 1 / Step 2 / Step 3".
- Clicking a dot should jump back to that step.
- Mobile and desktop guidance should be shown on separate lines/rows.
- Mobile guidance should use a single animated index finger swiping left/right.
- Mobile gesture should be represented as one combined animated image showing swipe directions (up/down/left/right) with a single index finger.
- The index finger icon should be straight and clean, matching the reference more closely.
- The onboarding should allow moving between steps with left/right controls in addition to dot navigation.
- The onboarding step controls should be visual only: arrow icons on the left and right of the dots, no step text label.

## Platform Notes
- Web browser first.
- Mobile browser support is required.

## Technical Direction
- Use JavaScript.
- Choose a framework suitable for web + mobile browser development.
