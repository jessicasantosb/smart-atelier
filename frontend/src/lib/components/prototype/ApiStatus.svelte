<script lang="ts">
  import { onMount } from 'svelte';
  import { getBackendHealth, type HealthStatus } from '../../api/health';

  let status = $state<HealthStatus | 'checking'>('checking');

  onMount(() => {
    void getBackendHealth().then((health) => (status = health));
  });
</script>

<p aria-live="polite" class="flex items-center gap-2 text-xs text-slate-500">
  <span
    aria-hidden="true"
    class={`size-2 rounded-full ${status === 'available' ? 'bg-emerald-600' : status === 'unavailable' ? 'bg-rose-600' : 'bg-slate-300'}`}
  ></span>
  {status === 'checking'
    ? 'Checking backend'
    : status === 'available'
      ? 'Backend connected'
      : 'Backend is unavailable'}
</p>
