import { Task, FilterState, Priority } from '../types';

const PRIORITY_ORDER: Record<Priority, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function sortTasks(
  a: Task,
  b: Task,
  sortBy: FilterState['sortBy'],
  sortDir: FilterState['sortDir']
): number {
  let comparison = 0;

  if (sortBy === 'priority') {
    comparison = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
  } else if (sortBy === 'createdAt') {
    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  } else if (sortBy === 'updatedAt') {
    comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
  }

  return sortDir === 'desc' ? -comparison : comparison;
}

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  return tasks
    .filter(t => {
      const matchSearch =
        t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus =
        filters.statuses.length === 0 || filters.statuses.includes(t.status);
      const matchPriority =
        !filters.priority || t.priority === filters.priority;
      return matchSearch && matchStatus && matchPriority;
    })
    .sort((a, b) => sortTasks(a, b, filters.sortBy, filters.sortDir));
}