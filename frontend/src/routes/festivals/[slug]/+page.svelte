<script>
// Import data
const { data } = $props()
const item = data.item[0]

import { urlFor } from "$lib/utils/image.js";
import { PortableText } from '@portabletext/svelte'
import PortableTextStyle from '$lib/components/portableTextStyle.svelte'
import { formatDate, formatTimeStrings } from "$lib/utils/date.js";
import { register } from 'swiper/element/bundle';
import { slide, fade } from "svelte/transition";
register();

// Import stores
import { getLang } from '$lib/stores/lang.svelte.js';
const langer = getLang();
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
let innerWidth = $state();

$effect(() => {
  if (item.sponsors && item.sponsors.length > 3) {
    Marquee('.marquee', 0.4) 
  }
  const timer = setInterval(() => {
    if (data.pathname === "/festivals/campo-base-festival-adamello-2024") {
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
  }, 2000);
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

function Marquee(selector, speed) {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;
  parentSelector.insertAdjacentHTML('beforeend', clone);
  parentSelector.insertAdjacentHTML('beforeend', clone);

  setInterval(function () {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > firstElement.clientWidth) {
      i = 0;
    }
    i = i + speed;
  }, 0);
}
</script>

<svelte:window bind:innerWidth bind:scrollY></svelte:window>

{#if item.backgroundImage}
  <div id="bg-holder" transition:fade={{ duration: 500 }}>
    <div id="bg-image" style="height: calc({contentHeight}px + 10em); background-image: url({urlFor(item.backgroundImage).width(innerWidth > 1080 ? 1920 : 1080)}); margin-top: -{scrollImg}px"></div>
  </div>
{/if}

<h1 bind:clientHeight={pageHeight}>{item.title}{#if item.subtitle}
  <br>{item.subtitle}{/if}
  {#if item.days}<br>{formatDate(item.days[0].date, item.days[item.days.length - 1].date)}{/if}
</h1>
<section bind:clientHeight={sectionHeight} class={item._type}>
  {#if item.content}
    <div id="content" class="font-m">
      <PortableText
      value={item.content[langer.lang]}
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
          <img src={urlFor(slide).width(innerWidth > 1080 ? 1280 : 800)} alt="Image for {item.title}">
        </swiper-slide>
      {/each}
    </swiper-container>
  {:else}
    <img class="cover" src={urlFor(item.cover).width(innerWidth > 1080 ? 1280 : 800)} alt="Image for {item.title}">
  {/if}
  {#each item.days as day, i}
  {#if day.activities}
    <h3 class="day font-l" onkeyup={(e) => toggleDay(i)} onclick={(e) => toggleDay(i, e)}>{Intl.DateTimeFormat(langer.lang, { weekday: 'long' }).format(new Date(day.date))}</h3>
    {#each day.activities as activity, j}
      {#if activity && activity.description}
        {#if openDay === i}
          <div class="activity font-m" 
          transition:slide={{ duration: 500 }}>
            <p class="time font-xs">{formatTimeStrings(activity.start, activity.end)}</p>
            <p class="title font-s">{activity.description}</p>
            {#if activity.price}
              <div class="price font-xs">
                <p class="price-value">Ticket {activity.price.toLocaleString(langer.lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} euro</p>
                {#if activity.buyUrl}
                  <a class="price-url" href={activity.buyUrl} target="_blank">Acquista qui</a>
                {:else if activity.reservationUrl}
                  <a class="price-url" href={activity.reservationUrl} target="_blank">Iscriviti qui</a>
                {/if}
              </div>
            {:else}
              <div class="price font-xs">
                <p class="price-value">Evento gratuito{#if activity.reservationUrl}{@html ' previa iscrizione'}{/if}</p>
                {#if activity.reservationUrl}<a class="price-url font-xs" href={activity.reservationUrl}>Iscriviti qui</a>{/if}
              </div>
            {/if}
            <div class="info font-xs">
              {#if activity.infoUrl}
                <a class="info-url" href={activity.infoUrl}>{activity.infoUrl.replace('mailto:', 'Mail: ').replace('tel:', 'Num tel: ').replace('https://', 'Info: ').replace('http://', 'Info: ')}</a>
              {/if}
              {#if activity.location}
                {#if activity.googleMaps}
                  <a class="info-location" href={activity.googleMaps}>{activity.location}</a>
                {:else}
                  <p class="info-location">{activity.location}</p>
                {/if}
              {/if}
            </div>
          </div>
        {/if}
      {/if}
    {/each}
  {/if}
  {/each}
  {#if item.infoTitle && item.infoContent}
    <h3 id="infoTitle" class="day font-l" onkeyup={(e) => toggleDay('info')} onclick={(e) => toggleDay('info', e)}>{item.infoTitle[langer.lang]}</h3>
    {#if openDay === 'info'}
      <div id="infoContent" class="font-m"
      transition:slide={{ duration: 500 }}>
        <PortableText
        value={item.infoContent[langer.lang]}
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
  {/if}
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
          <div class="marquee-content grid">
            {#each item.sponsors as sponsor, i}
              <img class="logo" src={sponsor.url} alt="Sponsor of {item.title}">
            {/each}
          </div>
        </div>
        {/if}
      </div>
    {/if}
</section>

{#if data.pathname === "/festivals/campo-base-festival-adamello-2024"}
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
  border-bottom: solid 1px #000;
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
  padding: .5em 0 1em;
}

/* Days */
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
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: left;
  row-gap: .5em;
  padding: .3em 0;
  border-bottom: solid 1px #000;
  align-items: baseline;
  overflow: hidden;
}
.time {
  flex-basis: 20%;
}
.title {
  flex-basis: 80%;
}
.price,
.info {
  flex-basis: 50%;
  display: flex;
  align-items: baseline;
  gap: 1em;
}
.price {
  justify-content: start;
}
.info {
  justify-content: end;
}
.price-value {
  text-align: left;
}
.price-url {
  /* text-align: right; */
}

#infoContent {
  text-align: left;
  padding: .5em 0 .7em;
  border-bottom: solid 1px #000;
  overflow: hidden;
}

/* Sponsors */
#sponsors {
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
:global(#sponsors .grid) {
  display: flex;
  flex-wrap: wrap;
  row-gap: .5em;
}
#sponsors .logo {
  height: 1em;
  max-width: 2em;
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
    row-gap: .2em;
    padding: .6em 0;
  }
  .price,
  .info {
    flex-basis: 100%;
  }
  .info {
    justify-content: start;
  }
  .price {
    margin-top: .7em;
  }
}
@media screen and (max-width: 360px) {
  .activity {
    display: block;
  }
  .time {
    margin-bottom: .5em;
  }
  .info {
    margin-top: .5em;
  }
}
</style>