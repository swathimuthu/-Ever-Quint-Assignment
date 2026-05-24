# Team Workflow Board

A simplified Jira/Trello-style task management app built with React and TypeScript.
Built as part of the Ever Quint interview assignment.

---

## How to Run

```bash
# Clone the repo
git clone https://github.com/swathimuthu/-Ever-Quint-Assignment.git
cd team-workflow-board

# Install dependencies
yarn install

# Start the app
yarn start

# Run tests
yarn test
```

---

## Architecture Overview

### Folder Structure

```
src/
├── types/index.ts          # All TypeScript interfaces (Task, Status, Priority, Toast)
├── components/
│   ├── ui/                 # Reusable component library
│   │   ├── Button/
│   │   ├── TextInput/
│   │   ├── TextArea/
│   │   ├── Select/
│   │   ├── Badge/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Toast/
│   └── board/              # Feature components
│       ├── BoardView.tsx
│       ├── BoardColumn.tsx
│       ├── TaskCard.tsx
│       ├── TaskForm.tsx
│       └── FilterBar.tsx
├── hooks/                  # Custom hooks
│   ├── useTasks.ts
│   ├── useStorage.ts
│   ├── useFilters.ts
│   └── useToast.ts
├── utils/
│   ├── storage.ts
│   ├── taskHelpers.ts
│   └── dateHelpers.ts
└── __tests__/
```

### State Management

I chose React Context + useReducer over a library like Zustand or Redux because the
app's state is simple enough — tasks list, filter state, and toast notifications.
Adding a full state management library would be over-engineering for this scope.
I documented this trade-off consciously and can extend to Zustand if the app grows.

### Component Design

All UI components (Button, TextInput, TextArea, Select, Badge, Card, Modal, Toast) are
built from scratch without any UI kit like Material UI or Ant Design, as required by
the assignment. Each component:

- Has a clear, typed props interface extending native HTML attributes
- Uses CSS Modules with shared design tokens (CSS custom properties)
- Handles accessibility with proper ARIA attributes
- Supports layout variants where relevant (row/column)

### Data Flow

```
localStorage → useStorage → TaskContext → Board Components → UI Components
                                ↑
                            useTasks (CRUD)
                            useFilters (URL sync)
                            useToast (notifications)
```

---

## Storage Versioning & Migration

Tasks are persisted in localStorage with a versioned schema:

```typescript
interface StorageSchema {
  schemaVersion: number;  // bumped when Task shape changes
  tasks: Task[];
}
```

When the app loads, it reads the stored schemaVersion and runs migrations
if an older version is detected:

- Version 1 → Version 2: Added tags: string[] to the Task model.
  All existing tasks get an empty tags array automatically.

If a migration runs, a non-intrusive info toast is shown:
"Your data was updated to the latest version"

---

## Key Decisions & Trade-offs

| Decision | Reason |
|---|---|
| CSS Modules over Tailwind | More explicit, no compiler dependency, easier to review |
| Context over Zustand | Sufficient for this scope, no extra dependency |
| localStorage over IndexedDB | Simpler API, sufficient for task data at this scale |
| Status change via dropdown | Drag and drop skipped to focus on code quality over features |
| No backend | As required by the assignment |

### Known Limitations

- Drag and drop not implemented — status is changed via a dropdown on the task card.
  Can be added using dnd-kit as a next step.
- No IndexedDB — localStorage works well for this scale but has a 5MB limit.
- Test coverage is minimal — covers core workflow and filter behavior as required.

---

## What I Would Add Next

- Drag and drop between columns using dnd-kit
- Assignee autocomplete from a team members list
- Due dates with overdue highlighting
- More test coverage — especially for the Modal and dirty state warning
- A dark mode toggle using CSS custom properties

---

## AI Assistance Disclosure

As required by the assignment, I am transparently documenting where I used AI assistance:

### What I built myself
- All UI components (Button, TextInput, TextArea, Select, Badge, Card, Modal, Toast)
  — I wrote these components and their CSS independently
- The Max Profit DSA solution — I worked through the logic myself,
  arriving at the brute force optimization through my own reasoning
- The Water Tank DSA solution — I understood and implemented the
  two-pointer approach independently
- Component props design — I decided the interfaces for each component

### Where I used AI assistance
- localStorage migration pattern — I was not previously familiar with
  versioned schema migration in localStorage. I learned this concept
  through AI assistance and implemented it myself after understanding it.
  The migrate() function and schemaVersion pattern was new to me.

### What I changed from AI suggestions
- Renamed CSS class testAreaWrapper to textAreaWrapper (caught a typo)
- Added layout prop to form components (my own idea, not suggested)
- Made disabled optional on the Option interface (my refinement)

---

## DSA Solutions

Both DSA problems are solved in the /dsa folder:

| Problem | File | Approach | Complexity |
|---|---|---|---|
| Max Profit | dsa/arrays/max-profit.js | Brute force optimized with early exit | O(N²) |
| Water Tank | dsa/arrays/water-tank.js | Two pointer | O(N) time, O(1) space |

---

## Author

Swathi Muthu
GitHub: @swathimuthu
