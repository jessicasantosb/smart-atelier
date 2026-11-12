<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from '#lib/components/ui/button/button.svelte';
  import ApiStatus from './ApiStatus.svelte';
  import DemoNotice from './DemoNotice.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="min-h-screen bg-[#F4F6F5] text-[#17242C]">
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
      <a href="/" class="text-lg font-semibold tracking-tight" aria-label="Smart Atelier home">
        Smart Atelier<span class="text-[#2856D8]">.</span>
      </a>
      <nav aria-label="Main navigation" class="flex items-center gap-2 sm:gap-5">
        <a
          class="hidden text-sm text-slate-600 hover:text-[#17242C] md:inline"
          href="/produto/blue-ceramic-vase">The piece</a
        >
        <a class="hidden text-sm text-slate-600 hover:text-[#17242C] sm:inline" href="/atelier"
          >For makers</a
        >
        <Button href="/loja/cera-atelier" variant="outline" size="sm">Visit the shop</Button>
      </nav>
    </div>
  </header>
  <main class="mx-auto max-w-7xl px-5 py-6 lg:px-10 lg:py-8">
    <div class="mb-8"><DemoNotice /></div>
    {@render children()}
  </main>
  <footer
    class="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-8 lg:flex-row lg:items-center lg:justify-between lg:px-10"
  >
    <p class="text-xs text-slate-500">A thoughtful home for handmade work.</p>
    <ApiStatus />
  </footer>
</div>
