<!-- src/routes/+layout.svelte -->
<script context="module" lang="ts">
  import { initAuthClient } from "$lib/icp";

  export async function load() {
    if (typeof window !== undefined) { 
      await initAuthClient();
    }
    return {};
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    if (typeof window !== undefined) { 
      
    }
  });
</script>

<slot />
