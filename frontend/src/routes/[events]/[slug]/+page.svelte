<script>
// Import data
const { data } = $props()
const item = data.item[0]

import { urlFor } from "$lib/utils/image.js";
import Wysiwyg from "$lib/components/Wysiwyg.svelte";
import { register } from 'swiper/element/bundle';
register();
</script>

<h1>{item.title}</h1>
{#if item._type == 'event'}
  <p>{item.start ? item.start : ''}{item.end ? ' - ' + item.end : ''}</p>
{:else}
  {#if item.days && item.days.length > 1}
    <p>{item.days ? item.days[0].date : ''}{item.days ? ' - ' + item.days[item.days.length - 1].date : ''}</p>
  {:else if item.days}
    <p>{item.days[0].date}</p>
  {/if}
{/if}
<swiper-container>
  {#each item.slider as slide}
    <swiper-slide>
      <img src={urlFor(slide)} alt="Image for {item.title}">
    </swiper-slide>
  {/each}
</swiper-container>
<Wysiwyg blocks={item.content}/>
<style>

</style>