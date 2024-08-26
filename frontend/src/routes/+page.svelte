<script>
// Import data
const { data } = $props()

// Import from svelte/lib
import { urlFor } from "$lib/utils/image.js";
import { formatDate, formatTime } from "$lib/utils/date.js";

// Import stores
import { getLang } from '$lib/stores/lang.svelte.js';
const langer = getLang();
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#3873D1');
colorer.changeSecondaryColor('#CCBFAA');

// Variables
let h1Height = $state()
let innerWidth = $state()
</script>

<svelte:window bind:innerWidth/>

<h1 bind:clientHeight={h1Height}>{data.homepage[0].title}</h1>
<section>
  {#each  data.homepage[0].whatsOn as item, i}
    <div class="item">
      <a href={item._type === 'event' ? '/events/' + item.slug.current : '/festivals/' + item.slug.current}>
        {#if item.cover}
          <img class="cover" src={urlFor(item.cover).width(innerWidth > 1080 ? 1280 : 800)} alt="">
        {:else}
          <p class="cover">Missing image</p>
        {/if}
        <h2>{item.title}{item.subtitle ? ' ' + item.subtitle : ''}</h2>
      </a>
      <div id="info">
        {#if item._type == 'event' && item.start}
          <p class="datetime font-s">{formatDate(item.start, item.end)}{#if !item.time}<br>{formatTime(item.start, item.end)}{/if}</p>
        {:else if item.days}
          <p class="datetime font-s">{formatDate(item.days[0].date, item.days[item.days.length - 1].date)}</p>
        {/if}
        {#if item.location}<a class="place font-s" href={item.googleMaps} target="_blank">@{item.location}</a>{/if}
        {#if item.project.description}
          <p class="project-description font-s">{item.project.description[langer.lang ? langer.lang : 'it']}</p>
        {/if}
        {#if item.price}
          <div class="price">
            <p class="price-value font-s">{#if langer.lang === 'it'}{@html 'Prezzo '}{:else}{@html 'Price '}{/if}{item.price.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} euro</p>
            {#if item.buyUrl}
              <a class="price-url font-xs" href={item.buyUrl} target="_blank">{#if langer.lang === 'it'}Acquista qui{:else}Buy here{/if}</a>
            {:else if item.reservationUrl}
              <a class="price-url font-xs" href={item.reservationUrl} target="_blank">{#if langer.lang === 'it'}Iscriviti qui{:else}Subscribe here{/if}</a>
            {/if}
          </div>
        {:else}
          <div class="price">
            {#if item.freeOffer}
              <p class="price-value font-s">{#if langer.lang === 'it'}Offerta libera{:else}Free offer{/if}{#if item.reservationUrl}{@html ' previa iscrizione'}{/if}</p>
            {:else}
              <p class="price-value font-s">{#if langer.lang === 'it'}Evento gratuito{:else}Free event{/if}{#if item.reservationUrl}{@html ' previa iscrizione'}{/if}</p>
            {/if}
            {#if item.reservationUrl}<a class="price-url font-xs" href={item.reservationUrl}>{#if langer.lang === 'it'}Iscriviti qui{:else}Subscribe here{/if}</a>{/if}
          </div>
        {/if}
      </div>
      {#if item.content}
        <div id="content">
          <PortableText
          value={item.content}
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
    </div>
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
  width: 100%;
}

/* Content */
.item {
  margin-bottom: 1.2em;
  border-bottom: solid 1px #000;
}
a {
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
}
h2 {
  padding: .3em 0;
  border-top: solid 1px #000;
  width: 100%;
}
.cover {
  width: 50%;
  height: auto;
  aspect-ratio: 1;
  -o-object-fit: contain;
     object-fit: contain;
  padding-bottom: .5em;
}
p.cover {
  background-color: #EEE;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
#info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: .3em 0;
  border-top: solid 1px #000;
}
.datetime {
  text-align: left;
}
.place {
  text-align: right;
}
.project-description {
  display: block;
  padding: 2em 0;
}
.price {
  -ms-flex-preferred-size: 100%;
      flex-basis: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: baseline;
      -ms-flex-align: baseline;
          align-items: baseline;
}
.price-value {
  text-align: left;
}
.price-url {
  text-align: right;
}
@media screen and (max-width: 1080px) {
  .cover {
    width: 100%;
  }
}
</style>