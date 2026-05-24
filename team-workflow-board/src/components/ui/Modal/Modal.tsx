import React, {
  useEffect,
  useRef,
} from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();

      const firstFocusable = dialog.querySelector<
        HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement | HTMLSelectElement
      >(
        'input, button, textarea, select'
      );

      firstFocusable?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.header}>
        <h2
          id="modal-title"
          className={styles.title}
        >
          {title}
        </h2>

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </dialog>
  );
}