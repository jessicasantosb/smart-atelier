import { describe, expect, it } from 'vite-plus/test';
import { findOrderById, findProductBySlug, findShopBySlug } from './mock-data';

describe('prototype fixtures', () => {
  it('finds the sample shop and its product', () => {
    expect(findShopBySlug('cera-atelier')?.name).toBe('Cera Atelier');
    expect(findProductBySlug('blue-ceramic-vase')).toMatchObject({
      priceInCents: 24000,
      currency: 'BRL',
      quantityAvailable: 1,
    });
  });

  it('finds the sample order and returns undefined for unknown records', () => {
    expect(findOrderById('pedido-demo')?.status).toBe('transferred');
    expect(findShopBySlug('missing')).toBeUndefined();
    expect(findProductBySlug('missing')).toBeUndefined();
    expect(findOrderById('missing')).toBeUndefined();
  });
});
