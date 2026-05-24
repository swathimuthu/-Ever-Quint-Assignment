import { useSearchParams } from 'react-router-dom';

import {
  FilterState,
  Priority,
  Status,
} from '../types';

export function useFilters() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const filters: FilterState = {
    search: searchParams.get('search') ?? '',

    statuses: (
      searchParams.get('statuses') ?? ''
    )
      .split(',')
      .filter(Boolean) as Status[],

    priority: (
      searchParams.get('priority') ?? ''
    ) as Priority | '',

    sortBy: (
      searchParams.get('sortBy') ?? 'updatedAt'
    ) as FilterState['sortBy'],

    sortDir: (
      searchParams.get('sortDir') ?? 'desc'
    ) as 'asc' | 'desc',
  };

  function setFilter(
    key: keyof FilterState,
    value: string | string[]
  ) {
    const nextParams =
      new URLSearchParams(searchParams);

    if (
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      nextParams.delete(key);
    } else {
      nextParams.set(
        key,
        Array.isArray(value)
          ? value.join(',')
          : value
      );
    }

    setSearchParams(nextParams);
  }

  function clearFilters() {
    setSearchParams({});
  }

  return {
    filters,
    setFilter,
    clearFilters,
  };
}