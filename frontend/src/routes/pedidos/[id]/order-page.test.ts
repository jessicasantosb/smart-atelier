import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vite-plus/test';
import OrderPage from './+page.svelte';
import { demoOrder } from '../../../lib/prototype/mock-data';

describe('sample order page', () => {
  it('shows the delivered timeline and labels the transfer as a test', () => {
    render(OrderPage, { props: { data: { order: demoOrder }, params: { id: 'pedido-demo' } } });
    expect(screen.getAllByText('Delivered')).toHaveLength(2);
    expect(screen.getByText('Test transfer initiated')).toBeInTheDocument();
    expect(screen.getByText('Test only')).toBeInTheDocument();
    expect(
      screen.getByText(/No payment, shipment, tracking update, or payout occurred/i),
    ).toBeInTheDocument();
  });
});
