import { describe, expect, it } from 'vite-plus/test';
import { findProductBySlug, findShopBySlug } from '../lib/prototype/mock-data';

describe('public record lookups', () => {
  it('returns no record for an unknown public slug', () => {
    expect(findProductBySlug('missing-piece')).toBeUndefined();
    expect(findShopBySlug('missing-shop')).toBeUndefined();
  });
});
