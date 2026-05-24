import { StorageSchema } from "../types";

const STORAGE_KEY = 'twb_data';
export const CURRENT_VERSION = 2;

// Version 1 shape (old): tasks had no `tags` field
// Version 2 shape (new): tasks have tags: string[]

export function loadFromStorage(): StorageSchema {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { schemaVersion: CURRENT_VERSION, tasks: [] };
  const parsed = JSON.parse(raw);
  return migrate(parsed);
}

function migrate(data: any): StorageSchema {
  if (data.schemaVersion === 1) {
    // Migration: add empty tags array to all tasks
    return {
      schemaVersion: 2,
      tasks: data.tasks.map((t: any) => ({ ...t, tags: t.tags ?? [] }))
    };
  }
  return data;
}

export function saveToStorage(schema: StorageSchema): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
}