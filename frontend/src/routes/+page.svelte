<script>
// Import data
const { data } = $props()

// Import from svelte/lib
import { urlFor } from "$lib/utils/image.js";

// Import stores
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#3873D1');
colorer.changeSecondaryColor('#CCBFAA');

// Variables
let h1Height = $state()
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
/* Common */
h1  {
  padding: 3em 0 1.66em;
  pointer-events: none;
  z-index: 1;
}
section {
  border-top: solid 1px #000;
  /* margin-top: 5.86em; */
  width: 100%;
}

/* Content */
a {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: .9em;
  border-bottom: solid 1px #000;
}
h2 {
  padding: .3em 0;
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
@media screen and (max-width: 1080px) {
  .cover {
    width: 70%;
  }
}
</style>