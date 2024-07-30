<script>
// Import data
const { data } = $props()
const item = data.item[0]

import { urlFor } from "$lib/utils/image.js";
import { PortableText } from '@portabletext/svelte'
import PortableTextStyle from '$lib/components/portableTextStyle.svelte'
import { formatDate, formatTime } from "$lib/utils/date.js";
import { register } from 'swiper/element/bundle';
import { onMount } from 'svelte';
register();

// Import stores
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#8A7369');
colorer.changeSecondaryColor('#FF6B6B');

$effect(() => {
  if (item.sponsors && item.sponsors.length > 3) {
    Marquee('.marquee', 0.4) 
  }
});

// Functions
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

<h1>{item.title}
  {#if item.subtitle}<br>{item.subtitle}{/if}
</h1>
<!-- <section class={item._type} style="{item.subtitle ? 'margin-top: 7.06em;' : ''}"> -->
<section class={item._type}>
  {#if item.slider}
    <swiper-container loop=true space-between=16 autoplay={{delay: 2500,disableOnInteraction: true,waitForTransition: true}}>
      {#each item.slider as slide}
        <swiper-slide>
          <img src={urlFor(slide)} alt="Image for {item.title}">
        </swiper-slide>
      {/each}
    </swiper-container>
    {:else}
      <img class="cover" src={urlFor(item.cover)} alt="Image for {item.title}">
    {/if}
  <div>
    <div id="info">
      <p class="datetime font-s">{formatDate(item.start, item.end)}{#if !item.time}<br>{formatTime(item.start, item.end)}{/if}</p>
      {#if item.location}<a class="place font-s" href={item.googleMaps} target="_blank">@{item.location}</a>{/if}
      {#if item.price}
        <div class="price">
          <p class="price-value font-s">Evento a pagamento {item.price.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} euro</p>
          {#if item.buyUrl}
            <a class="price-url font-xs" href={item.buyUrl} target="_blank">Acquista qui</a>
          {:else if item.reservationUrl}
            <a class="price-url font-xs" href={item.reservationUrl} target="_blank">Iscriviti qui</a>
          {/if}
        </div>
      {:else}
        <div class="price">
          <p class="price-value font-s">Evento gratuito{#if item.reservationUrl}{@html ' previa iscrizione'}{/if}</p>
          {#if item.reservationUrl}<a class="price-url font-xs" href={item.reservationUrl}>Iscriviti qui</a>{/if}
        </div>
      {/if}
    </div>
    {#if item.content}
      <div id="content">
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
  </div>
</section>

<style>
/* Common */
h1  {
  padding: 3em 0 1.66em;
  pointer-events: none;
  z-index: 2;
}
section {
  border-bottom: solid 1px #000;
  width: 100%;
}

/* Event */
.cover {
  aspect-ratio: 1;
  object-fit: contain;
}
.cover,
swiper-container {
  width: calc(100vw - 16.146vw*2);
  width: -webkit-fill-available;
  height: auto;
  padding: 0 0 .5em;
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
#info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: .5em 0;
}
.datetime {
  text-align: left;
}
.place {
  text-align: right;
}
.price {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.price-value {
  text-align: left;
}
.price-url {
  text-align: right;
}
#content {
  flex-basis: 100%;
  padding: .3em 0;
}
#info + #content {
  padding: .8em 0 .3em;
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
@media screen and (max-width: 1080px) {
  #info {
    flex-wrap: wrap;
    gap: .2em;
  }
}
@media screen and (max-width: 600px) {
  #info {
    flex-direction: column;
  }
  .datetime,
  .place,
  .price-value,
  .price-url {
    text-align: center;
  }
}
</style>