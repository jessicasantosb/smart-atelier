<script lang="ts">
  import type { LayoutProps } from './$types';
  import PrototypeShell from '#lib/components/prototype/PrototypeShell.svelte';
  import '../app.css';

  let { children }: LayoutProps = $props();
</script>

<PrototypeShell {children} />
