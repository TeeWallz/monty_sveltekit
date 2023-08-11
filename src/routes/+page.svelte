<script>
	import Counter from './Counter.svelte';
	import Headliner from '$lib/components/Headliner.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
  	import { setChumpContext } from '$lib/store/chumps/chumpsStore.client';
  	import { getContext } from 'svelte';
  import { writable } from 'svelte/store';
	
	// setChumpContext();

	// /** @type {import('./$types').LayoutData} */
	export let data;

	// Create a store and update it when necessary...
	setChumpContext(data)
	


</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-center items-center">
	<Headliner />
</section>
