import { render, screen } from '../../../test-utils';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { ApiStatus } from './ApiStatus';

describe('ApiStatus', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('announces when the backend is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(() => <ApiStatus />);

    expect(await screen.findByText('Backend is unavailable')).toHaveAttribute(
      'aria-live',
      'polite',
    );
  });
});
