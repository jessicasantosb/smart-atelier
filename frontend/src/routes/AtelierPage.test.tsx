import { render, screen } from '../test-utils';
import { describe, expect, it } from 'vite-plus/test';
import { AtelierPage } from './AtelierPage';

describe('maker workspace', () => {
  it('offers clear paths to prepare a piece and open the shop', () => {
    render(() => <AtelierPage />);
    expect(screen.getByRole('link', { name: 'Prepare a piece' })).toHaveAttribute(
      'href',
      '/atelier/pecas/nova',
    );
    expect(screen.getByRole('link', { name: /Open public shop/ })).toHaveAttribute(
      'href',
      '/loja/cera-atelier',
    );
  });
});
