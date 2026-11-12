<script lang="ts">
  import Button from '#lib/components/ui/button/button.svelte';
  import { demoProduct, demoShop } from '../lib/prototype/mock-data';
</script>

<svelte:head>
  <title>Smart Atelier — Objects with a story</title>
  <meta name="description" content="Meet independent makers and the pieces they make by hand." />
</svelte:head>

<section class="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
  <div class="order-2 py-5 lg:order-1 lg:py-16">
    <p class="mb-5 text-sm text-slate-600">A marketplace for work made by hand</p>
    <h1
      class="max-w-xl text-5xl leading-[1.02] font-medium tracking-[-0.055em] sm:text-6xl lg:text-7xl"
    >
      Made slowly.<br />Kept for a long time.
    </h1>
    <p class="mt-6 max-w-md text-lg leading-8 text-slate-600">
      Meet the makers behind useful, beautiful objects — and bring one home.
    </p>
    <div class="mt-8 flex flex-wrap gap-3">
      <Button href="/produto/blue-ceramic-vase" size="lg">Meet the blue vase</Button>
      <Button href="/atelier" variant="outline" size="lg">Open a maker's studio</Button>
    </div>
    <div class="mt-16 border-t border-slate-300 pt-5 text-sm text-slate-600">
      <a
        href="/loja/{demoShop.slug}"
        class="underline decoration-slate-400 underline-offset-4 hover:text-[#2856D8]"
        >A closer look at {demoShop.name}</a
      >
      <span class="mx-2 text-slate-400">/</span>{demoProduct.title}
    </div>
  </div>
  <a
    href="/produto/blue-ceramic-vase"
    class="group order-1 relative block overflow-hidden bg-[#dbe2de] lg:order-2"
    aria-label="View Tidal blue vase"
  >
    <img
      src={demoProduct.image}
      alt="Sculptural blue stoneware vase made by hand"
      class="aspect-[4/4.5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
    />
    <span class="absolute bottom-4 left-4 bg-white/90 px-3 py-2 text-sm"
      >One piece, made by hand</span
    >
  </a>
</section>
