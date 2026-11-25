<script lang="ts">
  import Button from '#lib/components/ui/button/button.svelte';
  import { demoProduct, demoShop, formatPrice } from '../../lib/prototype/mock-data';
</script>

<svelte:head><title>Your studio — Smart Atelier</title></svelte:head>
<div class="mb-8 flex flex-wrap items-end justify-between gap-5">
  <div>
    <p class="mb-2 text-sm text-slate-600">Maker workspace</p>
    <h1 class="text-4xl font-medium tracking-tight">Good morning, Ana.</h1>
    <p class="mt-3 text-slate-600">Your shop is ready for its first piece.</p>
  </div>
  <Button href="/atelier/pecas/nova" size="lg">Prepare a piece</Button>
</div>
<section class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
  <div class="border-t border-slate-300 pt-5">
    <div class="mb-5 flex items-center justify-between">
      <h2 class="text-xl font-medium">Your shop</h2>
      <span class="text-sm text-emerald-800">Preview ready</span>
    </div>
    <a
      href="/loja/{demoShop.slug}"
      class="group grid gap-5 bg-white p-4 sm:grid-cols-[180px_1fr] sm:items-center"
    >
      <img
        src={demoProduct.image}
        alt="Blue vase from {demoShop.name}"
        class="aspect-square w-full object-cover"
      />
      <div>
        <p class="text-sm text-slate-500">{demoShop.location}</p>
        <h3 class="mt-2 text-2xl font-medium">{demoShop.name}</h3>
        <p class="mt-3 max-w-sm text-slate-600">{demoShop.description}</p>
        <span
          class="mt-5 inline-block text-sm font-medium text-[#2856D8] underline underline-offset-4"
          >Open public shop</span
        >
      </div>
    </a>
  </div>
  <div class="border-t border-slate-300 pt-5">
    <h2 class="text-xl font-medium">A first piece to share</h2>
    <div class="mt-5 flex gap-4 border-b border-slate-200 pb-5">
      <img src={demoProduct.image} alt="Tidal blue vase" class="size-24 object-cover" />
      <div>
        <p class="text-sm text-slate-500">Ready to publish</p>
        <h3 class="mt-1 font-medium">{demoProduct.title}</h3>
        <p class="mt-1 text-sm text-slate-600">{formatPrice(demoProduct.priceInCents)}</p>
      </div>
    </div>
    <div class="mt-5 flex flex-wrap gap-3">
      <Button href="/atelier/pecas/nova" variant="outline">Edit piece details</Button><Button
        href="/pedidos/pedido-demo"
        variant="ghost">View a sample order</Button
      >
    </div>
  </div>
</section>
