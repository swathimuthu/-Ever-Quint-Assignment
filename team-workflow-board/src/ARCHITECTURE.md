# Architecture Decisions

This document explains the key architectural decisions and tradeoffs made while building the Team Workflow Board application.

---

# 1. State Management

## Chosen Approach
- React Context
- Custom hooks
- Local component state where appropriate

## Why Context Instead of Redux?

Redux was intentionally avoided because:
- application state size is relatively small,
- state relationships are straightforward,
- introducing Redux would add unnecessary boilerplate.

Using Context + hooks provided:
- cleaner architecture,
- better readability,
- lower complexity,
- easier onboarding.

---

# 2. Component Organization

The application is divided into:

```txt
components/ui
```

Reusable design-system style components:
- Button
- Modal
- Card
- Select
- Input
- Toast
- Badge

and:

```txt
components/board
```

Feature-specific components:
- BoardView
- BoardColumn
- TaskCard
- TaskForm
- FilterBar

This separation improves:
- reusability,
- maintainability,
- scalability.

---

# 3. Filter Architecture

Filters are synchronized using:

```ts
useSearchParams()
```

instead of local component state.

## Benefits

### Shareable URLs
Users can share filtered board views.

### Refresh Persistence
Filters remain intact after page refresh.

### Browser Navigation Support
Back/forward navigation works naturally.

---

# 4. Persistence Strategy

## Local Storage

Tasks are persisted using `localStorage`.

A schema wrapper is used:

```ts
{
  schemaVersion,
  tasks
}
```

instead of storing raw arrays directly.

## Why?

This enables:
- future migrations,
- backward compatibility,
- safer persistence evolution.

---

# 5. Migration Strategy

Storage migration support was included to simulate real-world frontend persistence evolution.

When schema versions differ:
- migration transforms old data,
- users receive a lightweight notification.

This approach demonstrates:
- forward-thinking architecture,
- safer persistence handling.

---

# 6. Accessibility Decisions

Accessibility was treated as a first-class concern.

Implemented improvements:
- semantic labels,
- keyboard-accessible task cards,
- accessible modal dialog,
- ARIA validation states,
- alert-based toast notifications.

---

# 7. Performance Optimizations

Several lightweight optimizations were implemented:

## React.memo
Used for `TaskCard` to reduce unnecessary rerenders.

## useMemo
Used for:
- filtered task calculations,
- grouped board rendering.

## useCallback
Used for:
- CRUD operations,
- stable handler references.

The application intentionally avoids premature optimization.

---

# 8. Styling Approach

CSS Modules were chosen because they provide:
- local style scoping,
- predictable styling,
- no runtime overhead,
- simple maintainability.

This approach also keeps the project dependency-light.

---

# 9. Testing Strategy

The testing approach prioritizes:
- meaningful user workflows,
- integration-focused behavior,
- accessibility-friendly querying.

Implemented tests:
- task creation flow,
- filter behavior.

The focus was placed on:
- user interactions,
- rendering behavior,
- application wiring,
rather than implementation details.

---

# 10. Tradeoffs

## Excluded Features

The following features were intentionally excluded:

- Drag-and-drop task movement
- Complex animation systems
- Redux
- Backend synchronization
- Advanced multi-select filters

## Reasoning

The goal was to prioritize:
- assignment requirements,
- maintainability,
- accessibility,
- architecture quality,
- delivery completeness.

Avoiding unnecessary complexity improved overall project quality.

---

# Summary

The application architecture prioritizes:
- simplicity,
- maintainability,
- accessibility,
- scalability,
- realistic frontend engineering practices.

The implementation intentionally balances:
- production-quality patterns,
- assignment scope,
- and practical tradeoffs.