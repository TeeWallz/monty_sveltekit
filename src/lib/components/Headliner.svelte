<script lang="ts">
    import { page } from '$app/stores';
    import CuteBox from '$lib/components/CuteBox.svelte';
    import type { Chump } from '$lib/store/chumps/types';
    import { getContext } from 'svelte';

    const chumps:Chump[] = getContext('chumps');
    const newestChump:Chump = getContext('newestChump');
</script>

<CuteBox>
    <div class="text-xs">
        The Montague Street Bridge was last hit
    </div>
    <div class="text-5xl font-bold">
        {newestChump.streak}
    </div>
    <div class="text-l">
        days ago
    </div>
    <div class="text-l">
        On {newestChump.date}
    </div>
</CuteBox>
<CuteBox>
    <div class="text-2xl">
        Current CHUMPION
    </div>
    <!-- tailwind div with image-->
    <div class="flex flex-col justify-center items-center">
        <div class="w-32">
            <img src="chumps{newestChump.image}" alt="chump" />
        </div>
    <div class="text-l">
        {newestChump.name}
    </div>
</CuteBox>
<CuteBox>
    <div class="text-2xl">
        Comments
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