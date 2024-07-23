<script>
// Import data
const { data, children } = $props()

// Import from svelte/lib
import { beforeNavigate, afterNavigate } from '$app/navigation';
import { page } from '$app/stores';
import { urlFor } from '$lib/utils/image';
import { onMount } from 'svelte'
import { fade } from 'svelte/transition'
import { workaround, pageIn, pageOut, mockTransition } from '$lib/utils/transition';

// Variables
let innerWidth = $state();
let innerHeight = $state();
let pageHeight = $state();
let ready = $state(false);
let scrollY = $state(0)
let menuOpen = $state()

onMount(() => {
  ready = true;
});
</script>
  
<svelte:head>
  {#if data.seo[0].SEOTitle}<title>{data.seo[0].SEOTitle}</title>{/if}
  {#if data.seo[0].SEODescription}<meta name="description" content={data.seo[0].SEODescription}>{/if}
  <link rel="canonical" href={$page.url}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  {#if data.seo[0].SEOTitle}<meta property="og:title" content={data.seo[0].SEOTitle}>{/if}
  {#if data.seo[0].SEODescription}<meta property="og:description" content={data.seo[0].SEODescription}>{/if}
  {#if data.seo[0].SEOImage}<meta property="og:image" content={urlFor(data.seo[0].SEOImage).width(2000).url()}>{/if}
  <meta property="og:url" content={$page.url}>
  <meta property="og:type" content="website">
  {#if data.seo[0].SEOTitle}<meta property="og:site_name" content={data.seo[0].SEOTitle}>{/if}
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY/>
  
<header>
  <a href="/" id="logo">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <rect width="200" height="200" fill="#cccccc"></rect>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="26px" fill="#333333">200*200</text>   
    </svg>
  </a>
  <nav>
    <ul id="menu" class:open={menuOpen}>
      <li>
        <a href="/" class:active={$page.url.pathname === "/"} class="menu-item">{data.homepage[0].title}</a>
      </li>
      <li>
        <a href="/format" class:active={$page.url.pathname === "/work"} class="menu-item">Format</a>
      </li>
      {#each data.festivalsMenu as festival, i}
        <li>
          <a href="/festivals/{festival.slug.current}" class:active={$page.url.pathname === festival.slug.current} class="menu-item">{festival.title}</a>
        </li>
      {/each}
      <li>
        <a href="/{data.about[0].slug.current}" class:active={$page.url.pathname === data.about[0].slug.current} class="menu-item">{data.about[0].title}</a>
      </li>
    </ul>
    <button id="menuSwitch" onclick={(e) => menuOpen = !menuOpen}>X</button>
  </nav>
</header>

{#key data.pathname}
  <main
  in:fade={workaround({ delay: 1000, duration: 1000 })}
  out:fade={workaround({ delay: 0, duration: 1000, marginTop: scrollY })}
  bind:clientHeight={pageHeight}
  >
    {@render children()}
  </main>
{/key}

<footer>
  <p class="footer-item one">©{new Date().getFullYear()} {data.seo[0].SEOTitle}</p>
  <a href="/" class="footer-item two">Privacy</a>
  <a href="/" class="footer-item three">Cookies</a>
</footer>

<style>
/* Menu */
#menuSwitch {
  position: fixed;
  top: 0;
  left: 0;
}
#menu {
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  transition: all 500ms ease;
  height: -webkit-fill-available;
  background-color: #FFF;
  width: 30vw;
  border-right: solid 1px #000;
  margin: 0;
}
#menu.open {
  transform: translateX(0);
}
/* Header */
header {
  display: flex;
  justify-content: center;
}
#logo {
  width: 100px;
}
#logo svg {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>