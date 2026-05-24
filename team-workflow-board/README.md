# Team Workflow Board

A lightweight Kanban-style task management application built with React and TypeScript.

This project was developed as part of a frontend engineering assignment with a focus on:
- reusable component architecture,
- accessibility,
- URL-synchronized filters,
- local persistence,
- performance optimization,
- maintainability.

---

## Features

### Task Management
- Create tasks
- Edit existing tasks
- Delete tasks
- Organize tasks by status:
  - Backlog
  - In Progress
  - Done

### Filtering & Sorting
- Search tasks by title/description
- Filter by priority
- Sort by:
  - Updated date
  - Created date
  - Priority
- URL query string synchronization for shareable state

### Persistence
- Tasks persist using `localStorage`
- Schema versioning + migration support

### Accessibility
- Semantic form labels
- Keyboard accessible task cards
- Accessible modal dialog
- ARIA attributes for validation and notifications

### UX Improvements
- Empty states
- Toast notifications
- Responsive layout
- Error handling for storage failures

### Testing
- Create task workflow test
- Filter behavior test

---

## Tech Stack

- React
- TypeScript
- React Router
- CSS Modules
- React Testing Library
- Jest

---

## Project Structure

```txt
src/
├── components/
│   ├── board/
│   └── ui/
├── context/
├── hooks/
├── styles/
├── types/
├── utils/
└── __tests__/
```

---

## Running Locally

### Install dependencies

```bash
yarn install
```

### Start development server

```bash
yarn start
```

### Run tests

```bash
yarn test
```

---

## Architecture Highlights

### Component-Driven Structure
The application is organized around reusable UI and feature components.

### Context-Based State Management
React Context + custom hooks were chosen instead of Redux because:
- application state is relatively small,
- avoids unnecessary complexity,
- keeps architecture lightweight and maintainable.

### URL-Driven Filters
Filter state is synchronized using `URLSearchParams` to support:
- shareable URLs,
- refresh persistence,
- browser navigation compatibility.

### Local Storage Versioning
Storage schema versioning allows future migration support without breaking saved user data.

---

## Performance Optimizations

Implemented optimizations include:
- `React.memo` for task cards
- `useMemo` for filtered/grouped task calculations
- `useCallback` for CRUD handlers
- scoped rendering updates

---

## Accessibility Considerations

- Keyboard navigable task interactions
- Accessible modal dialog
- Form validation states
- Proper semantic roles and labels
- Toast notifications announced using `role="alert"`

---

## Tradeoffs & Decisions

### Why No Drag & Drop?
Drag-and-drop functionality was intentionally excluded to prioritize:
- core assignment requirements,
- maintainability,
- accessibility,
- overall application quality.

### Why Context Instead of Redux?
Redux would introduce unnecessary boilerplate for the current application size.

Context + hooks provided:
- simpler architecture,
- easier maintainability,
- sufficient scalability for assignment scope.

---

## Future Improvements

Potential future enhancements:
- Drag-and-drop task movement
- Debounced search filtering
- Dark mode
- Advanced filter combinations
- Backend synchronization
- Virtualized rendering for large datasets

---

## Author

Built by Swathi Muthuvel.