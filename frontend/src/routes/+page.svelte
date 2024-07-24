<script>
const { data } = $props()
let h1Height = $state()

import { urlFor } from "$lib/utils/image.js";
</script>

<h1 bind:clientHeight={h1Height}>{data.homepage[0].title}</h1>
<section>
  {#each  data.homepage[0].whatsOn as item, i}
    <a href={item._type === 'event' ? '/events/' + item.slug.current : '/festivals/' + item.slug.current}>
      <h2>{item.title}</h2>
      {#if item.cover}
        <img class="cover" src={urlFor(item.cover).width(1280)} alt="">
      {:else}
        <p class="cover">Missing image</p>
      {/if}
    </a>
  {/each}
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
  margin-top: 5.86em;
  width: 100%;
}
a {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: .9em;
  border-bottom: solid 1px #000;
}
h2 {
  padding: .3em 0 .25em;
  border-bottom: solid 1px #000;
  margin-bottom: .4em;
  width: 100%;
}
.cover {
  width: 50%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
}
p.cover {
  background-color: #EEE;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>