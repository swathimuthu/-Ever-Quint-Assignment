import { useState } from "react";
import { StorageSchema, Task } from "../types";
import { CURRENT_VERSION, loadFromStorage, saveToStorage } from "../utils/storage";

export function useStorage() {
  const [migrated, setMigrated] = useState(false);
  const [schema, setSchema] = useState<StorageSchema>(() => {
    const loaded = loadFromStorage();
    if (loaded.schemaVersion < CURRENT_VERSION) setMigrated(true);
    return loaded;
  });

  const save = (tasks: Task[]) => {
    const next = { schemaVersion: CURRENT_VERSION, tasks };
    saveToStorage(next);
    setSchema(next);
  };

  return { tasks: schema.tasks, save, migrated };
}