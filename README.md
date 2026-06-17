# Sliding Puzzle

## Development Rules

### Type Organization

- `src/types/` contains shared, app-wide domain types only.
- `src/features/<feature>/` contains types that belong only to that feature's logic.
- `src/components/<Component>/` contains props and view-only types for that component.
- Avoid placing component props in `src/types/` unless they are reused across multiple features.
- Prefer feature-local type files when a type is only used by one feature or one component.

### Styling

- Tailwind CSS is the primary styling system.
- Avoid maintaining custom CSS files unless absolutely necessary.

### Architecture

- Keep puzzle logic separate from UI.
- Use React + TypeScript + Vite for local development.
