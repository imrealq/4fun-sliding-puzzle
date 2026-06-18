# New Player Instructions Modal Design

## Requirement Summary
- Add a beginner instructions modal for new players.
- Include steps for both mobile and desktop play.
- Include a skip action so players can start quickly.
- Present the instructions as a modal.
- Make the intro more user-friendly and visual, with less text.
- The intro should be structured into three steps:
  - Step 1: the goal of the game plus a solved 4×3 image example.
  - Step 2: show a finger swiping up/down on mobile and arrow keys on desktop.
  - Step 3: show that clicking the icon lets the player view the reference image and solved result.
- Present the onboarding as a true step-by-step modal with a Next action between steps.
- Replace the static swipe cue with an animated treatment so the motion reads clearly.
- Use the 5×3 solved image asset in step 1 instead of the 4×3 preview.
- Replace the text-based step pills with a centered dot indicator.
- Allow clicking a dot to jump directly to that step.
- Split mobile and desktop guidance into separate rows for easier scanning.
- Replace the mobile cue with a single animated index finger swiping left/right.
- Represent the mobile gesture as one combined animated image showing swipe directions (up/down/left/right) with a single index finger.
- Make the index finger straight and clean, closer to the provided reference icon.
- Add left/right controls so users can move backward and forward through steps.
- Make the step controls visual only: arrow icons on the left and right of the dots, with no step text label.

## Proposed Approach
- Reuse the existing `Modal` component for the instructions UI.
- Add a dedicated instructions trigger in `HeaderControls` so players can reopen the modal anytime.
- Show the modal automatically on first visit by checking a persisted localStorage flag.
- Provide a step-by-step flow inside the modal with Next/Start/Skip actions.
- Replace text-heavy bullets with visual cards using small illustrations/icons.
- Include image-led step cards for:
  - game goal,
  - mobile swipe vs desktop arrow-key controls,
  - viewing the reference image and solved result through the icon.
- Use an animated swipe illustration instead of a static finger icon.

## Affected Files
- `src/features/puzzle/PuzzleScreen.tsx`
  - Own instructions modal state and first-visit display logic.
  - Render the modal alongside the existing reference and win modals.
- `src/components/HeaderControls/HeaderControls.tsx`
  - Add a help/instructions button entry point.
- `src/lib/storage/localStorage.ts`
  - Add a safe setter helper for persisting the seen flag.
- `src/components/Modal/Modal.tsx`
  - Reuse without structural changes unless accessibility checks require minor prop additions.
- `src/components/Button/Button.tsx`
  - Reuse existing primary/secondary variants for skip/continue actions.

## UI Structure
- Modal title: beginner guidance / how to play.
- Intro text: brief, friendly sentence followed by 3 visual steps.
- Three step cards in sequence:
  - Step 1: goal of the game plus a 4×3 solved image preview.
  - Step 2: mobile finger swipe illustration plus desktop arrow-key illustration.
  - Step 3: icon-focused explanation for showing reference image and solved state.
- Footer actions:
  - Step 1: Next.
  - Step 2: Next.
  - Step 3: Start playing.
  - Secondary on all steps: Skip.

## Step Indicator
- Show three centered dots aligned horizontally.
- Highlight the active dot and dim the inactive ones.
- Avoid text labels to keep the modal cleaner and more visual.
- Make dots interactive so users can go backward by tapping earlier steps.
- Add previous/next step controls using left and right affordances, with Next on the final step becoming Start playing.
- Remove the step counter text and place arrow icons directly on the left and right of the dot group.

## Mobile Gesture Illustration
- Use one animated index finger plus directional motion cues to imply swipe left/right.
- Prefer a single composite animated image with swipe directions around one finger to match the reference visual.
- Keep the finger posture straight rather than diagonally angled.
- Keep the desktop arrow-key illustration as a separate block below or beside it depending on screen width.

## Behavior Rules
- First visit:
  - Auto-open the instructions modal if the seen flag is absent.
- Subsequent visits:
  - Do not auto-open once the user has skipped or dismissed the modal.
- Manual access:
  - The header help button must reopen the modal at any time.
- Skip action:
  - Dismisses the modal and marks instructions as seen.
- Next action:
  - Advances through steps 1 → 2 → 3 without closing the modal.

## Responsive Strategy
- Keep modal width bounded with existing max-width patterns.
- Stack the three visual step cards vertically on all sizes for clarity.
- Use compact illustrations, a solved-image preview, and short captions so the modal remains usable on smaller screens.
- Render mobile and desktop guidance as separate rows so each platform is easy to scan.

## Implementation Notes
- Step flow can be tracked with a local `step` state in `PuzzleScreen`.
- The solved-image preview in step 1 should reuse the active puzzle image asset and present it in a 4×3 framing ratio if possible.
- The swipe motion can be implemented with a CSS animation on the finger/arrow element or by animating a small SVG/emoji container.

## Verification Strategy
- No repository test framework exists, so verification will be agent-executed UI QA only.
- Use Playwright MCP against the running dev server to confirm:
  - modal auto-opens on first visit,
  - skip closes the modal,
  - help button reopens it,
  - mobile/desktop instruction sections are present,
  - modal does not block gameplay after dismissal.

## Risks
- First-visit auto-open may be intrusive if the modal is too verbose; keep copy minimal.
- localStorage may be unavailable in some environments; use SSR-safe helpers and default to showing the modal when storage is unavailable.
