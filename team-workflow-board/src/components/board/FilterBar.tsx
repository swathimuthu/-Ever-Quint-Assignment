import React from 'react';

import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { TextInput } from '../ui/TextInput';

import { useFilters } from '../../hooks/useFilters';

import styles from './FilterBar.module.css';

const PRIORITY_OPTIONS = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

const SORT_OPTIONS = [
  { label: 'Updated Date', value: 'updatedAt' },
  { label: 'Created Date', value: 'createdAt' },
  { label: 'Priority', value: 'priority' },
];

export function FilterBar() {
  const {
    filters,
    setFilter,
    clearFilters,
  } = useFilters();

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <TextInput
          id="search"
          label="Search"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(event) =>
            setFilter(
              'search',
              event.target.value
            )
          }
        />

        <Select
          id="priority-filter"
          label="Priority"
          placeholder="All priorities"
          options={PRIORITY_OPTIONS}
          value={filters.priority}
          onChange={(event) =>
            setFilter(
              'priority',
              event.target.value
            )
          }
        />

        <Select
          id="sort-by"
          label="Sort By"
          options={SORT_OPTIONS}
          value={filters.sortBy}
          onChange={(event) =>
            setFilter(
              'sortBy',
              event.target.value
            )
          }
        />

        <Select
          id="sort-direction"
          label="Direction"
          options={[
            { label: 'Descending', value: 'desc' },
            { label: 'Ascending', value: 'asc' },
          ]}
          value={filters.sortDir}
          onChange={(event) =>
            setFilter(
              'sortDir',
              event.target.value
            )
          }
        />
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}