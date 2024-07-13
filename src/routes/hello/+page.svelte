<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { agent } from "$lib/icp";
  import { Actor } from "@dfinity/agent";
  import { idlFactory } from "../../declarations/backend";

  let isAuthenticated = false;
  let response: string | undefined | unknown;

  onMount(() => {
    if (typeof window !== undefined) { 
      if (agent) {
        isAuthenticated = true;
      }
    }
  });

  async function callCanister() {
    if (!agent) {
      console.error("Agent is not initialized");
      return;
    }
    const actor = Actor.createActor(idlFactory, { agent, canisterId: process.env.CANISTER_ID_BACKEND ?? "" });
    response = await actor.yourCanisterMethod();
  }
</script>

{#if isAuthenticated}
  <h1>Welcome to your authenticated SvelteKit app!</h1>
  <button on:click={callCanister}>Call Canister</button>
  <p>{response}</p>
{:else}
  <h1>Please authenticate to continue.</h1>
{/if}
