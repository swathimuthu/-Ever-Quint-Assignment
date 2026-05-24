import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { within } from '@testing-library/react';

import App from '../App';

describe('Create Task Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('creates a new task and displays it on the board', async () => {
    render(<App />);

    await userEvent.click(
      screen.getByRole('button', {
        name: /new task/i,
      })
    );

    const dialog = screen.getByRole('dialog');

    await userEvent.type(
      within(dialog).getByLabelText(/title/i),
      'Build Task Form'
    );

    await userEvent.type(
      within(dialog).getByLabelText(/description/i),
      'Implement task creation workflow'
    );

    await userEvent.selectOptions(
      within(dialog).getByLabelText(/priority/i),
      'High'
    );

    await userEvent.click(
      within(dialog).getByRole('button', {
        name: /create task/i,
      })
    );

    expect(
      screen.getByText(
        'Build Task Form'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /build task form/i,
      })
    ).toBeInTheDocument();
  });
});