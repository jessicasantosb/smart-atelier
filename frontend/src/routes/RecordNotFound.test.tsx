import { describe, expect, it } from 'vite-plus/test';
import { renderRoute, screen } from '../test-utils';
import { OrderPage } from './OrderPage';
import { ProductPage } from './ProductPage';
import { ShopPage } from './ShopPage';

describe('unknown records', () => {
  it.each([
    ['/produto/:slug', ProductPage, '/produto/missing-piece', 'Product not found'],
    ['/loja/:slug', ShopPage, '/loja/missing-shop', 'Shop not found'],
    ['/pedidos/:id', OrderPage, '/pedidos/missing-order', 'Order not found'],
  ] as const)('shows a fallback for %s', async (path, page, url, message) => {
    renderRoute(path, page, url);

    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to the marketplace' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
