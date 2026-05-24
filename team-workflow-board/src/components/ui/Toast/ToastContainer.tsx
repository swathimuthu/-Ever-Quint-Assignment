import React from 'react';

import { Toast } from './Toast';

import styles from './ToastContainer.module.css';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

export function ToastContainer({
  toasts,
  onClose,
}: ToastContainerProps) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.type}
          onClose={() =>
            onClose(toast.id)
          }
        />
      ))}
    </div>
  );
}