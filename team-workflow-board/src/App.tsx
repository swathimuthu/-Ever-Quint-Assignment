import React, {
  useMemo,
  useState,
} from 'react';

import { BrowserRouter } from 'react-router-dom';

import { BoardView } from './components/board/BoardView';
import { FilterBar } from './components/board/FilterBar';
import { TaskForm } from './components/board/TaskForm';

import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { ToastContainer } from './components/ui/Toast';

import {
  TaskProvider,
  useTaskContext,
} from './context/TaskContext';

import { useFilters } from './hooks/useFilters';

import { filterTasks } from './utils/taskHelpers';

import { Task } from './types';

import './styles/globals.css';
import './App.css';
import { EmptyState } from './components/ui/EmptyState';

function AppContent() {
  const {
    tasks,
    createTask,
    updateTask,
    toasts,
    addToast,
    removeToast,
  } = useTaskContext();

  const {
    filters,
  } = useFilters();

  const filteredTasks = useMemo(
    () =>
      filterTasks(tasks, filters),
    [tasks, filters]
  );

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);

  const [
    editingTask,
    setEditingTask,
  ] = useState<Task | null>(null);

  function handleCreateTask(
    values: Omit<
      Task,
      'id' | 'createdAt' | 'updatedAt'
    >
  ) {
    createTask(values);

    addToast(
      'Task created successfully',
      'success'
    );

    setIsCreateModalOpen(false);
  }

  function handleUpdateTask(
    values: Omit<
      Task,
      'id' | 'createdAt' | 'updatedAt'
    >
  ) {
    if (!editingTask) {
      return;
    }

    updateTask(editingTask.id, values);

    addToast(
      'Task updated successfully',
      'success'
    );

    setEditingTask(null);
  }

  return (
    <main className="app">
      <header className="header">
        <h1 className="title">
          Team Workflow Board
        </h1>

        <Button
          onClick={() =>
            setIsCreateModalOpen(true)
          }
        >
          New Task
        </Button>
      </header>

      <FilterBar />

      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to get started."
          action={
            <Button
              onClick={() =>
                setIsCreateModalOpen(true)
              }
            >
              Create Task
            </Button>
          }
        />
      ) : filteredTasks.length === 0 ? (
          <EmptyState
            title="No matching tasks"
            description="Try adjusting your filters or search query."
          />
      ) : (
          <BoardView
            tasks={filteredTasks}
            onEditTask={setEditingTask}
          />
      )}

      <Modal
        open={isCreateModalOpen}
        title="Create Task"
        onClose={() =>
          setIsCreateModalOpen(false)
        }
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() =>
            setIsCreateModalOpen(false)
          }
        />
      </Modal>

      <Modal
        open={Boolean(editingTask)}
        title="Edit Task"
        onClose={() =>
          setEditingTask(null)
        }
      >
        {editingTask && (
          <TaskForm
            initialValues={
              editingTask
            }
            onSubmit={
              handleUpdateTask
            }
            onCancel={() =>
              setEditingTask(null)
            }
          />
        )}
      </Modal>

      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
      />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </BrowserRouter>
  );
}