import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vite-plus/test';
import AtelierPage from './+page.svelte';

describe('maker workspace', () => {
  it('offers clear paths to prepare a piece and open the shop', () => {
    render(AtelierPage);
    expect(screen.getAllByRole('link', { name: 'Prepare a piece' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Open public shop/ })).toHaveAttribute(
      'href',
      '/loja/cera-atelier',
    );
  });
});
