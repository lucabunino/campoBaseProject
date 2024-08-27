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
import { getLang } from '$lib/stores/lang.svelte.js';
const langer = getLang();
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#8A7369');
colorer.changeSecondaryColor('#FF6B6B');

// Variables
let innerWidth = $state()

$effect(() => {
  if (item.partners && item.partners.length > 3) {
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

<svelte:window bind:innerWidth></svelte:window>

<h1>{item.title}
  {#if item.subtitle}<br>{item.subtitle}{/if}
</h1>
<section class={item._type}>
  {#if item.slider}
    <swiper-container loop=true space-between=16 autoplay={{delay: 2500,disableOnInteraction: true,waitForTransition: true}}>
      {#each item.slider as slide}
        <swiper-slide>
          <img src={urlFor(slide).width(innerWidth > 1080 ? 1280 : 800)} alt="Image for {item.title}">
        </swiper-slide>
      {/each}
    </swiper-container>
    {:else}
      <img class="cover" src={urlFor(item.cover).width(innerWidth > 1080 ? 1280 : 800)} alt="Image for {item.title}">
    {/if}
  <div>
    {#if item.content}
      <div id="content">
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
    {#if item.partners}
      <div id="partners">
        <h4 class="font-s">partnered by</h4>
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
#content {
  -ms-flex-preferred-size: 100%;
      flex-basis: 100%;
  padding: .3em 0;
}
#partners {
  border-top: solid 1px #000;
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
:global(#partners .marquee-content .grid) {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  row-gap: 1em;
}
#partners .logo {
  height: .7em;
  margin-right: 1em;
}
</style>