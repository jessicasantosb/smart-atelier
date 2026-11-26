import { renderRoute, screen } from '../test-utils';
import { describe, expect, it } from 'vite-plus/test';
import { ProductPage } from './ProductPage';
import { demoProduct } from '../lib/prototype/mock-data';

describe('public product page', () => {
  it('shows the product and sends the buyer to the sign-in step', async () => {
    renderRoute('/produto/:slug', ProductPage, `/produto/${demoProduct.slug}`);
    expect(await screen.findByRole('heading', { name: demoProduct.title })).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('240,00'))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Buy this piece' })).toHaveAttribute(
      'href',
      '/checkout/entrar',
    );
  });
});
