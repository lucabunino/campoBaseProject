<script>
const { data } = $props()

import { urlFor } from "$lib/utils/image.js";
</script>

<h1>{data.homepage[0].title}</h1>
{#each  data.homepage[0].whatsOn as item, i}
  <a href={item._type === 'event' ? '/events/' + item.slug.current : '/festivals/' + item.slug.current}>
    {#if item.cover}
      <img class="cover" src={urlFor(item.cover)} alt="">
    {:else}
      <p class="cover">Missing image</p>
    {/if}
    <h2>{item.title}</h2>
    {#if item._type == 'event'}
      <p>{item.start ? item.start : ''}{item.end ? ' - ' + item.end : ''}</p>
    {:else}
      {#if item.days && item.days.length > 1}
        <p>{item.days ? item.days[0].date : ''}{item.days ? ' - ' + item.days[item.days.length - 1].date : ''}</p>
      {:else if item.days}
        <p>{item.days[0].date}</p>
      {/if}
    {/if}
  </a>
{/each}

<style>
a {
  display: flex;
}
.cover {
  width: 20%;
  height: auto;
  aspect-ratio: 1;
  background-color: red;
  border-radius: 5px;
}
</style>