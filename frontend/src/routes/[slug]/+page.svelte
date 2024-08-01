<script>
// Import data
const { data } = $props()

// Import from svelte/lib
import { PortableText } from '@portabletext/svelte'
import PortableTextStyle from '$lib/components/portableTextStyle.svelte'

// Import stores
import { getLang } from '$lib/stores/lang.svelte.js';
const langer = getLang();
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#8A7369');
colorer.changeSecondaryColor('#FF6B6B');
</script>

<h1>{data.about[0].title}</h1>
<section>
  {#if data.about[0].content}
    <div id="content" class="font-m">
      <PortableText
      value={data.about[0].content[langer.lang]}
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
  {#if data.about[0].adress || data.about[0].email}
    <div id="info" class="font-xs">
      {#if data.about[0].adress && data.about[0].googleMaps}
        <a class="place" href={data.about[0].googleMaps} target="_blank">{data.about[0].adress}</a>
      {:else if data.about[0].adress}
        <p class="place">{data.about[0].adress}</p>
      {/if}
      {#if data.about[0].email}
        <p class="email">Info: <a href="mailto:{data.about[0].email}" target="_blank">{data.about[0].email}</a></p>
      {/if}
    </div>
  {/if}
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
  border-bottom: solid 1px #000;
  width: 100%;
  padding: .3em 0;
}
#info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 2em 0 0;
}
@media screen and (max-width: 1080px) {
  #info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    gap: .3em;
  }
}
</style>