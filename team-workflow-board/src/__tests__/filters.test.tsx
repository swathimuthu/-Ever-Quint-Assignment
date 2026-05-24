import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { within } from '@testing-library/react';

import App from '../App';

describe('Filter Behavior', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  test('filters tasks using search input', async () => {
    render(<App />);


    await userEvent.click(
      screen.getByRole('button', {
        name: /new task/i,
      })
    );

    await userEvent.type(
      screen.getByLabelText(/title/i),
      'Frontend Task'
    );

    await userEvent.type(
      screen.getByLabelText(/description/i),
      'Build UI'
    );

    const dialog = screen.getByRole('dialog');

    await userEvent.click(
      within(dialog).getByRole('button', {
        name: /create task/i,
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: /new task/i,
      })
    );

    await userEvent.type(
      screen.getByLabelText(/title/i),
      'Backend Task'
    );

    await userEvent.type(
      screen.getByLabelText(/description/i),
      'Build API'
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: /create task/i,
      })
    );

    await userEvent.type(
      screen.getByLabelText(/search/i),
      'Frontend'
    );

    expect(
      screen.getByText(
        'Frontend Task'
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        'Backend Task'
      )
    ).not.toBeInTheDocument();
  });
});