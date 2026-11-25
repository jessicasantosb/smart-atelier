<script lang="ts">
  import Button from '#lib/components/ui/button/button.svelte';
  import { demoProduct, formatPrice } from '../../../lib/prototype/mock-data';
</script>

<svelte:head><title>Sign in to continue — Smart Atelier</title></svelte:head>
<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_0.8fr] md:items-start">
  <div>
    <a
      href="/produto/{demoProduct.slug}"
      class="text-sm text-slate-600 underline underline-offset-4">Back to the piece</a
    >
    <p class="mt-8 text-sm text-slate-600">Before checkout</p>
    <h1 class="mt-2 text-4xl font-medium tracking-tight">
      Your account keeps the order in one place.
    </h1>
    <p class="mt-4 leading-7 text-slate-600">
      Sign in or create an account to continue to the delivery details. This step is only a visual
      demo.
    </p>
    <div class="mt-7 flex flex-col items-start gap-3">
      <Button href="/checkout/endereco" size="lg">Continue with email</Button><Button
        href="/checkout/endereco"
        variant="outline"
        size="lg">Continue with Google</Button
      >
    </div>
    <p class="mt-4 text-xs text-slate-500">No account is created and no provider is contacted.</p>
  </div>
  <aside class="bg-white p-5">
    <p class="text-sm text-slate-500">Your piece</p>
    <div class="mt-4 flex gap-4">
      <img src={demoProduct.image} alt="Tidal blue vase" class="size-24 object-cover" />
      <div>
        <h2 class="font-medium">{demoProduct.title}</h2>
        <p class="mt-1 text-sm text-slate-600">{formatPrice(demoProduct.priceInCents)}</p>
      </div>
    </div>
  </aside>
</div>
