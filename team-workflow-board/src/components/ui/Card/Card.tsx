import React from 'react';

import styles from './Card.module.css';

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export function Card({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
  ...rest
}: CardProps) {
  return (
    <div
      className={`
        ${styles.card}
        ${styles[padding]}
        ${hoverable ? styles.hoverable : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
}