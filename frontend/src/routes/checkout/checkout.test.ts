import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vite-plus/test';
import SignInPage from './entrar/+page.svelte';
import AddressPage from './endereco/+page.svelte';
import PaymentPage from './pagamento/+page.svelte';

describe('buyer checkout preview', () => {
  it('labels sign-in as a demo and allows continuing to address details', () => {
    render(SignInPage);
    expect(
      screen.getByText('No account is created and no provider is contacted.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue with email' })).toHaveAttribute(
      'href',
      '/checkout/endereco',
    );
  });

  it('requires delivery details with associated labels', () => {
    render(AddressPage);
    expect(screen.getByLabelText('Full name')).toBeRequired();
    expect(screen.getByLabelText('Street address')).toBeRequired();
    expect(screen.getByRole('link', { name: 'Review checkout' })).toHaveAttribute(
      'href',
      '/checkout/pagamento',
    );
  });

  it('previews hosted checkout without collecting card data', () => {
    render(PaymentPage);
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
