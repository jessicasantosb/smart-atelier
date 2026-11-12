import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vite-plus/test';
import Counter from './Counter.svelte';

describe('Counter', () => {
  it('increments the displayed value when clicked', async () => {
    const user = userEvent.setup();
    render(Counter);

    const button = screen.getByRole('button', { name: 'Count is 0' });
    await user.click(button);

    expect(screen.getByRole('button', { name: 'Count is 1' })).toBeInTheDocument();
  });
});
