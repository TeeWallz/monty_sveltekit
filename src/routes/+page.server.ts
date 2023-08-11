import { loadChumps } from "$lib/store/chumps/chumpsStore.server";
import { Chump } from "$lib/models/chump.model";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  console.log("yeet");
 const result = await Chump.findAll();


  return {
    props: {
      chumps: await loadChumps(),
      result: result
    },
  };
}
