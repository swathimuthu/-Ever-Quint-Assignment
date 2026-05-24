import React from 'react';

import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

import { Task } from '../../types';

import { relativeTime } from '../../utils/dateHelpers';

import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

function getPriorityVariant(priority: Task['priority']) {
  switch (priority) {
    case 'High':
      return 'danger';

    case 'Medium':
      return 'warning';

    case 'Low':
      return 'success';

    default:
      return 'default';
  }
}

export const TaskCard = React.memo(function TaskCard({
  task,
  onEdit,
}: TaskCardProps) {
  return (
    <Card
    hoverable
    onClick={onEdit}
    className={styles.card}
    role="button"
    tabIndex={0}
    onKeyDown={(event) => {
        if (
        event.key === 'Enter' ||
        event.key === ' '
        ) {
        event.preventDefault();
        onEdit();
        }
    }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          {task.title}
        </h3>

        <Badge variant={getPriorityVariant(task.priority)}>
          {task.priority}
        </Badge>
      </div>

      <p className={styles.description}>
        {task.description}
      </p>

      {task.tags.length > 0 && (
        <div className={styles.tags}>
          {task.tags.map((tag) => (
            <span
              key={tag}
              className={styles.tag}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.assignee}>
          {task.assignee || 'Unassigned'}
        </span>

        <span className={styles.time}>
          Updated {relativeTime(task.updatedAt)}
        </span>
      </div>
    </Card>
  );
});