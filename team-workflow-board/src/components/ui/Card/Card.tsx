import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={`
        ${styles.card}
        ${styles[padding]}
        ${hoverable ? styles.hoverable : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}