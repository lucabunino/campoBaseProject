<script>
// Import data
const { data, children } = $props()

// Import from svelte/lib
import { beforeNavigate, afterNavigate } from '$app/navigation';
import { page, navigating } from '$app/stores';
import { urlFor } from '$lib/utils/image';
import { onMount } from 'svelte'
import { workaround, pageIn, pageOut, loaderOut, newsletterInOut } from '$lib/utils/transition';
import { browser } from '$app/environment';

// Import stores
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
import { getLang } from '$lib/stores/lang.svelte.js';
const langer = getLang();

// Variables
let innerWidth = $state();
let innerHeight = $state();
let pageHeight = $state();
let ready = $state(false);
let scrollY = $state(0)
let menuOpen = $state()
let newsletterOpen = $state()
let scrollNewsletter = $derived(scrollY/2)
let newsletterHeight = $state()

onMount(() => {
  // if ($page.url.pathname) {
  //   setTimeout(() => {
  //     ready = true;
  //   }, 400);
  // }
  if (browser) {
    checkLanguage();
    setTimeout(() => {
      newsletterOpen = true;
    }, 100);
  }
  ready = true;
});

function checkLanguage() {
  // Check if userLanguage is stored in localStorage
  const storedLanguage = localStorage.getItem('userLanguage');
  if (storedLanguage && (storedLanguage === 'it' || storedLanguage === 'en')) {
    langer.changeLang(storedLanguage)
  } else {
    // If not stored or invalid, get the user's preferred language from userAgent
    const userAgentLanguage = navigator.language.substr(0, 2) || navigator.userLanguage.substr(0, 2); // Get the first two characters for language code
    if (userAgentLanguage === 'it' || userAgentLanguage === 'en') {
      langer.changeLang(userAgentLanguage);
    } else {
      langer.changeLang('it');
    }
  }
}

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

<!-- {#key data.pathname}
  <div id="loader"
  class:active={$navigating}
  style="background-color: {colorer.secondaryColor};"
  out:loaderOut={workaround({ delay: 1000, duration: 1000 })}
  ></div>
{/key} -->

  <div style="display:contents; --primaryColor: {colorer.primaryColor};--secondaryColor: {colorer.secondaryColor};">
    <div id="bg"></div>
    <header>
      <a href="/" id="logo" onclick={(e) => menuOpen = false}>
        <svg data-name="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1377.77 883.31">
          <path d="M249.17 227.19h-.01Zm-105.29-68.86c-5.71-13.79-8.6-28.94-8.6-45.04s2.89-31.26 8.6-45.04c5.72-13.8 13.82-25.9 24.08-35.95 10.24-10.02 22.41-18 36.18-23.7C217.93 2.89 233.08 0 249.18 0c14.53 0 29.35 2.43 44.06 7.23 13.63 4.44 25.89 11.38 36.47 20.62a9.708 9.708 0 0 1 2.18 11.95l-21.01 39.24c-1.44 2.68-3.98 4.5-6.98 5s-6-.4-8.23-2.47c-6.49-6.02-13.33-10.55-20.33-13.46-8.55-3.55-17.25-5.36-25.85-5.36-7.61 0-14.68 1.24-21 3.69-6.24 2.42-11.67 5.91-16.11 10.36-4.47 4.47-8.02 9.87-10.54 16.04-2.53 6.19-3.82 13.17-3.82 20.76s1.28 14.57 3.82 20.76c2.53 6.17 6.07 11.57 10.54 16.04s9.83 7.94 15.98 10.36c6.21 2.45 13.21 3.69 20.82 3.69 5.04 0 11.3-.7 18.62-2.08 5.64-1.07 11.63-3.02 17.81-5.8a9.685 9.685 0 0 1 8.36.17 9.696 9.696 0 0 1 5.14 6.57l9.33 41.62c1.02 4.54-1.34 9.19-5.61 11.06-7.42 3.25-15.21 5.88-23.17 7.8-9.34 2.25-19.6 3.4-30.49 3.4-16.1 0-31.25-2.89-45.03-8.6-13.79-5.71-25.97-13.8-36.22-24.04-10.25-10.25-18.34-22.43-24.04-36.22Zm1.4-45.06c0 14.78 2.64 28.65 7.84 41.21 5.2 12.57 12.56 23.66 21.88 32.97 9.31 9.31 20.41 16.67 32.97 21.88 12.57 5.2 26.43 7.84 41.21 7.84 10.1 0 19.58-1.05 28.15-3.12 7.32-1.77 14.49-4.17 21.31-7.16l-9.22-41.1c-6.79 3.03-13.44 5.18-19.77 6.38-7.93 1.5-14.82 2.26-20.48 2.26-8.87 0-17.1-1.47-24.48-4.38-7.43-2.93-13.96-7.17-19.39-12.6-5.42-5.42-9.7-11.92-12.73-19.33-3.03-7.4-4.56-15.65-4.56-24.54s1.53-17.15 4.56-24.54c3.03-7.41 7.31-13.91 12.73-19.33 5.44-5.44 12.02-9.68 19.57-12.61 7.48-2.9 15.76-4.37 24.62-4.37 9.93 0 19.92 2.06 29.69 6.12 8.01 3.33 15.76 8.42 23.05 15.14l20.75-38.76c-9.52-8.28-20.57-14.51-32.84-18.51-13.71-4.47-27.48-6.74-40.96-6.74V10c-14.78 0-28.65 2.64-41.21 7.84-12.58 5.21-23.69 12.48-33.01 21.6-9.29 9.1-16.64 20.07-21.84 32.62-5.2 12.57-7.84 26.43-7.84 41.21Zm274.69 25.04a9.663 9.663 0 0 1-.63-9.33l19.27-41.68c1.61-3.49 5-5.65 8.84-5.65s7.23 2.17 8.84 5.65l19.27 41.68a9.715 9.715 0 0 1-.63 9.33 9.697 9.697 0 0 1-8.21 4.49h-38.54a9.71 9.71 0 0 1-8.21-4.49Zm8.62-5.51h37.72l-18.86-40.79-18.86 40.79Zm-106.38 80.56 95.85-207.7A9.77 9.77 0 0 1 426.9 0h41.09a9.75 9.75 0 0 1 8.84 5.66l95.84 207.71c1.4 3.03 1.16 6.52-.64 9.33s-4.87 4.49-8.2 4.49h-47.57c-3.79 0-7.26-2.22-8.85-5.66l-11.97-25.99h-95.99l-11.97 25.98a9.774 9.774 0 0 1-8.85 5.66h-47.58a9.68 9.68 0 0 1-8.2-4.49 9.717 9.717 0 0 1-.64-9.33Zm9.26 3.83h47.01l11.97-25.99a9.774 9.774 0 0 1 8.85-5.66h96.32c3.79 0 7.26 2.22 8.85 5.66l11.97 25.99h46.99L467.83 10h-40.76l-95.6 207.19Zm253.8.26V9.74c0-5.37 4.37-9.74 9.74-9.74h42.76c3.5 0 6.75 1.89 8.48 4.94l78.06 137.91L802.37 4.94A9.741 9.741 0 0 1 810.85 0h42.76c5.37 0 9.74 4.37 9.74 9.74v207.71c0 5.37-4.37 9.74-9.74 9.74h-43.27c-5.37 0-9.74-4.37-9.74-9.74v-82.42l-49.48 87.23a9.76 9.76 0 0 1-8.47 4.93h-36.68c-3.5 0-6.75-1.89-8.47-4.93l-49.48-87.23v82.42c0 5.37-4.37 9.74-9.74 9.74h-43.27c-5.37 0-9.74-4.37-9.74-9.74Zm10-.26h42.75v-83.15c0-4.49 2.92-8.27 7.25-9.42 4.34-1.15 8.74.71 10.96 4.61l49.89 87.96h36.37l49.89-87.96c2.21-3.91 6.62-5.76 10.96-4.61 4.34 1.14 7.25 4.93 7.25 9.42v83.15h42.76V10H811l-78.21 138.18c-1.73 3.05-4.97 4.94-8.48 4.94s-6.75-1.89-8.48-4.94L637.62 10h-42.35v207.19Zm353.46-114.54V62.49c0-5.37 4.37-9.74 9.74-9.74h32.18c10.81 0 18.77 2.95 23.68 8.76 4.69 5.56 7.08 12.65 7.08 21.07s-2.38 15.51-7.08 21.07c-4.91 5.81-12.87 8.76-23.68 8.76v-.02h-32.18c-5.37 0-9.74-4.37-9.74-9.74Zm10-.26h31.92c7.72 0 13.12-1.75 16.04-5.21 3.17-3.76 4.72-8.54 4.72-14.61s-1.54-10.86-4.72-14.62c-2.92-3.46-8.31-5.21-16.04-5.21h-31.92v39.64Zm-62.75 115.06V9.74c0-5.37 4.37-9.74 9.74-9.74h84.93c11.98 0 23.21 2.11 33.38 6.27 10.17 4.15 19.11 9.93 26.57 17.17 7.51 7.29 13.38 16.11 17.45 26.23 4.05 10.06 6.1 21.13 6.1 32.89s-2.05 22.83-6.1 32.89c-4.07 10.12-9.94 18.95-17.45 26.23-7.46 7.24-16.4 13.02-26.57 17.18-10.18 4.16-21.41 6.27-33.38 6.27h-31.92v52.32c0 5.37-4.37 9.74-9.74 9.74h-43.27c-5.37 0-9.74-4.37-9.74-9.74Zm10-.26h42.75v-52.31c0-5.37 4.37-9.74 9.74-9.74h32.18c10.67 0 20.63-1.86 29.6-5.52 8.98-3.67 16.85-8.75 23.39-15.09 6.5-6.31 11.59-13.97 15.13-22.79 3.57-8.87 5.38-18.69 5.38-29.16s-1.81-20.29-5.38-29.16c-3.54-8.82-8.64-16.48-15.13-22.79-6.54-6.35-14.41-11.42-23.39-15.09-8.97-3.67-18.93-5.52-29.6-5.52h-84.67v207.17Zm181.45-58.55c-5.71-13.79-8.6-28.94-8.6-45.04s2.89-31.25 8.6-45.04 13.75-25.92 23.89-36.06 22.28-18.18 36.06-23.89c13.79-5.71 28.94-8.6 45.04-8.6s31.26 2.89 45.04 8.6c13.79 5.71 25.92 13.75 36.06 23.89s18.18 22.28 23.89 36.06c5.71 13.79 8.6 28.94 8.6 45.04s-2.89 31.25-8.6 45.04c-5.71 13.79-13.75 25.92-23.89 36.06s-22.28 18.18-36.06 23.89c-13.79 5.71-28.94 8.6-45.04 8.6s-31.25-2.89-45.04-8.6c-13.79-5.71-25.92-13.75-36.06-23.89s-18.18-22.28-23.89-36.06Zm1.4-45.05c0 14.78 2.64 28.65 7.84 41.21 5.2 12.57 12.51 23.61 21.72 32.82s20.25 16.52 32.82 21.72c12.57 5.2 26.43 7.84 41.21 7.84s28.65-2.64 41.21-7.84c12.57-5.2 23.61-12.51 32.82-21.72s16.52-20.25 21.72-32.82 7.84-26.43 7.84-41.21-2.64-28.65-7.84-41.21c-5.2-12.57-12.51-23.61-21.72-32.82-9.21-9.21-20.25-16.52-32.82-21.72-12.57-5.2-26.43-7.84-41.21-7.84s-28.65 2.64-41.21 7.84c-12.56 5.2-23.61 12.51-32.82 21.72s-16.52 20.25-21.72 32.82-7.84 26.43-7.84 41.21Zm47.12 24.48c-2.91-7.38-4.38-15.62-4.38-24.48s1.47-17.1 4.38-24.48c2.93-7.44 7.17-13.96 12.6-19.39s11.95-9.67 19.39-12.6c7.38-2.91 15.62-4.38 24.48-4.38s17.1 1.47 24.48 4.38c7.44 2.93 13.96 7.17 19.39 12.6s9.67 11.95 12.6 19.39c2.91 7.38 4.38 15.62 4.38 24.48s-1.47 17.1-4.38 24.48c-2.93 7.43-7.17 13.96-12.6 19.39s-11.95 9.67-19.39 12.6c-7.38 2.91-15.62 4.38-24.48 4.38s-17.1-1.47-24.48-4.38c-7.44-2.93-13.96-7.17-19.39-12.6s-9.67-11.95-12.6-19.39Zm5.62-24.47c0 7.61 1.24 14.61 3.69 20.82 2.42 6.15 5.91 11.53 10.36 15.98 4.45 4.45 9.83 7.94 15.98 10.36 6.21 2.45 13.21 3.69 20.82 3.69s14.61-1.24 20.82-3.69c6.15-2.42 11.53-5.91 15.98-10.36 4.45-4.45 7.94-9.83 10.36-15.98 2.45-6.21 3.69-13.21 3.69-20.82s-1.24-14.61-3.69-20.82c-2.42-6.15-5.91-11.53-10.36-15.98s-9.83-7.94-15.98-10.36c-6.21-2.45-13.21-3.69-20.82-3.69s-14.61 1.24-20.82 3.69c-6.15 2.42-11.53 5.91-15.98 10.36s-7.94 9.83-10.36 15.98c-2.45 6.21-3.69 13.21-3.69 20.82ZM397.59 429.05v-20c0-5.37 4.37-9.74 9.74-9.74h33.42c6.55 0 11.91 1.69 15.92 5.04 4.28 3.57 6.45 8.67 6.45 15.17 0 5.45-1.77 10.06-5.27 13.7-3.55 3.69-8.99 5.57-16.17 5.57h-34.35c-5.37 0-9.74-4.37-9.74-9.74Zm10-.25 34.09-.01c2.99 0 6.98-.43 8.96-2.5 1.69-1.76 2.48-3.91 2.48-6.77 0-4.58-1.63-6.46-2.86-7.48-2.16-1.8-5.37-2.72-9.52-2.72h-33.16v19.48Zm-9.99-81.98v-20c0-5.37 4.37-9.74 9.74-9.74h34.36c7.18 0 12.62 1.87 16.17 5.57 3.5 3.64 5.27 8.25 5.27 13.71 0 6.25-2.15 11.28-6.38 14.95-4.02 3.49-9.4 5.25-16 5.25h-33.42c-5.37 0-9.74-4.37-9.74-9.74Zm10.01-19.73v19.47h33.15c4.12 0 7.29-.95 9.45-2.81 2-1.73 2.93-4.08 2.93-7.39 0-2.86-.79-5.01-2.48-6.77-1.99-2.06-5.97-2.5-8.96-2.5h-34.09Zm34.08 111.7h.01Zm315.35 52.73h.02-47.58c-3.79 0-7.26-2.22-8.85-5.66l-11.97-25.99h-95.99l-11.97 25.98a9.774 9.774 0 0 1-8.85 5.66h-47.58c-3.34 0-6.41-1.68-8.2-4.49s-2.04-6.3-.64-9.33l95.84-207.71a9.77 9.77 0 0 1 8.84-5.66h41.09a9.75 9.75 0 0 1 8.84 5.66l95.84 207.71c1.4 3.03 1.16 6.52-.64 9.33s-4.87 4.49-8.2 4.49Zm-.38-9.99-95.6-207.19H620.3l-95.6 207.19h47.01l11.97-25.99a9.774 9.774 0 0 1 8.85-5.66h96.32c3.79 0 7.26 2.22 8.85 5.66l11.97 25.99h46.99ZM649.51 351.64l19.27 41.68c1.4 3.03 1.16 6.52-.63 9.33s-4.87 4.49-8.21 4.49H621.4c-3.34 0-6.41-1.68-8.21-4.49s-2.04-6.3-.63-9.33l19.27-41.68c1.61-3.49 5-5.65 8.84-5.65s7.23 2.17 8.84 5.65Zm10.03 45.5-18.86-40.79-18.86 40.79h37.72Zm184.43-132.8c9.94 0 19.38 1.27 28.07 3.76 8.8 2.53 16.79 6.39 23.75 11.47 7 5.11 12.96 11.52 17.72 19.05 4.08 6.46 7.18 13.96 9.22 22.3 1.14 4.67-1.38 9.54-5.87 11.33l-38.72 15.44c-2.51 1-5.34.91-7.78-.25a9.754 9.754 0 0 1-5.11-5.86c-1.48-4.68-3.65-8.12-6.45-10.24-3.75-2.83-8.84-4.26-15.14-4.26-7.13 0-10.62 1.43-12.29 2.63-2.55 1.84-2.88 3.52-2.88 4.78 0 1.65.48 2.96 1.51 4.1 1.39 1.54 3.5 2.97 6.26 4.22 3.17 1.44 7.02 2.82 11.42 4.09 4.69 1.35 9.92 2.99 15.55 4.87 6.73 2.1 13.64 4.86 20.46 8.16 7.06 3.42 13.44 7.84 18.97 13.15 5.62 5.4 10.23 12.15 13.69 20.07 3.47 7.94 5.23 17.65 5.23 28.84s-1.98 20.64-5.88 29.22c-3.9 8.58-9.39 15.99-16.32 22.02-6.9 6.01-15.26 10.62-24.87 13.71-9.45 3.04-19.94 4.58-31.16 4.58-9.94.01-19.38-1.26-28.07-3.75-8.8-2.53-16.79-6.39-23.75-11.47-7-5.11-12.96-11.52-17.72-19.05-4.08-6.46-7.18-13.96-9.22-22.3-1.14-4.67 1.38-9.54 5.87-11.33l38.72-15.44c2.5-1 5.34-.91 7.78.25a9.785 9.785 0 0 1 5.11 5.86c1.48 4.68 3.65 8.12 6.45 10.24 3.75 2.83 8.84 4.26 15.14 4.26 7.13 0 10.62-1.43 12.29-2.63 2.55-1.84 2.88-3.52 2.88-4.78 0-1.65-.48-2.96-1.51-4.1-1.39-1.54-3.5-2.97-6.26-4.22-3.18-1.45-7.02-2.82-11.42-4.09-4.69-1.35-9.92-2.99-15.55-4.87-6.73-2.1-13.64-4.86-20.46-8.16-7.06-3.42-13.44-7.84-18.97-13.15-5.62-5.4-10.23-12.15-13.69-20.07-3.47-7.94-5.23-17.65-5.23-28.84s1.98-20.63 5.88-29.22c3.9-8.58 9.39-15.99 16.32-22.03 6.9-6.01 15.26-10.62 24.87-13.71 9.45-3.04 19.94-4.58 31.16-4.58Zm.01 10.01c-10.18 0-19.64 1.38-28.1 4.1-8.31 2.67-15.49 6.62-21.36 11.73-5.84 5.09-10.48 11.35-13.78 18.62-3.31 7.27-4.98 15.71-4.98 25.08s1.48 18.16 4.39 24.84c2.93 6.7 6.78 12.37 11.45 16.85 4.77 4.58 10.29 8.4 16.4 11.36 6.37 3.08 12.82 5.66 19.17 7.64 5.59 1.86 10.7 3.46 15.25 4.78 4.86 1.4 9.16 2.95 12.78 4.6 4.02 1.83 7.24 4.06 9.56 6.64 2.71 3.01 4.08 6.64 4.08 10.79 0 3.58-1.22 8.72-7.04 12.9-4.22 3.03-10.15 4.51-18.12 4.51-8.52 0-15.64-2.11-21.16-6.29-4.43-3.35-7.75-8.37-9.87-14.93l-38.26 15.25h-.02c1.77 7.18 4.43 13.6 7.89 19.08 4.09 6.46 9.19 11.96 15.17 16.32 6.01 4.39 12.95 7.73 20.62 9.94 7.79 2.24 16.3 3.37 25.3 3.37 10.18 0 19.64-1.38 28.1-4.1 8.31-2.67 15.49-6.62 21.36-11.73 5.84-5.08 10.47-11.35 13.78-18.62 3.31-7.27 4.98-15.71 4.98-25.08s-1.48-18.16-4.39-24.84c-2.93-6.7-6.78-12.37-11.45-16.85-4.77-4.58-10.29-8.4-16.4-11.36-6.37-3.08-12.82-5.66-19.17-7.64-5.59-1.86-10.7-3.46-15.25-4.78-4.87-1.41-9.17-2.95-12.78-4.6-4.03-1.83-7.24-4.06-9.56-6.64-2.7-3-4.08-6.64-4.08-10.79 0-3.58 1.22-8.72 7.05-12.9 4.22-3.03 10.15-4.51 18.12-4.51 8.52 0 15.65 2.11 21.17 6.29 4.43 3.34 7.75 8.37 9.87 14.93l38.26-15.25c-1.77-7.18-4.43-13.6-7.89-19.08-4.09-6.46-9.19-11.96-15.17-16.32-6.01-4.39-12.95-7.73-20.62-9.94-7.79-2.24-16.3-3.37-25.3-3.37Zm165.59 52.74v19.48h81.79c5.37 0 9.74 4.37 9.74 9.74v43.27c0 5.37-4.37 9.74-9.74 9.74h-81.79v19.48h81.79c5.37 0 9.74 4.37 9.74 9.74v43.27c0 5.37-4.37 9.74-9.74 9.74v-.02h-134.8c-5.37 0-9.74-4.37-9.74-9.74V274.08c0-5.37 4.37-9.74 9.74-9.74h134.8c5.37 0 9.74 4.37 9.74 9.74v43.27c0 5.37-4.37 9.74-9.74 9.74h-81.79Zm-10 19.72v-20c0-5.37 4.37-9.74 9.74-9.74h81.79v-42.75H956.82v207.21h134.28v-42.75h-81.79c-5.37 0-9.74-4.37-9.74-9.74v-20c0-5.37 4.37-9.74 9.74-9.74h81.79v-42.75h-81.79c-5.37 0-9.74-4.37-9.74-9.74Zm146.42 272.57h-.01c1.62-11.15.91-37.74-22.08-33.81-20.07 3.43-36.33 9.6-47.99 16.94-5.13 3.23-.9 10.25 1.14 11.34 8.02 4.28 13.81-4.52 27.99 9.65 13.99 13.99 39.33 7.01 40.95-4.12ZM240.14 596.5c-10.18 2.66-22.52-3.45-31.77-.03-3.83 1.42-6.82 4.35-2.15 10.81l24.94 15.08s7.18 7.18 14.72 0c7.54-7.18 16.73-9.69 11.35-16.88-5.39-7.18-10.09-10.8-17.09-8.98Zm80.64 18.36c-5.37 2.75-10.96 4.92-16.37 5.36-13.28 1.08-26.93 2.87-29.44 0-2.51-2.88-1.8-12.93 11.13-16.52 12.93-3.59 32.68-12.2 47.76-21.18 5.13-3.06 9.12-6.1 12.37-8.8 4.49-3.84 9.72-9.15 13.03-15.28 6.52-12.07 21.99-1.07 28-8.41.23-.31.46-.63.68-.96.01-.01.01-.02.01-.02.2-.33.4-.63.61-.93 3.23-5.2 5.17-12.04 5.09-21.26-.04-3.94-.32-7.26-.79-10.09-5.09-25.8-76.14-25.63-84.28-39.2-3.89-6.47 6.71-10.91 36.27-10.37V274.08c0-5.37 4.37-9.74 9.74-9.74h88.65c11.93 0 22.55 1.73 31.55 5.13 9.09 3.44 16.78 8.2 22.83 14.14 6.08 5.97 10.71 13.11 13.75 21.2 2.99 7.97 4.51 16.71 4.51 25.96 0 13.11-2.77 24.13-8.22 32.77-3.7 5.86-8.32 10.71-13.73 14.41 5.71 3.8 10.46 8.85 14.1 14.95 5.21 8.71 7.84 19.54 7.84 32.2 0 9.25-1.52 17.98-4.51 25.96-3.04 8.1-7.66 15.23-13.74 21.2-6.06 5.94-13.74 10.7-22.83 14.14-3.75 1.42-7.8 2.53-12.09 3.36 13.35 7.46 15.41 14.97 6.63 20.39-3.69 2.28-5.71 5.17-6.27 8.84.25 2.61.29 5.32.09 8.05.07.48.13.76.13.76l-.19-.06c-1.02 11.32-6.43 23.2-20.08 32.16-8.73 5.73-21.31 11.1-33.54 15.55-3.06 1.24-5.89 2.2-8.55 3-7.69 2.59-14.83 4.74-20.25 6.3-4.1 2.01-8.01 4.91-12.12 9.81-12.09 14.39-19.14 13.43-23.89 10.72-2.44-1.39-8.64 1.16-14.12 3.98-3.1 1.91-6.39 3.87-9.76 5.6Zm34.06-147.32c11.53.56 25.35 1.73 41.65 3.65.06 0 .11.02.17.02.95.1 1.92.22 2.89.36 4.89.65 9.39 1.43 13.55 2.33h.03v.02c11.61 2.34 21.54 4.91 29.83 7.61h.28c10.72 0 20.14-1.51 28.02-4.49 7.79-2.94 14.3-6.96 19.36-11.92 5.03-4.94 8.87-10.86 11.39-17.58 2.57-6.85 3.87-14.4 3.87-22.45 0-10.82-2.16-19.93-6.43-27.07-2.91-4.86-6.69-8.88-11.24-11.93a9.93 9.93 0 0 1-4.41-8.23c0-3.22 1.59-6.22 4.25-8.01 4.37-2.94 8.12-6.86 11.15-11.65 4.43-7.01 6.67-16.24 6.67-27.43 0-8.05-1.3-15.6-3.87-22.45-2.52-6.72-6.35-12.64-11.39-17.58-5.06-4.97-11.58-8.98-19.36-11.92-7.87-2.98-17.3-4.49-28.02-4.49h-88.39v193.21Zm-77.03 32.95v-.05c.16-.61.3-1.22.42-1.86.72-2.53 2.55-6.89 6.87-8.9 7.12-3.31 9.17-6.33 7.84-9.26l.38-.04s-8.17-17.22-41.2-17.26c-15.44-.09-22.53 3.39-21.9 14.16.79 13.55-5.46 26.63-16.78 34.13-3.51 2.33-7.63 4.62-12.45 6.83-19.96 9.13-35.01 13.04-45.3 20.55-20.37 12.97-23.09 19.75-20.33 28.35.26 1.89 1.24 3.7 2.18 6.11 3.11 8.58-.32 16.15-3.71 20.97a18.985 18.985 0 0 1-16.17 8.05c-4.92-.17-10.25-1.02-17.13 1.08-16.29 4.98-14.69 18.42-14.69 18.42v.02c-.14 1.56-.2 3.28-.12 5.25.07 1.79.08 3.44.03 4.98v.06c0 1.92-.17 3.73-.47 5.44-1.19 8.02-4.24 11.85-6.89 13.69-10.98 11.75-30.37 13.53-30.37 13.53-19.39 3.23-35.55 31.24-46.32 46.32-10.77 15.08 32.32 30.16 57.09 9.69 24.78-20.47 73.25-76.48 87.25-90.48s28.01-11.85 37.7-19.39c9.69-7.54-5.39-18.31 18.31-45.24 23.7-26.93 59.25-45.24 67.86-52.78 4.22-3.69 6.62-7.64 7.86-12.36h.04Zm261.33 104v-.02s-17.1-5.04-43.64 1.15c-20.86 4.86-24.51 3.21-34.58-3.64-10.06-6.85-13.68-8.01-30.16-5.55s-45.45 6.15-51.04 13.59c-5.59 7.44 4.59 12.84 15.08 13.48 10.5.64 13.68 4.45 12.09 10.18-1.59 5.73-6.16 12.72-25.13 22.87 0 0-78.24 39.79-65.52 48.06 12.72 8.27 23.85-5.73 36.26-2.54 12.41 3.19 26.7.32 45.41-20.16 18.71-20.48 23.12-39.08 48.31-43.09 18.24-2.9 25.5-17.1 42.83 0 12.49 12.33 13.13 21.27 31.62 3.29 24.15-23.49 34.62-33.43 18.47-37.62Zm300.29-66.25c-6.53-5.6-20.66-9.34-36.84-13.13-11.3-2.65-19.05 11.15-10.85 19.36 3.14 3.13 6.3 6.46 9.48 9.99 3.47 3.86 8.71 5.61 13.81 4.67 2.94-.54 7.69.26 13.42 1.5 16.49 3.58 26.68-8.92 10.98-22.39Zm-28.57 63.41a58.3 58.3 0 0 0-5.11-2.3c-8.53-4.16-13.65-4.24-19.52-8.62-8.1-6.04-21.31-9.22-27.67.95-3.24 5.19-7.78 8.61-11.06 10.59-13.4 6.27-21.45 15.36-17.61 22.55 5.12 9.59 10.86 18.38 1.96 21.59-13.2 4.75-14.42 6.15-26.28 20.51-21.5 26.03-102.78 127.15-162.58 160.76-48.09 27.03-39.25 35.79-31.82 52.85 3.41 7.83 17.92-1.49 31.82-20.09 19.97-26.72 27.45-13.92 36.56-15.82 9.12-1.91 4.4-16.62 27.93-34.43 14.18-10.73 17.18 1.91 38.8-16.54 6.69-5.71 23.67-41.15 49.05-65.12 25.38-23.96 57.31-41.33 71.1-70.98 7.71-16.57 22.13-16.85 35.29-21.5s46.5-15.2 9.14-34.4Zm110.19 92.78c-5.36 2.77-11.14 4.61-17.1 5.56-6.31 1.01-17.02 3.54-29.51 9.84-19.53 9.85-48.48-7.27-43.63-27.47 4.84-20.19-4.04-25.04-8.89-29.89s11.31-20.2 19.39-22.62c8.08-2.42 15.35 5.66 28.28 5.66 7.21 0 24-9.57 43.75-19.29 0 0 .02-.02.04-.02 1.31-.64 2.64-1.29 3.97-1.93 5.21-2.58 14.15-7.21 18.44-10.53 8.52-6.58 22.07-15.72 35.85-12.84 8.7 1.83 16.36 3.42 22.99 4.78v-.03c20.32 2.25 29.57 12.38 1.81 30.15-40.39 25.86-51.93 31.28-65.94 32.32-13.04.97-43.67 4.89-3.54 20.2 12.16 4.64 2.98 11.5-5.91 16.11Zm-3.63-48.41c6.76 4.84 43.03-21.5 24.79-21.49-2.73.01-6.58 3.61-9.03 4.81-9.27 4.54-28.12 7.83-15.76 16.68Zm113.73 34.45c-11.87-8.06-22.65-8.67-6.54-23.09 12.25-10.96 21.07-17.55 30.14-29.53h.01c5.01-6.63 1.8-15.91-5.45-11.86-8.99 5.02-22.76 12.88-33.15 19.59-16.79 10.84-33.37 21.13-38.1 40.2s5.91 33.83 23.46 34.26c17.55.43 58.48-3.25 59.25-16.22.77-12.96-17.75-5.29-29.62-13.35Zm346.36-142.43.02.02c-2.19-9.21-37.69-4.5-42.87-4.24-12.71-.62-13.69-11.15-13.69-11.15 1.18-4.7 3.48-10.36 9.17-17.53 12.93-24.77-15.01-19.89-24.78-18.31-22.3 3.61-96.95 100.18-115.26 121.72s-28.01 23.7-68.94 52.78c-20.47 14.54-22.62 26.93-19.66 35.68 3.04 8.99 11.86 14.62 21.35 14.52 34.17-.34 45.13-5.03 36.66-26.24-3.93-9.85-4.72-22.14 16.65-42.34 23.83-22.53 37.15-24.82 57.02-37.64 23.9-15.43 21.49-13.48 39.96-34.72 0 0 10.16-15.42 25.87-23.05 1.84-.96 3.6-1.74 5.26-2.44 2.8-1.25 5.44-2.09 7.46-2.09 6.54 0 2.56 4.64.67 11.81-.16 1.98-.57 3.93-.81 4.97-.03.56-.12 1.1-.27 1.64-.01 1.16.41 1.95.88 2.46.33.32.72.6 1.18.83 5.53 2.79 5.45 1.81 20.38-1.23 13.54-2.75 47.34-10.37 43.75-25.45Zm-675.8 76.87h-.01c1.71 20.5-6.56 34.19-27.35 40.28-22.71 6.65-30.91 17.77-30.91 17.77-35.04 41.83-64.72 25.02-70.87 21.15-19.72-12.4-61.65 14.97-61.7-6.04-.06-25.45 42.09-48.5 42.09-48.5 62.44-44.16 122.03-41.11 122.03-41.11 19.71 1.48 25.78 5.18 26.72 16.45Zm-58.76 17.38c-8.69-.47-10.82 4.35-18.69.64-8.76-4.14-19.44-5.47-31.24 10.62-20.24 27.61 15.73 19.36 25.42 13.97 8.22-4.57 42.91-24.22 24.51-25.23Z"/>
        </svg>
      </a>
      <nav>
        <ul id="menu" class:open={menuOpen} class="font-m">
          <li class="menu-item">
            <a href="/" onclick={(e) => menuOpen = false} class:active={$page.url.pathname === "/"}>{data.homepage[0].title}</a>
          </li>
          <li class="menu-item">
            <a href="/projects" onclick={(e) => menuOpen = false} class:active={$page.url.pathname === "/projects"}>Projects</a>
          </li>
          {#each data.festivalsMenu as festival, i}
            <li class="menu-item">
              <a href={festival.use ? festival.url : `/festivals/${festival.slug.current}`} onclick={(e) => menuOpen = false} class:active={$page.url.pathname === `/festivals/${festival.slug.current}`}>{festival.title}{festival.subtitle ? ' ' + festival.subtitle : ''}</a>
            </li>
          {/each}
          <li class="menu-item">
            <a href="/{data.about[0].slug.current}" onclick={(e) => menuOpen = false} class:active={$page.url.pathname === `/${data.about[0].slug.current}`}>{data.about[0].title}</a>
          </li>
          <li class="menu-item last">
            <a href="https://www.instagram.com/projectcampobase" target="_blank">Instagram</a>
          </li>
        </ul>
        <button id="menuSwitch" onclick={(e) => menuOpen = !menuOpen}>{!menuOpen ? 'Menu' : 'X'}</button>
      </nav>
      <div id="langSwitch">
        <button class="lang-item font-xs" onclick={(e) => langer.changeLang('it')} class:active={langer.lang === 'it'}>It</button>
        <span class="font-xs">/</span>
        <button class="lang-item font-xs" onclick={(e) => langer.changeLang('en')} class:active={langer.lang === 'en'}>En</button>
      </div>
    </header>
{#if ready}
    {#key data.pathname}
      <!-- <main
      in:pageIn={workaround({ delay: 300, duration: 0, customValue: scrollY })}
      out:pageOut={workaround({ delay: 0, duration: 300, customValue: scrollY })}
      bind:clientHeight={pageHeight}
      > -->
      <main
      bind:clientHeight={pageHeight}
      >
        {@render children()}
      </main>
    {/key}
  {/if}
  {#if ready}

    <footer class="font-xs">
      <p class="footer-item">©{new Date().getFullYear()} {data.seo[0].SEOTitle}, All rights reserved</p>
    </footer>
    {/if}
  </div>


  {#if newsletterOpen && $page.url.pathname === "/"}
      <div id="newsletter" bind:clientHeight={newsletterHeight} class="font-m"
      transition:newsletterInOut={workaround({ delay: 0, duration: 600, customValue: scrollNewsletter > newsletterHeight - innerHeight*.2 ? newsletterHeight - innerHeight*.2 : scrollNewsletter })}
      style="{scrollNewsletter > newsletterHeight - innerHeight*.2 ? `margin-top: -${newsletterHeight - innerHeight*.2}px` : `margin-top: -${scrollNewsletter}px;`}"
      >
        <button class="font-s" id="newsletterSwitch" onclick={(e) => newsletterOpen = !newsletterOpen}>X</button>
        <div id="mc_embed_shell">
          <div id="mc_embed_signup">
              <form action="https://campobaseproject.us22.list-manage.com/subscribe/post?u=aec20ff3ba0eeaac6f77c7e2d&amp;id=3fb762fadd&amp;f_id=00b7d1e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self" novalidate="">
                  <div id="mc_embed_signup_scroll"><h4>Newsletter</h4>
                      <div class="mc-field-group">
                        <label for="mce-EMAIL" class="font-xs">Email<span class="asterisk">*</span></label>
                        <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="" placeholder="email@example.com">
                      </div>
                      <div class="mc-field-group">
                        <label for="mce-FNAME" class="font-xs">Nome</label><input type="text" name="FNAME" class=" text" id="mce-FNAME" value="" placeholder="Nomen">
                      </div>
                      <div class="mc-field-group last">
                        <label for="mce-LNAME" class="font-xs">Cognome</label><input type="text" name="LNAME" class=" text" id="mce-LNAME" value="" placeholder="Nescio">
                      </div>
                  <div id="mce-responses" class="clear foot">
                      <div class="response" id="mce-error-response" style="display: none;"></div>
                      <div class="response" id="mce-success-response" style="display: none;"></div>
                  </div>
              <div aria-hidden="true" style="position: absolute; left: -5000px;">
                  /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
                  <input type="text" name="b_aec20ff3ba0eeaac6f77c7e2d_3fb762fadd" tabindex="-1" value="">
              </div>
                  <div class="optionalParent">
                      <div class="clear foot">
                          <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button font-xs submit" value="Submit">
                      </div>
                  </div>
              </div>
          </form>
          </div>
        </div>
      </div>
    {/if}

<style>
@-webkit-keyframes leftLoad {
  0% {
    left: -100vw;
  }
  100% {
    left: 0;
  }
}
@keyframes leftLoad {
  0% {
    left: -100vw;
  }
  100% {
    left: 0;
  }
}
@-webkit-keyframes leftUnload {
  0% {
    left: 0;
  }
  100% {
    left: 100vw;
  }
}
@keyframes leftUnload {
  0% {
    left: 0;
  }
  100% {
    left: 100vw;
  }
}
@-webkit-keyframes topLoad {
  0% {
    top: 100vh;
  }
  100% {
    top: 0;
  }
}
@keyframes topLoad {
  0% {
    top: 100vh;
  }
  100% {
    top: 0;
  }
}
@-webkit-keyframes topUnload {
  0% {
    top: 0;
  }
  100% {
    top: -100vh;
  }
}
@keyframes topUnload {
  0% {
    top: 0;
  }
  100% {
    top: -100vh;
  }
}
#loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  border-left: solid 1px #000;
  border-right: solid 1px #000;
  -webkit-animation: leftLoad 300ms forwards, leftUnload 300ms forwards 600ms;
          animation: leftLoad 300ms forwards, leftUnload 300ms forwards 600ms;
  -webkit-transition: background-color ease-in-out 500ms;
  -o-transition: background-color ease-in-out 500ms;
  transition: background-color ease-in-out 500ms;
  -webkit-transition-delay: 1000ms;
       -o-transition-delay: 1000ms;
          transition-delay: 1000ms;
}
#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: var(--primaryColor);
  /* transition: background-color ease-in-out 100ms; */
  /* transition-delay: 300ms; */
}
@media screen and (max-width: 1080px) {
  #loader {
    -webkit-animation: topLoad 300ms forwards, topUnload 300ms forwards 600ms;
            animation: topLoad 300ms forwards, topUnload 300ms forwards 600ms;
  }
}

/* Menu */
#menuSwitch {
  position: fixed;
  top: 1em;
  left: var(--gutter);
  padding: inherit;
  font-size: inherit;
  font-family: inherit;
  background-color: inherit;
  border: inherit;
  cursor: pointer;
  z-index: 5;
}
#menu {
  position: fixed;
  top: 0;
  left: 0;
  -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
          transform: translateX(-100%);
  -webkit-transition: all ease-in-out 600ms;
  -o-transition: all ease-in-out 600ms;
  transition: all ease-in-out 600ms;
  height: 100vh;
  height: fill-available;
  background-color: var(--primaryColor);
  width: 35vw;
  border-right: solid 1px #000;
  margin: 0;
  padding: 3.5em var(--gutter);
  text-align: left;
  overflow-y: scroll;
  z-index: 5;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#menu::-webkit-scrollbar {
  display: none;
}
#menu.open {
  -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
          transform: translateX(0);
}
.menu-item {
  list-style: none;
}
.menu-item a {
  display: block;
  padding: .625em 0;
  border-top: solid 1px #000;
}
.menu-item a.active {
  color: var(--secondaryColor);
}
.menu-item.last a {
  border-bottom: solid 1px #000;
}
@media screen and (max-width: 1080px) {
  #menu {
    height: auto;
    width: 70vw;
    border-bottom: solid 1px #000;
    padding: 3em var(--gutter) 6em;
  }
}
#langSwitch {
  position: fixed;
  right: var(--gutter);
  top: 1em;
  z-index: 4;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.lang-item {
  padding: inherit;
  font-family: inherit;
  background-color: inherit;
  border: inherit;
  cursor: pointer;
  text-transform: uppercase;
}
.lang-item.active {
  text-decoration: underline;
  text-underline-offset: .15em;
  text-decoration-thickness: 1px;
}

/* Newsletter */
#newsletterSwitch {
  margin-bottom: 1em;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  background-color: inherit;
  border: none;
  cursor: pointer;
}
#newsletter {
  position: fixed;
  top: 70vh;
  right: var(--gutter);
  width: 35vw;
  height: auto;
  background-color: #FF6B6B;
  border: solid 1px #000;
  padding: 1em var(--gutter);
  text-align: left;
  z-index: 4;
}
h4 {
  margin-bottom: 1em;
}
.mc-field-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: .3em 0;
  gap: .5em;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  border-top: solid 1px #000;
  overflow: hidden;
}
.mc-field-group.last {
  border-bottom: solid 1px #000;
}
.mc-field-group input {
  background-color: unset;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  overflow: hidden;
}
input::-webkit-input-placeholder {
  color: inherit;
  opacity: .4;
}
input::-moz-placeholder {
  color: inherit;
  opacity: .4;
}
input:-ms-input-placeholder {
  color: inherit;
  opacity: .4;
}
input::-ms-input-placeholder {
  color: inherit;
  opacity: .4;
}
input::placeholder {
  color: inherit;
  opacity: .4;
}
.submit {
  display: block;
  padding: 0;
  font-family: inherit;
  background-color: inherit;
  border: none;
  cursor: pointer;
  margin-top: 1em;
  margin-left: auto;
}
#newsletterSwitch:hover,
.submit:hover {
  color: #000;
  opacity: .4;
}
@media screen and (max-width: 1080px) {
  #newsletter {
    right: 0;
    top: unset;
    bottom: var(--gutter);
    margin: 0 var(--gutter);
    width: -moz-available;
    width: -webkit-fill-available;
    width: fill-available;
  }
}

/* Header */
header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  z-index: 5;
  position: fixed;
  top: 0;
  width: 100%;
}
#logo {
  width: 2.4em;
  margin-top: 1.2em;
}
#logo svg {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  fill: "#000";
}
#logo:hover svg {
  fill: var(--secondaryColor);
}

/* Main */
main {
  width: 67.708%;
  margin-left: 16.146%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  min-height: calc(100vh - 7.7*.7rem);
}
@media screen and (max-width: 1080px) {
  main {
    width: calc(100vw - 64px);
    margin-left: 32px;
  }
}

/* Footer */
footer {
  margin-top: 5em;
  margin-bottom: 1.5em;
}
</style>