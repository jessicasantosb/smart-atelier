<script lang="ts">
  import type { ErrorProps } from './$types';
  import Button from '#lib/components/ui/button/button.svelte';

  let { error }: ErrorProps = $props();
</script>

<svelte:head><title>Page not found — Smart Atelier</title></svelte:head>
<section class="mx-auto max-w-2xl py-16">
  <p class="text-sm text-slate-600">Not found</p>
  <h1 class="mt-3 text-4xl font-medium tracking-tight">This page is not here.</h1>
  <p class="mt-4 leading-7 text-slate-600">
    {error.message || 'The shop, piece, or order may have moved.'}
  </p>
  <Button href="/" class="mt-7">Return to the marketplace</Button>
</section>
