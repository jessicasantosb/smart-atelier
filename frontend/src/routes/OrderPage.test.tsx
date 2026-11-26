import { renderRoute, screen } from '../test-utils';
import { describe, expect, it } from 'vite-plus/test';
import { OrderPage } from './OrderPage';
import { demoOrder } from '../lib/prototype/mock-data';

describe('sample order page', () => {
  it('shows the delivered timeline and labels the transfer as a test', async () => {
    renderRoute('/pedidos/:id', OrderPage, `/pedidos/${demoOrder.id}`);
    expect(await screen.findAllByText('Delivered')).toHaveLength(2);
    expect(screen.getByText('Test transfer initiated')).toBeInTheDocument();
    expect(screen.getByText('Test only')).toBeInTheDocument();
    expect(
      screen.getByText(/No payment, shipment, tracking update, or payout occurred/i),
    ).toBeInTheDocument();
  });
});
