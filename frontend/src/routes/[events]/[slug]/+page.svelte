<script>
// Import data
const { data } = $props()
const item = data.item[0]

import { urlFor } from "$lib/utils/image.js";
import Wysiwyg from "$lib/components/Wysiwyg.svelte";
import { formatDate } from "$lib/utils/date.js";
import { register } from 'swiper/element/bundle';
register();
</script>

<h1>{item.title}</h1>
<section>
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
  {#if item._type == 'event'}
    <p class="font-m">{formatDate(item.start, item.end)}</p>
  {:else}
    <p class="font-m">{formatDate(item.days[0].date, item.days[item.days.length - 1].date)}</p>
  {/if}
  <Wysiwyg blocks={item.content}/>
</section>
<style>
h1  {
  padding: 3em 0 1.66em;
  position: fixed;
  top: 0;
  pointer-events: none;
}
section {
  border-top: solid 1px #000;
  border-bottom: solid 1px #000;
  margin-top: 5.86em;
  width: 100%;
  padding: .3em 0 .25em;
}
.cover {
  width: 100%;
  height: auto;
}
</style>