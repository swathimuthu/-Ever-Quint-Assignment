import React from 'react';
import styles from './Select.module.css';

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  layout?: 'row' | 'column';
}

export function Select({
  id,
  label,
  options,
  error,
  placeholder = 'Select an option',
  layout = 'column',
  className = '',
  required,
  ...rest
}: SelectProps) {
  const errorId = `${id}-error`;

  return (
    <div className={`${styles.wrapper} ${styles[layout]}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required}> *</span>
        )}
      </label>

      <div className={styles.selectWrapper}>
        <select
          id={id}
          required={required}
          className={`
            ${styles.select}
            ${error ? styles.selectError : ''}
            ${className}
          `}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="">
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <span
            id={errorId}
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