import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { findOrderById } from '../../../lib/prototype/mock-data';

export const load: PageLoad = ({ params }) => {
  const order = findOrderById(params.id);
  if (!order) error(404, 'Order not found');
  return { order };
};
