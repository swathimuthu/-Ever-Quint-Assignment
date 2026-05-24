import React from 'react';
import styles from './TextInput.module.css';

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string;
  label: string;
  error?: string;
  layout?: 'row' | 'column';
}

export function TextInput({
  id,
  label,
  error,
  layout = 'column',
  className,
  ...rest
}: TextInputProps) {
  return (
    <div className={`${styles.wrapper} ${styles[layout]}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          className={`${styles.input} ${error ? styles.inputError : ''} ${className ?? ''}`}
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