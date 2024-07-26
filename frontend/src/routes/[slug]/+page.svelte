<script>
// Import data
const { data } = $props()

// Import from svelte/lib
import { PortableText } from '@portabletext/svelte'
import PortableTextStyle from '$lib/components/portableTextStyle.svelte'

// Import stores
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#8A7369');
colorer.changeSecondaryColor('#FF6B6B');
</script>

<h1>{data.about[0].title}</h1>
<section>
  {#if data.about[0].content}
    <div id="content">
      <PortableText
      value={data.about[0].content}
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
  position: sticky;
  top: 0;
  pointer-events: none;
  z-index: 1;
}
section {
  border-top: solid 1px #000;
  border-bottom: solid 1px #000;
  /* margin-top: 5.86em; */
  width: 100%;
  padding: .3em 0;
}
</style>