import { writable, type Writable } from 'svelte/store';
import type { Chump } from '$lib/store/chumps/types';
import { page } from '$app/stores';
import { getContext, setContext } from 'svelte';

// export const chumps = writable();
// export const newestChump = writable();

export function setChumpContext(data: { props: { chumps: unknown; }; }){
  $: setContext('chumps', data.props.chumps);
  $: setNewestChump();
  $: setOldestChump();
}

export function setNewestChump() {
  const chumps: Chump[] = getContext('chumps');

  if (chumps.length === 0) {
    return null;
  }

  const sortedChumps = chumps.slice().sort((a, b) => b.id.localeCompare(a.id));

  setContext('newestChump', sortedChumps[0]);
}

export function setOldestChump() {
  const chumps: Chump[] = getContext('chumps');

  if (chumps.length === 0) {
    return null;
  }

  const sortedChumps = chumps.slice().sort((a, b) => a.id.localeCompare(b.id));

  setContext('oldestChump', sortedChumps[0]);
}
