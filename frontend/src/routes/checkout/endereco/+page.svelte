<script lang="ts">
  import Button from '#lib/components/ui/button/button.svelte';
  import { demoProduct, demoShop, formatPrice } from '../../../lib/prototype/mock-data';
</script>

<svelte:head><title>Delivery details — Smart Atelier</title></svelte:head>
<div class="mx-auto max-w-4xl">
  <a href="/checkout/entrar" class="text-sm text-slate-600 underline underline-offset-4"
    >Back to sign in</a
  >
  <div class="mt-6 grid gap-8 md:grid-cols-[1fr_0.75fr]">
    <form action="/checkout/pagamento" class="space-y-5 bg-white p-5 sm:p-8">
      <p class="text-sm text-slate-600">Delivery · Step 1 of 2</p>
      <h1 class="text-3xl font-medium tracking-tight">Where should it go?</h1>
      <p class="text-sm text-slate-600">
        Your address is shown for this demo only. It is not stored or sent.
      </p>
      <label class="block text-sm font-medium"
        >Full name<input
          name="name"
          autocomplete="name"
          required
          class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
        /></label
      >
      <label class="block text-sm font-medium"
        >Street address<input
          name="street"
          autocomplete="street-address"
          required
          class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
        /></label
      >
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block text-sm font-medium"
          >City<input
            name="city"
            autocomplete="address-level2"
            required
            class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
          /></label
        ><label class="block text-sm font-medium"
          >Postal code<input
            name="postalCode"
            autocomplete="postal-code"
            required
            class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
          /></label
        >
      </div>
      <label class="block text-sm font-medium"
        >State<input
          name="state"
          autocomplete="address-level1"
          required
          class="mt-2 w-full border border-slate-300 bg-white px-3 py-2.5 font-normal"
        /></label
      >
      <Button href="/checkout/pagamento" size="lg">Review checkout</Button>
    </form>
    <aside class="h-fit border-t border-slate-300 pt-5">
      <p class="text-sm text-slate-500">Order summary</p>
      <a href="/produto/{demoProduct.slug}" class="mt-4 flex gap-4"
        ><img src={demoProduct.image} alt="Tidal blue vase" class="size-20 object-cover" /><span
          ><span class="block font-medium">{demoProduct.title}</span><span
            class="mt-1 block text-sm text-slate-600">{demoShop.name}</span
          ></span
        ></a
      >
      <div class="mt-5 flex justify-between border-t border-slate-300 pt-4 font-medium">
        <span>Item total</span><span>{formatPrice(demoProduct.priceInCents)}</span>
      </div>
      <p class="mt-3 text-sm text-slate-500">Shipping details appear in the real checkout.</p>
    </aside>
  </div>
</div>
