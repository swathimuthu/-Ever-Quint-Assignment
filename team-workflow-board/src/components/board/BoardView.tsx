import React from 'react';
import { Status, Task } from '../../types';
import styles from './BoardView.module.css';
import { BoardColumn } from './BoardColumn';

interface BoardViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const STATUSES: Status[] = [
  'Backlog',
  'In Progress',
  'Done',
];

export function BoardView({
  tasks,
  onEditTask,
}: BoardViewProps) {
  return (
    <div className={styles.board}>
      {STATUSES.map((status) => {
        const columnTasks = tasks.filter(
          (task) => task.status === status
        );

        return (
          <BoardColumn
            key={status}
            status={status}
            tasks={columnTasks}
            onEditTask={onEditTask}
          />
        );
      })}
    </div>
  );
}