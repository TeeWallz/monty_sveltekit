<script lang="ts">
  import { browser } from '$app/environment';
  import { getContext } from 'svelte';

  export let startYear = 2016;
  export let startMonth = 12;
  export let endYear = 2022;
  export let endMonth = 8;
  // scrollToChump as svelte prop
  export let scrollToChump: (chump: Chump) => void;
  export let currentChumpInView: Chump | undefined;
  const chumps = getContext("chumps");
  
  const colorCurrentMonth = (month: number, year: number) => {
    if (browser) {
      const currentMonths = document.querySelectorAll(".current-month");
      currentMonths.forEach((el) => el.classList.remove("current-month"));

      const monthElement = document.querySelector(
        `.timeline-month[data-month="${month}"][data-year="${year}"]`
      );
      if (monthElement) {
        monthElement.classList.add("current-month");

        // Remove any existing arrows
        const existingArrow = monthElement.querySelector(".arrow");
        if (existingArrow) {
          existingArrow.remove();
        }

        // Create the arrow element and append it to the selected month
        const arrow = document.createElement("div");
        arrow.classList.add("arrow");
        monthElement.appendChild(arrow);
      }
    }
  };

  const isDateMatchingChump = (month: number, year: number) => {
    for (const chump of chumps) {
      if (chump.date_month === month && chump.date_year === year) {
        return true;
      }
    }
  };

  const handleMonthClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const month = target.dataset.month;
    const year = target.dataset.year;
    if (month && year) {
      const chump = chumps.find((chump) => chump.date_month === Number(month) && chump.date_year === Number(year));
      if (chump) {
        currentChumpInView = chump;
        scrollToChump(chump);
        console.log(chump)
      }
    }
  };


  $: currentChumpInView && colorCurrentMonth(currentChumpInView?.date_month, currentChumpInView?.date_year);
</script>

<div class="container">
  {#each Array.from({ length: endYear - startYear + 1 }) as _, i}
    <div class="timeline-year" data-year={endYear - i}>
      {endYear - i}
    </div>
    {#each Array.from({ length: i === 0 ? endMonth : (i === endYear - startYear ? 12 - startMonth + 1 : 12) }) as _, m}
      <div
        class="timeline-month {isDateMatchingChump(m, endYear - i) ? 'timeline_chump_month' : 'timeline_non_chump_month'}"
        data-month={i === 0 ? endMonth - m : (i === endYear - startYear ? 12 - m : 12 - m)}
        data-year={endYear - i}
        on:click={handleMonthClick}
      />
    {/each}
  {/each}
  <div class="current-month invisible bg-red-500 arrow" />
</div>


<style>
  .container {
    position: fixed;
    z-index: 2;
    left: 0;
    top: 50%;
    height: 60vh; /* 70% of the viewport height */
    width: 30px;
    transform: translateY(-50%);
    background-color: #f5f5f5;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .timeline-year {
    font-size: 12px;
    text-align: center;
  }

  .timeline-month {
    height: 1px;
    width: 50%;
    /* margin-top: 1px; */
    float: left;
  }

  .timeline_chump_month {
    background-color: #f00;
  }

  .timeline_non_chump_month {
    background-color: #000;
  }

  .current-month {
    background-color: red;
    height: 3px;
    width: 100%;
  }

  .arrow {
    position: absolute;
    top: 50%;
    right: -6px; /* Adjust this value as needed to position the arrow correctly */
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000; /* Adjust the color as needed */
    transform: translateY(-50%);
  }

</style>
