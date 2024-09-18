<script>
// Import data
const { data } = $props()
const item = data.item[0]

import { urlFor } from "$lib/utils/image";
import { PortableText } from '@portabletext/svelte'
import PortableTextStyle from '$lib/components/portableTextStyle.svelte'
import { formatDate, formatTimeStrings } from "$lib/utils/date";
import { register } from 'swiper/element/bundle';
import { slide, fade } from "svelte/transition";
register();

// Import stores
import { getLang } from '$lib/stores/lang.svelte';
const langer = getLang();
import { getColor } from '$lib/stores/color.svelte';
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
  if (item.partners && item.partners.length > 3) {
    Marquee('.marquee', 0.4) 
  }
  const timer = setInterval(() => {
    if (data.pathname === "/festivals/campo-base-festival-adamello-2024") {
      // Create img
      const img = document.createElement("img");
      img.src = string;
      img.classList.add("draggable"); 
      img.draggable = false; // Disable native drag-and-drop
      img.ondragstart = () => false; // Prevent the native dragstart event
      const left = Math.floor(Math.random() * innerWidth);
      const top = Math.floor(Math.random() * innerHeight);
      img.style.left = `${left/innerWidth*100}vw`;
      img.style.top = `${top/innerHeight*100}vh`;
      
      // Add event listeners for dragging
      img.addEventListener('pointerdown', onPointerDown);
      img.addEventListener('pointermove', onPointerMove);
      img.addEventListener('pointerup', onPointerUp);
      img.addEventListener('pointercancel', onPointerUp);

      // Add img to page
      stickers.appendChild(img);
      stickerNumber++
      if (stickerNumber > 7) {
        stickerNumber = 1
      }
    }
  }, 6000);
  return () => clearInterval(timer);
});

// Functions
let activeSticker = null;
let offsetX = 0;
let offsetY = 0;

function onPointerDown(event) {
  activeSticker = event.target;
  const rect = activeSticker.getBoundingClientRect();
  // Calculate the offset relative to the center of the image
  offsetX = event.clientX - (rect.left + rect.width / 2);
  offsetY = event.clientY - (rect.top + rect.height / 2);
  activeSticker.setPointerCapture(event.pointerId);
}


function onPointerMove(event) {
  if (!activeSticker) return;
  // Adjust the position considering the offset and image size
  const left = event.clientX - offsetX;
  const top = event.clientY - offsetY;
  activeSticker.style.left = `${left}px`;
  activeSticker.style.top = `${top}px`;
}

function onPointerUp(event) {
  if (!activeSticker) return;
  activeSticker.releasePointerCapture(event.pointerId);
  activeSticker = null;
}

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
  {#if item.exhibitionTitle && item.exhibitionContent}
    <h3 id="exhibitionTitle" class="day font-l" onkeyup={(e) => toggleDay('exhibition')} onclick={(e) => toggleDay('exhibition', e)}>{item.exhibitionTitle[langer.lang]}</h3>
    {#if openDay === 'exhibition'}
      <div id="exhibitionContent" class="font-s"
      transition:slide={{ duration: 500 }}>
      {#if item.exhibitionStart}
        <p>{formatDate(item.exhibitionStart, item.exhibitionEnd)}</p>
      {/if}
        <PortableText
        value={item.exhibitionContent[langer.lang]}
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
  {#each item.days as day, i}
  {#if day.activities}
    <h3 class="day font-l" onkeyup={(e) => toggleDay(i)} onclick={(e) => toggleDay(i, e)}>{Intl.DateTimeFormat(langer.lang, { weekday: 'long' }).format(new Date(day.date))}</h3>
    {#each day.activities as activity, j}
      {#if activity && activity.title}
        {#if openDay === i}
          <div class="activity font-m" 
          transition:slide={{ duration: 500 }}>
            <p class="time font-xs">{formatTimeStrings(activity.start, activity.end)}</p>
            <div class="content font-s">
              <p class="title">{activity.title}</p>
              {#if activity.description}
                <PortableText
                value={activity.description}
                components={{
                  block: {
                    normal: PortableTextStyle,
                  },
                  marks: {
                    link: PortableTextStyle,
                  },
                }}
                />
              {/if}
            </div>
            {#if activity.price}
              <div class="price font-xs">
                <p class="price-value">{#if langer.lang === 'it'}{@html 'Prezzo '}{:else}{@html 'Price '}{/if}{activity.price.toLocaleString(langer.lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} euro</p>
                {#if activity.buyUrl}
                  <a class="price-url" href={activity.buyUrl} target="_blank">{#if langer.lang === 'it'}Acquista qui{:else}Buy here{/if}</a>
                {:else if activity.reservationUrl}
                  <a class="price-url" href={activity.reservationUrl} target="_blank">{#if langer.lang === 'it'}Iscriviti qui{:else}Subscribe here{/if}</a>
                {/if}
              </div>
            {:else}
              <div class="price font-xs">
                {#if activity.freeOffer}
                  <p class="price-value">Offerta libera{#if activity.reservationUrl}{@html ' previa iscrizione'}{/if}</p>
                {:else}
                  <p class="price-value">Evento gratuito{#if activity.reservationUrl}{@html ' previa iscrizione'}{/if}</p>
                {/if}
                {#if activity.reservationUrl}<a class="price-url font-xs" href={activity.reservationUrl}>Iscriviti qui</a>{/if}
              </div>
            {/if}
            <div class="info font-xs">
              {#if activity.infoUrl}
                <a class="info-url" href={activity.infoUrl}>{activity.infoUrl.replace('mailto:', 'Mail: ').replace('tel:', 'Per prenotazioni: ').replace('https://', 'Info: ').replace('http://', 'Info: ')}</a>
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
      <div id="infoContent" class="font-s"
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
  {#if item.partners}
      <div id="partners">
        <h4 class="font-s">Partners</h4>
        {#if item.partners.length > 3}
        <div class="marquee">
          <div class="marquee-content">
            {#each item.partners as partner, i}
              <img class="logo" src={partner.url} alt="partner of {item.title}">
            {/each}
          </div>
        </div>
        {:else}
        <div class="marquee">
          <div class="marquee-content grid">
            {#each item.partners as partner, i}
              <img class="logo" src={partner.url} alt="partner of {item.title}">
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

{#if item.report}
  <a class="report font-xs" href={item.report.url} target="_blank">Report ↓</a>
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
  width: 100%;
}

/* Festival */
.cover {
  aspect-ratio: 1;
  -o-object-fit: contain;
     object-fit: contain;
}
.cover,
swiper-container {
  width: calc(100vw - 16.146vw*2);
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  text-align: left;
  row-gap: .5em;
  padding: .3em 0;
  border-bottom: solid 1px #000;
  -webkit-box-align: baseline;
      -ms-flex-align: baseline;
          align-items: baseline;
  overflow: hidden;
}
.time {
  -ms-flex-preferred-size: 20%;
      flex-basis: 20%;
}
.content {
  -ms-flex-preferred-size: 80%;
      flex-basis: 80%;
}
.title {
  font-weight: 700;
}
.price,
.info {
  -ms-flex-preferred-size: 50%;
      flex-basis: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: baseline;
      -ms-flex-align: baseline;
          align-items: baseline;
  gap: 1em;
}
.price {
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: start;
}
.info {
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: end;
}
.price-value {
  text-align: left;
}
#exhibitionContent,
#infoContent {
  text-align: left;
  padding: .5em 0 .7em;
  border-bottom: solid 1px #000;
  overflow: hidden;
  display: block;
}

/* partners */
#partners {
  text-align: left;
}
#partners h4 {
  padding: .5em 0 2em;
}
#partners .marquee {
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 0 .5em;
}
#partners .marquee-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
:global(#partners .grid) {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  row-gap: .5em;
}
#partners .logo {
  height: 1em;
  max-width: 2em;
  margin-right: 1em;
}

/* Stickers */
#stickers {
  display: contents;
}
:global(#stickers>img) {
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  width: 4vw;
  height: auto;
  z-index: 4;
  cursor: move;
}
:global(#stickers>img:active) {
  cursor: grabbing;
}

/* Report */
.report {
  position: fixed;
  z-index: 11;
  right:  calc(var(--gutter)/2);
  bottom: calc(var(--gutter)/2);
  padding: .3em 1em .5em;
  border-radius: 1em;
  background-color: var(--secondaryColor);
}
.report:hover {
  background-color: #000;
  color: #FFF;
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
    -ms-flex-preferred-size: 100%;
        flex-basis: 100%;
  }
  .info {
    -webkit-box-pack: start;
        -ms-flex-pack: start;
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