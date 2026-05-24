import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  layout?: 'row' | 'column';
}

export function TextArea({
  id,
  label,
  error,
  layout = 'column',
  className,
  ...rest
}: TextAreaProps) {
  return (
    <div className={`${styles.wrapper} ${styles[layout]}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.textAreaWrapper}>
        <textarea
          id={id}
          className={`${styles.textArea} ${error ? styles.textAreaError : ''} ${className ?? ''}`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          {...rest}
        />
        {error && (
          <span
            id={`${id}-error`}
            className={styles.error}
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
}