<script>
const { data } = $props()

import { urlFor } from "$lib/utils/image.js";
</script>

<h1>{data.homepage[0].title}</h1>
{#each  data.homepage[0].whatsOn as occurency, i}
  <a href={occurency.slug.current}>
    {#if occurency.cover}
      <img class="cover" src={urlFor(occurency.cover)} alt="">
    {:else}
      <p class="cover">Missing image</p>
    {/if}
    <h2>{occurency.title}</h2>
    {#if occurency._type == 'event'}
      <p>{occurency.start ? occurency.start : ''}{occurency.end ? ' - ' + occurency.end : ''}</p>
    {:else}
      {#if occurency.days && occurency.days.length > 1}
        <p>{occurency.days ? occurency.days[0].date : ''}{occurency.days ? ' - ' + occurency.days[occurency.days.length - 1].date : ''}</p>
      {:else if occurency.days}
        <p>{occurency.days[0].date}</p>
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