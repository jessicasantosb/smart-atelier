<script lang="ts">
  import { onMount } from 'svelte';
  import { getBackendHealth, type HealthStatus } from './lib/api/health';

  let status = $state<HealthStatus | 'checking'>('checking');

  onMount(() => {
    let active = true;

    void getBackendHealth().then((health) => {
      if (active) status = health;
    });

    return () => {
      active = false;
    };
  });

  const statusText = $derived(
    status === 'checking'
      ? 'Checking backend connection…'
      : status === 'available'
        ? 'Backend is available'
        : 'Backend is unavailable',
  );

  const indicatorColor = $derived(
    status === 'available'
      ? 'bg-[#32805a]'
      : status === 'unavailable'
        ? 'bg-[#bd4c43]'
        : 'bg-[#b38b58]',
  );
</script>

<svelte:head>
  <title>Smart Atelier</title>
  <meta name="description" content="Smart Atelier application foundation." />
</svelte:head>

<main class="grid min-h-screen place-items-center bg-[#f7f4ef] px-6 py-8 font-sans text-[#28231f]">
  <section
    class="w-full max-w-xl rounded-2xl border border-[#e7dfd4] bg-[#fffdfa] p-8 shadow-[0_1.5rem_4rem_rgb(54_42_27_/_8%)] sm:p-16"
    aria-labelledby="page-title"
  >
    <p class="mb-3 text-xs font-bold tracking-[0.12em] text-[#8a5a36] uppercase">
      Application foundation
    </p>
    <h1
      id="page-title"
      class="m-0 font-serif text-5xl leading-none tracking-[-0.05em] text-[#28231f] sm:text-6xl"
    >
      Smart Atelier
    </h1>
    <p class="mt-5 mb-8 max-w-md leading-relaxed text-[#655e55]">
      The frontend and backend are ready for the next development phase.
    </p>

    <div class="flex items-center gap-2.5 text-sm text-[#4d473f]" aria-live="polite">
      <span class={`size-2.5 rounded-full ${indicatorColor}`} aria-hidden="true"></span>
      <span>{statusText}</span>
    </div>
  </section>
</main>
