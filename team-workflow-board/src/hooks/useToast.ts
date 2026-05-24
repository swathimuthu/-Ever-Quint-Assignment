import { useCallback, useState } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toasts, setToasts] =
    useState<Toast[]>([]);

  const remove = useCallback(
    (id: string) => {
      setToasts((prev) =>
        prev.filter(
          (toast) => toast.id !== id
        )
      );
    },
    []
  );

  const add = useCallback(
    (
      message: string,
      type: Toast['type'] = 'success'
    ) => {
      const id =
        crypto.randomUUID();

      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          type,
        },
      ]);

      setTimeout(() => {
        remove(id);
      }, 3000);
    },
    [remove]
  );

  return {
    toasts,
    add,
    remove,
  };
}