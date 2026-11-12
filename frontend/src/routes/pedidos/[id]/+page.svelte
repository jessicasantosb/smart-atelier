<script lang="ts">
  import type { PageProps } from './$types';
  import Button from '#lib/components/ui/button/button.svelte';
  import { demoProduct, demoShop, formatPrice } from '../../../lib/prototype/mock-data';

  let { data }: PageProps = $props();
</script>

<svelte:head><title>Order {data.order.id} — Smart Atelier</title></svelte:head>
<div class="mx-auto max-w-4xl">
  <a href="/" class="text-sm text-slate-600 underline underline-offset-4">Back to the marketplace</a
  >
  <div class="mt-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <p class="text-sm text-slate-600">Sample order · {data.order.id}</p>
      <h1 class="mt-2 text-4xl font-medium tracking-tight">Your piece found its way home.</h1>
    </div>
    <span class="bg-emerald-100 px-3 py-2 text-sm text-emerald-900">Delivered</span>
  </div>
  <section class="mt-8 grid gap-8 bg-white p-5 sm:p-8 md:grid-cols-[1fr_1fr]">
    <div class="flex gap-4">
      <img src={demoProduct.image} alt="Tidal blue vase" class="size-24 object-cover" />
      <div>
        <h2 class="font-medium">{demoProduct.title}</h2>
        <p class="mt-1 text-sm text-slate-600">{demoShop.name}</p>
        <p class="mt-2 font-medium">{formatPrice(demoProduct.priceInCents)}</p>
      </div>
    </div>
    <div>
      <h2 class="font-medium">Order progress</h2>
      <ol class="mt-4 space-y-4">
        {#each data.order.steps as step, index}<li class="flex items-center gap-3 text-sm">
            <span
              class="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-900"
              >✓</span
            ><span>{step}</span>{#if index === 3}<span class="ml-auto text-xs text-slate-500"
                >Test only</span
              >{/if}
          </li>{/each}
      </ol>
    </div>
  </section>
  <p class="mt-5 text-sm leading-6 text-slate-600">
    The timeline and transfer are examples only. No payment, shipment, tracking update, or payout
    occurred.
  </p>
  <Button href="/produto/{demoProduct.slug}" variant="outline" class="mt-5"
    >Return to the piece</Button
  >
</div>
