import { cleanup, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import ApiStatus from './ApiStatus.svelte';

describe('ApiStatus', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('announces when the backend is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(ApiStatus);

    await waitFor(() => expect(screen.getByText('Backend is unavailable')).toBeInTheDocument());
    expect(screen.getByText('Backend is unavailable')).toHaveAttribute('aria-live', 'polite');
    cleanup();
  });
});
