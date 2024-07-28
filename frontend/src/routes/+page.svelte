<script>
    import { onMount } from 'svelte';
    import { Section, News, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
    import { Button, Modal } from 'flowbite-svelte';
    import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
    import PlayerTable from './PlayerTable.svelte';
    import { getCurrUser } from "$lib/api"
    import { login } from '$lib/api';

    let user;
    let defaultModal = false;
    onMount(() => {
      user = getCurrUser();
      if (!user) {
        defaultModal = true;
      }
      console.log(user);
    })
</script>
  
{#if user}

<Section name="heroDefault">
  <HeroHeader>
    <svelte:fragment slot="h1">NFT Drift</svelte:fragment>
    <!-- <svelte:fragment slot="paragraph">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</svelte:fragment> -->
  </HeroHeader>

  <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
    <a href="/">
      <Button size="lg" color="red">
        Balance: <b>{user.balance}</b><ArrowRightOutline size="md" class="ml-2 -mr-1" />
      </Button>
    </a>
  </div>
</Section>

<PlayerTable></PlayerTable>

{:else}

<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">You are not signed in!</p>
  <svelte:fragment slot="footer">
    <Button color="purple"><a href="/login">Login Now</a></Button>
  </svelte:fragment>
</Modal>

{/if}