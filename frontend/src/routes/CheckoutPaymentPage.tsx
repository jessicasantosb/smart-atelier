import { Title } from '@solidjs/meta';
import { ButtonLink } from '../lib/components/ui/button';
import { demoProduct, formatPrice } from '../lib/prototype/mock-data';

export function CheckoutPaymentPage() {
  return (
    <>
      <Title>Hosted checkout preview — Smart Atelier</Title>
      <div class="mx-auto max-w-3xl">
        <a href="/checkout/endereco" class="text-sm text-slate-600 underline underline-offset-4">
          Back to delivery details
        </a>
        <div class="mt-8 border border-slate-200 bg-white p-6 sm:p-10">
          <p class="text-sm text-slate-500">Secure payment · Preview</p>
          <h1 class="mt-2 text-3xl font-medium tracking-tight">Hosted checkout preview</h1>
          <p class="mt-4 max-w-xl leading-7 text-slate-600">
            In the finished application, you will continue to Stripe's hosted test checkout. This
            prototype does not connect to Stripe, request card details, or charge you.
          </p>
          <div class="mt-7 flex items-center gap-4 border-y border-slate-200 py-5">
            <img src={demoProduct.image} alt="Tidal blue vase" class="size-20 object-cover" />
            <div class="flex-1">
              <h2 class="font-medium">{demoProduct.title}</h2>
              <p class="mt-1 text-sm text-slate-600">One handmade piece</p>
            </div>
            <span class="font-medium">{formatPrice(demoProduct.priceInCents)}</span>
          </div>
          <p class="mt-6 text-sm text-slate-600">
            No card fields are included here. The next step opens a sample order timeline.
          </p>
          <ButtonLink href="/pedidos/pedido-demo" size="lg" class="mt-6">
            View sample order
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
