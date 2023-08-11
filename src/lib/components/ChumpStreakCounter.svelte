<script lang="ts">
    import CuteBox from '$lib/components/CuteBox.svelte';
	import { newestChump } from '$lib/data/chumps';
</script>

<CuteBox>
    <div class="text-5xl font-bold">
        {newestChump.streak}
    </div>
    <div class="text-l">
        days
    </div>
</CuteBox>

<style>
    .container {
        display: flex;
        margin: 1rem 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

</style>