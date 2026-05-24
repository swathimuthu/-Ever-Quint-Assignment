import React from 'react';

import { Status, Task } from '../../types';

import { TaskCard } from './TaskCard';

import styles from './BoardColumn.module.css';

interface BoardColumnProps {
  status: Status;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export function BoardColumn({
  status,
  tasks,
  onEditTask,
}: BoardColumnProps) {
  return (
    <section
      className={styles.column}
      aria-label={`${status} tasks`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>
          {status}
        </h2>

        <span className={styles.count}>
          {tasks.length}
        </span>
      </div>

      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <div className={styles.emptyState}>
            No tasks yet
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
            />
          ))
        )}
      </div>
    </section>
  );
}