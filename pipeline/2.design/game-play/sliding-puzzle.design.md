# Sliding Puzzle Design

## Overview
Use a JavaScript frontend framework that supports responsive component-based UI and pointer events. The game should keep puzzle logic separate from UI so that board rules, shuffle behavior, and win detection can be tested independently.

## Recommended Framework
React + TypeScript + Vite.

## Styling Approach
Tailwind CSS as the primary styling system.

Reasoning:
- Avoids maintaining large custom CSS files.
- Works well for responsive, state-driven UI.
- Keeps the game UI implementation fast and consistent.
- Makes mobile layout tuning easier than hand-written CSS.

Reasoning:
- Strong fit for component-driven game UI.
- Easy responsive layout handling for desktop and mobile browsers.
- Good ecosystem for gesture/pointer handling, state management, and testing.
- Vite keeps the development loop fast.

## Stage Files
- `pipeline/2.design/stage-1-foundation.md`
- `pipeline/2.design/stage-2-core-gameplay.md`
- `pipeline/2.design/stage-3-mobile-support.md`
- `pipeline/2.design/stage-4-content-and-difficulty.md`
- `pipeline/2.design/stage-5-game-ux.md`

## Shared Constraints
- Keep puzzle logic separate from UI.
- Support web and mobile browsers.
- Use pointer and touch-friendly interaction.
- Keep the implementation incremental.
- Prefer Tailwind utilities over custom CSS files.

## Type Organization Rules
- `src/types/` contains shared, app-wide domain types only.
- `src/features/<feature>/` contains types that belong only to that feature's logic.
- `src/components/<Component>/` contains props and view-only types for that component.
- Avoid placing component props in `src/types/` unless they are reused across multiple features.
- Prefer feature-local type files when a type is only used by one feature or one component.
