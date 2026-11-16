<script lang="ts">
  import Button from './components/ui/button/button.svelte';

  let count: number = $state(0);
  const increment = () => {
    count += 1;
  };
</script>

<Button onclick={increment} class="counter">Count is {count}</Button>
