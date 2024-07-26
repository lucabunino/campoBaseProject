<script>
  export let portableText;

  $: ({global, value} = portableText);
  $: ({style} = value);
</script>

{#if style === 'normal'}
  <p class="paragraph"><slot /></p>
{:else if value.href}
  <a class="link" href={value.href} target={value.blank ? '_blank' : undefined}>
    <slot />
  </a>
{/if}

<style>
.link {
  text-decoration: underline;
  text-underline-offset: .15em;
  text-decoration-thickness: 1px;
}
.paragraph {
  margin-top: 1.2em;
}
.paragraph:first-of-type {
  margin-top: 0;
}
</style>
