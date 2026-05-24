import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';

import { useStorage } from '../hooks/useStorage';
import { useTasks } from '../hooks/useTasks';
import { useToast } from '../hooks/useToast';

import { Task } from '../types';

interface TaskContextValue {
  tasks: Task[];

  createTask: ReturnType<
    typeof useTasks
  >['createTask'];

  updateTask: ReturnType<
    typeof useTasks
  >['updateTask'];

  deleteTask: ReturnType<
    typeof useTasks
  >['deleteTask'];

  toasts: ReturnType<
    typeof useToast
  >['toasts'];

  addToast: ReturnType<
    typeof useToast
  >['add'];

  removeToast: ReturnType<
    typeof useToast
  >['remove'];
}

const TaskContext =
  createContext<TaskContextValue | null>(
    null
  );

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskProvider({
  children,
}: TaskProviderProps) {
  const {
    tasks: storedTasks,
    save,
  } = useStorage();

  const {
    tasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks(storedTasks, save);

  const {
  toasts,
  add,
  remove,
} = useToast();

  const value = useMemo(
    () => ({
      tasks,
      createTask,
      updateTask,
      deleteTask,
      toasts,
      addToast: add,
      removeToast: remove,
    }),
    [
      tasks,
      createTask,
      updateTask,
      deleteTask,
      toasts,
      add,
      remove,
    ]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context =
    useContext(TaskContext);

  if (!context) {
    throw new Error(
      'useTaskContext must be used within TaskProvider'
    );
  }

  return context;
}