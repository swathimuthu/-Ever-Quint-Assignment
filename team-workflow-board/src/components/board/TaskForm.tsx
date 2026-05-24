import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { TextArea } from '../ui/TextArea';
import { TextInput } from '../ui/TextInput';

import {
  Priority,
  Status,
  Task,
} from '../../types';

import styles from './TaskForm.module.css';

interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (
    values: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
}

interface TaskFormValues {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
  tags: string;
}

const STATUS_OPTIONS = [
  { label: 'Backlog', value: 'Backlog' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Done', value: 'Done' },
];

const PRIORITY_OPTIONS = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

export function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const initialState: TaskFormValues = useMemo(
    () => ({
      title: initialValues?.title ?? '',
      description: initialValues?.description ?? '',
      status: initialValues?.status ?? 'Backlog',
      priority: initialValues?.priority ?? 'Medium',
      assignee: initialValues?.assignee ?? '',
      tags: initialValues?.tags.join(', ') ?? '',
    }),
    [initialValues]
  );

  const [values, setValues] =
    useState<TaskFormValues>(initialState);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isDirty, setIsDirty] =
    useState(false);

  useEffect(() => {
    setValues(initialState);
  }, [initialState]);

  function updateField(
    key: keyof TaskFormValues,
    value: string
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setIsDirty(true);
  }

  function validate() {
    const nextErrors: FormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = 'Title is required';
    } else if (values.title.length > 80) {
      nextErrors.title =
        'Title cannot exceed 80 characters';
    }

    if (!values.description.trim()) {
      nextErrors.description =
        'Description is required';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      priority: values.priority,
      assignee: values.assignee.trim(),
      tags: values.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    setIsDirty(false);
  }

  function handleCancel() {
    if (isDirty) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to close?'
      );

      if (!confirmed) {
        return;
      }
    }

    onCancel();
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <TextInput
        id="title"
        label="Title"
        required
        value={values.title}
        onChange={(event) =>
          updateField('title', event.target.value)
        }
        error={errors.title}
        maxLength={80}
      />

      <TextArea
        id="description"
        label="Description"
        required
        value={values.description}
        onChange={(event) =>
          updateField(
            'description',
            event.target.value
          )
        }
        error={errors.description}
        rows={5}
      />

      <div className={styles.row}>
        <Select
          id="status"
          label="Status"
          options={STATUS_OPTIONS}
          value={values.status}
          onChange={(event) =>
            updateField('status', event.target.value)
          }
        />

        <Select
          id="priority"
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={values.priority}
          onChange={(event) =>
            updateField(
              'priority',
              event.target.value
            )
          }
        />
      </div>

      <TextInput
        id="assignee"
        label="Assignee"
        value={values.assignee}
        onChange={(event) =>
          updateField(
            'assignee',
            event.target.value
          )
        }
      />

      <TextInput
        id="tags"
        label="Tags"
        placeholder="frontend, api, urgent"
        value={values.tags}
        onChange={(event) =>
          updateField('tags', event.target.value)
        }
      />

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {initialValues ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}