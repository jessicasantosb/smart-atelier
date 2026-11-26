import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import { App } from './App';
import { render, screen, waitFor } from './test-utils';

describe('prototype routes', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('API offline')));
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.history.replaceState(null, '', '/');
  });

  it('opens a direct product link and follows checkout without exposing the address', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/produto/blue-ceramic-vase');
    render(() => <App />);

    await user.click(await screen.findByRole('link', { name: 'Buy this piece' }));
    await user.click(await screen.findByRole('link', { name: 'Continue with email' }));

    const review = await screen.findByRole('button', { name: 'Review checkout' });
    await waitFor(() => expect(screen.getByRole('main')).toHaveFocus());

    await user.click(review);
    expect(window.location.pathname).toBe('/checkout/endereco');

    await user.type(screen.getByLabelText('Full name'), 'Sample Buyer');
    await user.type(screen.getByLabelText('Street address'), '42 Sample Street');
    await user.type(screen.getByLabelText('City'), 'Sample City');
    await user.type(screen.getByLabelText('Postal code'), '12345');
    await user.type(screen.getByLabelText('State'), 'SP');
    await user.click(review);

    expect(
      await screen.findByRole('heading', { name: 'Hosted checkout preview' }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/checkout/pagamento');
    expect(window.location.search).toBe('');
    await waitFor(() => expect(document.title).toBe('Hosted checkout preview — Smart Atelier'));
  });

  it('offers a way home at an unknown URL', async () => {
    window.history.replaceState(null, '', '/unknown/path');
    render(() => <App />);

    expect(
      await screen.findByRole('heading', { name: 'This page is not here.' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to the marketplace' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
