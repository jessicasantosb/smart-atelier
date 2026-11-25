import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { findShopBySlug } from '../../../lib/prototype/mock-data';

export const load: PageLoad = ({ params }) => {
  const shop = findShopBySlug(params.slug);
  if (!shop) error(404, 'Shop not found');
  return { shop };
};
