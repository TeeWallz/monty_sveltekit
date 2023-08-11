<script lang="ts">
  import CalendarRuler from "./CalendarRuler.svelte";

  import type { Chump } from '$lib/store/chumps/types';
  import { onDestroy, onMount } from "svelte";
  import _ from "lodash";
  import { getContext } from 'svelte';

  const chumps:Chump[] = getContext("chumps");
  const oldestChump:Chump = getContext("oldestChump");
  
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  // Store the current chump in view
  let currentChumpInView: Chump | undefined;

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const chumpId = entry.target.dataset.chumpId;
        if (chumpId) {
          currentChumpInView = chumps.find((chump) => chump.id === chumpId);
        }
        break;
      }
    }
  };

  const handleScroll = () => {
    const toTopButton = document.getElementById("to-top-button");

    if (!toTopButton) {
      return;
    }
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      toTopButton.classList.remove("hidden");
    } else {
      toTopButton.classList.add("hidden");
    }
  };

  const getChumpInView = () => {
    for (const chump of chumps) {
      const chumpElement = document.getElementById(`chump-${chump.id}`);
      if (chumpElement && chumpElement.dataset.chumpId === currentChumpInView?.id) {
        return currentChumpInView;
      }
    }
    return undefined;
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let scrollToChump: (//<reference types="svelte" />
    chump: Chump) => void ;


  onMount(() => {

    scrollToChump = (chump: Chump) => {
    const chumpElement = document.getElementById(`chump-${chump.id}`);
    if (chumpElement) {
      chumpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this threshold as needed based on your requirements
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each chump card element
    const chumpElements = document.querySelectorAll("[data-chump-id]");
    chumpElements.forEach((element) => observer.observe(element));

    // // Cleanup the observer when the component is destroyed
    // onDestroy(() => {
    //   observer.disconnect();
    //   // unsubscribe();
    // });

    // // Set the initial chump in view
    currentChumpInView = getChumpInView();
  });

</script>

<CalendarRuler
  startYear={oldestChump.date_year}
  startMonth={oldestChump.date_month}
  endYear={currentYear}
  endMonth={currentMonth}
  currentChumpInView={currentChumpInView}
  scrollToChump={scrollToChump}
/>

<ol class="border- border-l border-neutral-300 dark:border-neutral-500 w-72 mx-auto" id="chump-list-container">
  {#each chumps as chump, i}
  
    <li id={`chump-${chump.id}`} data-chump-id={chump.id} class="flex flex-wrap">


      <div class="flex items-center pt-3 w-full">
        <div class="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500" />
        <p class="text text-neutral-500 dark:text-neutral-300">{chump.date_aus_string}</p>
        <p class="text-sm text-blue-600 dark:text-neutral-300 ml-auto">Rain Logo</p>
        <p class="text-sm text-red-600 dark:text-neutral-300 ml-auto">Chump</p>
      </div>


      <div class="mb-2 ml-4 mt-2 w-10/12">
        <h4 class="mb-1.5 text-l font-semibold">{chump.name}</h4>
        <div class="flex-start flex items-center">
        <!-- show streak number-->
          <div class="flex-start flex items-center">
            <p class="text-sm text-neutral-500 dark:text-neutral-300 mr-1">Days as CHUMPION:</p>
            <p class="text-sm text-neutral-500 dark:text-neutral-300 mr-1">{chump.streak}</p>
          </div>
        </div>
        <div class="mb-8 ml-4 w-11/12 h-32 overflow-hidden bg-neutral-600 flex items-center">
          <img src={`chumps/${chump.image}`} alt="chump" class="mx-auto" />
        </div>
      </div>


      <div class="mb-8 h-24 overflow-hidden w-1/12 bg-neutral-200 flex items-center mt-auto mb-auto">
        <!-- vertically and hortizontally centered arrow -->
        <div class="flex items-center justify-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-neutral-500 dark:text-neutral-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        
      </div>
    </li>
  {/each}
</ol>

<!-- Back to top button -->

<button id="to-top-button" title="Go To Top" on:click={goToTop}
    class="hidden fixed z-90 bottom-8 right-8 border-0 w-16 h-16 rounded-full drop-shadow-md bg-indigo-500 text-white text-3xl font-bold">&uarr;</button>