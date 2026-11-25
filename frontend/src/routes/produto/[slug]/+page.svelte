<script lang="ts">
  import type { PageProps } from './$types';
  import Button from '#lib/components/ui/button/button.svelte';
  import { formatPrice } from '../../../lib/prototype/mock-data';

  let { data }: PageProps = $props();
</script>

<svelte:head><title>{data.product.title} — {data.shop.name}</title></svelte:head>
<div class="mb-6">
  <a href="/loja/{data.shop.slug}" class="text-sm text-slate-600 underline underline-offset-4"
    >Back to {data.shop.name}</a
  >
</div>
<article class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
  <div class="relative bg-[#dbe2de]">
    <img
      src={data.product.image}
      alt="Sculptural blue stoneware vase made by hand"
      class="aspect-[4/4.2] w-full object-cover"
    /><span class="absolute bottom-4 left-4 bg-white/90 px-3 py-2 text-sm"
      >A one-of-a-kind piece</span
    >
  </div>
  <div class="flex flex-col py-2 lg:py-10">
    <p class="text-sm text-slate-600">Handmade in {data.shop.location}</p>
    <h1 class="mt-3 text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
      {data.product.title}
    </h1>
    <a href="/loja/{data.shop.slug}" class="mt-3 w-fit text-[#2856D8] underline underline-offset-4"
      >by {data.shop.name}</a
    >
    <p class="mt-7 text-2xl font-medium">{formatPrice(data.product.priceInCents)}</p>
    <p class="mt-2 text-sm text-slate-600">One piece available</p>
    <Button href="/checkout/entrar" size="lg" class="mt-6 w-full sm:w-fit">Buy this piece</Button>
    <div class="mt-10 border-t border-slate-300 pt-6">
      <h2 class="text-lg font-medium">About this piece</h2>
      <p class="mt-3 leading-7 text-slate-600">{data.product.description}</p>
      <dl class="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
        <div>
          <dt class="text-slate-500">Materials</dt>
          <dd class="mt-1">{data.product.materials.join(', ')}</dd>
        </div>
        <div>
          <dt class="text-slate-500">Technique</dt>
          <dd class="mt-1">{data.product.technique}</dd>
        </div>
        <div>
          <dt class="text-slate-500">Dimensions</dt>
          <dd class="mt-1">{data.product.dimensions}</dd>
        </div>
        <div>
          <dt class="text-slate-500">Availability</dt>
          <dd class="mt-1">Ready to ship</dd>
        </div>
      </dl>
    </div>
  </div>
</article>
