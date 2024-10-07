<script>
  import { urlFor } from "$lib/utils/image.js";
  export let portableText;

  $: ({global, value} = portableText);
  $: ({style} = value);
  console.log(portableText);
  
</script>

{#if value}
<figure>
  <img src={urlFor(value.asset).width(1920)} alt={value.alt ? value.alt : 'Image'} />
  {#if value.caption}
    <figcaption class="font-xs">{value.caption}</figcaption>
  {/if}
</figure>
{/if}

<style>
figure:first-of-type {
  margin-top: 0;
}
figure {
  width: 100%;
  height: auto;
  margin: 0;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
img {
  width: 100%;
  height: auto;
}
</style>