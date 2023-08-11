<script lang="ts">
    import type { PageData } from './$types';
	import ChumpCard from '$lib/components/ChumpCard.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	// import { setChumpContext } from '$lib/store/chumps/chumpsStore.client';
  	// import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
  import { setChumpContext } from '$lib/store/chumps/chumpsStore.client';

	// /** @type {import('./$types').LayoutData} */
	export let data;

	// Create a store and update it when necessary...
	setChumpContext(data)

</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<Timeline />