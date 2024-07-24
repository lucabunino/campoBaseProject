<script>
// Import data
const { data } = $props()

// Import from svelte/lib
import Wysiwyg from '$lib/components/Wysiwyg.svelte'
</script>

<h1>{data.about[0].title}</h1>
<section>
  <Wysiwyg blocks={data.about[0].content}/>
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
</style>