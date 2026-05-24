import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Task } from '../types';

interface CreateTaskInput
  extends Omit<
    Task,
    'id' | 'createdAt' | 'updatedAt'
  > {}

export function useTasks(
  initialTasks: Task[],
  onSave: (tasks: Task[]) => void
) {
  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const persist = useCallback(
    (nextTasks: Task[]) => {
      setTasks(nextTasks);
      onSave(nextTasks);
    },
    [onSave]
  );

  const createTask = useCallback(
    (data: CreateTaskInput) => {
      const now = new Date().toISOString();

      const newTask: Task = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };

      persist([...tasks, newTask]);
    },
    [persist, tasks]
  );

  const updateTask = useCallback(
    (
      id: string,
      updates: Partial<Task>
    ) => {
      const nextTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt:
                new Date().toISOString(),
            }
          : task
      );

      persist(nextTasks);
    },
    [persist, tasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const nextTasks = tasks.filter(
        (task) => task.id !== id
      );

      persist(nextTasks);
    },
    [persist, tasks]
  );

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
  };
}