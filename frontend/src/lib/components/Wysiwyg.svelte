<script>
const { blocks } = $props();

// Utility function to find mark definition by key
function findMark(markDefs, key) {
  return markDefs.find(mark => mark._key === key);
}
</script>

{#each blocks as block}
  {#if block.style === 'normal'}
    <p>
      {#each block.children as child}
        {#if child.marks.length === 1}
          {#each child.marks as mark}
            {#if mark === 'em'}
              <em>{child.text}</em>
            {:else if mark === 'strong'}
              <strong>{child.text}</strong>
            {:else if findMark(block.markDefs, mark)._type === 'link'}
              {#if findMark(block.markDefs, mark).blank}
                <a class="underline" href="{findMark(block.markDefs, mark).href}" target="_blank">{child.text}</a>
              {:else}
                <a class="underline" href="{findMark(block.markDefs, mark).href}">{child.text}</a>
              {/if}
            {:else}
              {child.text}
            {/if}
          {/each}
        {:else if child.marks.includes('em', 'strong')  }
          <em><strong>{child.text}</strong></em>          
        {:else}
          {child.text}
        {/if}
      {/each}
    </p>
  {:else}
    {@html `<${block.style}>` + block.children[0].text + `</${block.style}>`}
  {/if}
{/each}

<style>
.underline {
  text-decoration: underline;
  text-underline-offset: .15em;
  text-decoration-thickness: 1px;
}
</style>