<script>
// Import data
const { data } = $props()
const item = data.item[0]

import { urlFor } from "$lib/utils/image.js";
import { PortableText } from '@portabletext/svelte'
import PortableTextStyle from '$lib/components/portableTextStyle.svelte'
import { formatDate } from "$lib/utils/date.js";
import { register } from 'swiper/element/bundle';
register();

// Import stores
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#8A7369');
colorer.changeSecondaryColor('#FF6B6B');
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
  <div id="info">
    <p class="date font-m">{formatDate(item.start, item.end)}</p>
    {#if item.location}<a class="place font-m" href={item.googleMaps} target="_blank">{item.location}</a>{/if}
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
</section>

<style>
/* Common */
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
  border-bottom: solid 1px #000;
}
#info {
  display: flex;
  justify-content: space-between;
  padding: .5em 0;
  border-bottom: solid 1px #000;
}
#content {
  padding: .3em 0;
  border-bottom: solid 1px #000;
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
}
</style>