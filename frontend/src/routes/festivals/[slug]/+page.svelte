<script>
// Import data
const { data } = $props()
const item = data.item[0]

import { urlFor } from "$lib/utils/image.js";
import { PortableText } from '@portabletext/svelte'
import PortableTextStyle from '$lib/components/portableTextStyle.svelte'
import { formatDate } from "$lib/utils/date.js";
import { register } from 'swiper/element/bundle';
import { slide, fade } from "svelte/transition";
import { onMount } from "svelte";
register();

// Import stores
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
item.background ? colorer.changePrimaryColor(item.background.hex) : colorer.changePrimaryColor('#8A7369');
item.hover ? colorer.changeSecondaryColor(item.hover.hex) : colorer.changeSecondaryColor('#FF6B6B');

// Variables
let scrollY = $state()
let scrollImg = $derived(scrollY/10)
let pageHeight = $state()
let sectionHeight = $state()
let contentHeight = $derived(pageHeight + sectionHeight)
let openDay = $state(undefined)
let stickerNumber = $state(1);
let string = $derived("../stickers/cbp-adamello-stickers-" + stickerNumber + ".webp");
let stickers = $state();

$effect(() => {
  const timer = setInterval(() => {
    if (data.pathname === "/festivals/campo-base-festival-adamello") {
      const img = document.createElement("img");
      img.src = string;
      const left = Math.floor(Math.random() * innerWidth);
      const top = Math.floor(Math.random() * innerHeight);
      img.style.left = `${left/innerWidth*100}vw`;
      img.style.top = `${top/innerHeight*100}vh`;
      stickers.appendChild(img);
      stickerNumber++
      if (stickerNumber > 7) {
        stickerNumber = 1
      }
    }
  }, 1500);
  return () => clearInterval(timer);
});

// Functions
function toggleDay(dayIndex, event) {
  if (openDay === dayIndex) {
    openDay = undefined
  } else {
    openDay = dayIndex
  }
}
</script>

<svelte:window bind:scrollY></svelte:window>

{#if item.backgroundImage}
  <div id="bg-holder" transition:fade={{ duration: 500 }}>
    <div id="bg-image" style="height: calc({contentHeight}px + 10em); background-image: url({urlFor(item.backgroundImage).width(1920)}); margin-top: -{scrollImg}px"></div>
  </div>
{/if}

<h1 bind:clientHeight={pageHeight}>{item.title}{#if item.subtitle}
  <br>{item.subtitle}{/if}
  {#if item.days}<br>{formatDate(item.days[0].date, item.days[item.days.length - 1].date)}{/if}
</h1>
<!-- <section bind:clientHeight={sectionHeight} class={item._type} style={item.subtitle ? 'margin-top: 9.26em;' : 'margin-top: 7.06em;'}> -->
<section bind:clientHeight={sectionHeight} class={item._type}>
  {#if item.content}
    <div id="content" class="font-m">
      <PortableText
      value={item.content}
      components={{
        block: {
          normal: PortableTextStyle,
        },
        marks: {
          link: PortableTextStyle,
        },
      }}
      />
    </div>
  {/if}
  {#if item.slider}
    <swiper-container>
      {#each item.slider as slide}
        <swiper-slide>
          <img src={urlFor(slide)} alt="Image for {item.title}">
        </swiper-slide>
      {/each}
    </swiper-container>
  {:else}
    <img class="cover" src={urlFor(item.cover)} alt="Image for {item.title}">
  {/if}
  {#each item.days as day, i}
    <h3 class="day font-l" onkeyup={(e) => toggleDay(i)} onclick={(e) => toggleDay(i, e)}>{Intl.DateTimeFormat('it-IT', { weekday: 'long' }).format(new Date(day.date))}</h3>
    {#each day.activities as activity, j}
      {#if activity.url && activity.label && activity.start && activity.title}
        {#if openDay === i}
          <a class="activity font-m" href={activity.url} target="_blank"
          transition:slide={{ duration: 500 }}>
            <p class="time font-xs">{activity.start}{#if activity.end}-{activity.end}{/if}</p>
            <p class="title font-s">{activity.title}</p>
            <p class="label font-xs">{activity.label}</p>
          </a>
        {/if}
      {:else if activity.start && activity.title}
        {#if openDay === i}
          <div class="activity"
          transition:slide={{ duration: 500 }}>
            <p class="time font-xs">{activity.start}{#if activity.end}-{activity.end}{/if}</p>
            <p class="title font-s">{activity.title}</p>
          </div>
        {/if}
      {:else}
        {#if openDay === i}
          <div class="activity"
          transition:slide={{ duration: 500 }}>
            <p class="time font-xs" style="white-space: pre;">Some content is missing</p>
          </div>
        {/if}
      {/if}
    {/each}
  {/each}
  {#if item.sponsors}
      <div id="sponsors">
        <h4 class="font-s">Sponsored by</h4>
        {#if item.sponsors.length > 3}
        <div class="marquee">
          <div class="marquee-content">
            {#each item.sponsors as sponsor, i}
              <img class="logo" src={sponsor.url} alt="Sponsor of {item.title}">
            {/each}
          </div>
        </div>
        {:else}
        <div class="marquee">
          <div class="marquee-content">
            {#each item.sponsors as sponsor, i}
              <img class="logo" src={sponsor.url} alt="Sponsor of {item.title}">
            {/each}
          </div>
        </div>
        {/if}
      </div>
    {/if}
</section>

{#if data.pathname === "/festivals/campo-base-festival-adamello"}
  <div id="stickers" bind:this={stickers}></div>
{/if}

<style>
/* Common */
#bg-holder {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}
#bg-image {
  width: 100vw;
  min-height: 100vh;
  background-repeat: repeat-y;
  background-size: 100%;
}
h1  {
  padding: 3em 0 1.66em;
  pointer-events: none;
  z-index: 2;
}
section {
  border-top: solid 1px #000;
  /* margin-top: 5.86em; */
  width: 100%;
}

/* Festival */
.cover {
  aspect-ratio: 1;
  object-fit: contain;
}
.cover,
swiper-container {
  width: calc(100vw - 16.146vw*2);
  width: -webkit-fill-available;
  height: auto;
  padding: .5em 0;
  border-bottom: solid 1px #000;
  display: block;
}
swiper-slide {
  width: 100%;
}
swiper-slide img {
  width: 100%;
  display: block;
}
#content {
  padding: .3em 0;
}
.day {
  padding: .3em 0;
  border-bottom: solid 1px #000;
  width: 100%;
  text-transform: capitalize;
  cursor: pointer;
}
.day:hover {
  color: var(--secondaryColor);
}
.activity {
  display: grid;
  grid-template-columns: 20% 50% auto;
  text-align: left;
  gap: .5em;
  padding: .3em 0;
  border-bottom: solid 1px #000;
}
.label {
  text-align: right;
}
#sponsors {
  border-top: solid 1px #000;
  text-align: left;
}
#sponsors h4 {
  padding: .5em 0 2em;
}
#sponsors .marquee {
  overflow: hidden;
  display: flex;
  padding: 0 0 .5em;
}
#sponsors .marquee-content {
  display: flex;
}
#sponsors .logo {
  height: .7em;
  margin-right: 1em;
}
#stickers {
  display: contents;
}
:global(#stickers>img) {
  position: fixed;
  transform: translate(-50%, -50%);
  width: 4vw;
  height: auto;
  z-index: 4;
}
@media screen and (max-width: 1080px) {
  :global(#stickers>img) {
    width: 6vw;
  }
}
@media screen and (max-width: 800px) {
  .activity {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: .6em 0;
  }
  .label {
    text-align: left;
  }
}
</style>