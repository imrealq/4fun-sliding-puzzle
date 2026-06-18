# Implementation Summary: New Player Instructions Modal

## What Changed
- Reworked the onboarding modal into a more visual, user-friendly 3-step flow.
- Added a first-visit instructions modal to the puzzle screen.
- Added a true step-by-step wizard with a Next action between steps.
- Added finger-swipe and arrow-key illustrations to show mobile/desktop controls.
- Added a solved-image preview to step 1 using the 5×3 asset so the goal is immediately obvious.
- Replaced text step pills with centered dot indicators.
- Made the dot indicators clickable so users can jump backward to a prior step.
- Split mobile and desktop guidance into separate rows for easier scanning.
- Replaced the mobile cue with a single animated index finger swipe left/right.
- Replaced the mobile cue with a composite animated gesture visual showing one finger and all swipe directions.
- Smoothed the finger icon by tilting it diagonally so the motion reads less rigidly.
- Replaced the finger cue with a more faithful index-finger hand shape inspired by the provided reference.
- Moved the finger gesture art into a public SVG asset so PuzzleScreen.tsx stays clean.
- Added left/right step controls so the modal can move backward and forward in addition to dots.
- Removed the step text label and centered the arrow controls around the dots.
- Added a reference-image icon callout so users know how to preview the solved image.
- Added a skip/start action so players can dismiss the modal quickly.
- Added a help button in the header so the instructions can be reopened later.
- Added a safe localStorage setter to persist the "seen instructions" flag.

## Files Updated
- `src/features/puzzle/PuzzleScreen.tsx`
  - Owns the instructions modal state.
  - Auto-opens the modal when the seen flag is missing.
  - Renders the modal content and dismiss actions.
- `src/components/HeaderControls/HeaderControls.tsx`
  - Adds a help trigger icon for the instructions modal.
- `src/lib/storage/localStorage.ts`
  - Adds `setLocalStorageItem()` for persisting onboarding state.

## Behavior
- The modal appears automatically for first-time players.
- The intro now behaves as a 3-step modal flow: goal with solved preview, controls, and image guide.
- Step navigation uses Next until the final step, then Start playing.
- Step progress is shown with centered dots instead of text labels.
- Tapping a dot jumps back to that step.
- Mobile and desktop sections are rendered as separate rows.
- The mobile cue is a single animated index finger with directional motion hints.
- The mobile cue is a composite animated image with one finger and directional hints around it.
- The mobile cue finger is tilted diagonally to feel smoother and more natural.
- The mobile cue finger now uses a hand-shape SVG-style illustration closer to the reference.
- The mobile cue is now rendered from `/images/finger-swipe.svg` instead of inline SVG in TSX.
- The modal now includes left/right controls plus the existing dots and Next/Start/Skip actions.
- The modal step controls are now purely visual: arrow icons on either side of the dots.
- Clicking Start playing or Skip closes the modal and stores the seen flag.
- The header help button reopens the modal at any time.
- The existing reference and win modals remain unchanged.

## Verification Plan
- Run TypeScript/build checks.
- Use browser QA to confirm first-load modal, skip behavior, and help button reopening.
