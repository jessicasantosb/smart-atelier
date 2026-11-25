import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { findProductBySlug, findShopBySlug } from '../../../lib/prototype/mock-data';

export const load: PageLoad = ({ params }) => {
  const product = findProductBySlug(params.slug);
  if (!product) error(404, 'Product not found');
  const shop = findShopBySlug(product.shopSlug);
  if (!shop) error(404, 'Shop not found');
  return { product, shop };
};
