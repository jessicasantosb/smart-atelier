import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vite-plus/test';
import ProductPage from './+page.svelte';
import { demoProduct, demoShop } from '../../../lib/prototype/mock-data';

describe('public product page', () => {
  it('shows the product and sends the buyer to the sign-in step', () => {
    render(ProductPage, {
      props: { data: { product: demoProduct, shop: demoShop }, params: { slug: demoProduct.slug } },
    });
    expect(screen.getByRole('heading', { name: demoProduct.title })).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('240,00'))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Buy this piece' })).toHaveAttribute(
      'href',
      '/checkout/entrar',
    );
  });
});
