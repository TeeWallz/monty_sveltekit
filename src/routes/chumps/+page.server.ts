import { loadChumps } from "$lib/store/chumps/chumpsStore.server";
import { Chump } from "$lib/models/chump.model";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
  console.log("yeet");
 const result = Chump.findAll = async (chump) => {
    console.log("findAll", chump);
  };


  return {
    props: {
      chumps: await loadChumps(),
      result: result
    },
  };
}
