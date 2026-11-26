import { render, renderRoute, screen } from '../test-utils';
import { describe, expect, it } from 'vite-plus/test';
import { CheckoutSignInPage } from './CheckoutSignInPage';
import { CheckoutAddressPage } from './CheckoutAddressPage';
import { CheckoutPaymentPage } from './CheckoutPaymentPage';

describe('buyer checkout preview', () => {
  it('labels sign-in as a demo and allows continuing to address details', () => {
    render(() => <CheckoutSignInPage />);
    expect(
      screen.getByText('No account is created and no provider is contacted.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue with email' })).toHaveAttribute(
      'href',
      '/checkout/endereco',
    );
  });

  it('requires delivery details with associated labels', async () => {
    renderRoute('/checkout/endereco', CheckoutAddressPage, '/checkout/endereco');
    expect(await screen.findByLabelText('Full name')).toBeRequired();
    expect(screen.getByLabelText('Street address')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Review checkout' })).toHaveAttribute(
      'type',
      'submit',
    );
  });

  it('previews hosted checkout without collecting card data', () => {
    render(() => <CheckoutPaymentPage />);
    expect(
      screen.getByText(/does not connect to Stripe, request card details, or charge you/i),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/card number|expiration|cvc/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View sample order' })).toHaveAttribute(
      'href',
      '/pedidos/pedido-demo',
    );
  });
});
