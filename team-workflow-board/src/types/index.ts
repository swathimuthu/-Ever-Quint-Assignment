export type Status = 'Backlog' | 'In Progress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
  tags: string[];
  createdAt: string;   // ISO date string
  updatedAt: string;
}

export interface StorageSchema {
  schemaVersion: number;
  tasks: Task[];
}

export interface FilterState {
  search: string;
  statuses: Status[];
  priority: Priority | '';
  sortBy: 'createdAt' | 'updatedAt' | 'priority';
  sortDir: 'asc' | 'desc';
}