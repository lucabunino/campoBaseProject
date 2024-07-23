<script>
// Import data
const { data } = $props()

let openFormat = $state(undefined)
function toggleFormat(formatIndex) {
  if (openFormat === formatIndex) {
    openFormat = undefined
  } else {
    openFormat = formatIndex
    const el = document.body.querySelector(`[data-format="${formatIndex}"]`);
    console.log(el);
  }
}
</script>

{#each data.format as format, i}
  <h3 onkeyup={(e) => toggleFormat(i)} onclick={(e) => toggleFormat(i)}>{format[0]}</h3>
  <div class="format" data-format={i} class:open={openFormat === i}>
    {#each format[1] as item, i}
      <a href={item._type === 'event' ? '/events/' + item.slug.current : '/festivals/' + item.slug.current}><h2>{item.title}</h2></a>
    {/each}
  </div>
{/each}

<style>
.format {
  padding: 30px;
  width: 100%;
  border: solid 1px #000;
  display: none;
}
.format.open {
  display: block;
}
</style>