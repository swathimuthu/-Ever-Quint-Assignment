import React from 'react';
import styles from './Badge.module.css';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        ${styles.badge}
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}