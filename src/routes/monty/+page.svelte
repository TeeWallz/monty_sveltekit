<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<svelte:head>
	<title>Monty</title>
	<meta name="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>

Monty!

<br/>
{#each data.chumps as chump}
    <div>
        {chump.name} - {chump.date_aus_string}
    </div>
{/each}
<ul>
    
    <li>

    </li>
</ul>