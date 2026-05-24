import React from 'react';
import styles from './Toast.module.css';

type ToastVariant =
  | 'success'
  | 'error'
  | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

export function Toast({
  message,
  variant = 'success',
  onClose,
}: ToastProps) {
  return (
    <div
      className={`
        ${styles.toast}
        ${styles[variant]}
      `}
      role="alert"
      aria-live="polite"
    >
      <span className={styles.message}>
        {message}
      </span>

      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
    </div>
  );
}