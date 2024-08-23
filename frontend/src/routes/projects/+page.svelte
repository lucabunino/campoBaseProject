<script>
// Import data
const { data } = $props()
$inspect(data)

// Import from svelte/lib
import { urlFor } from "$lib/utils/image.js";
import { slide } from "svelte/transition";
import { formatDate } from "$lib/utils/date.js";

// Import stores
import { getLang } from '$lib/stores/lang.svelte.js';
const langer = getLang();
import { getColor } from '$lib/stores/color.svelte.js';
const colorer = getColor();
colorer.changePrimaryColor('#CC78FF');
colorer.changeSecondaryColor('#3873D1');

// Variables
let openProject = $state(undefined)
let scrollY = $state()

// Functions
function toggleProject(projectIndex, event) {
  if (openProject === projectIndex) {
    openProject = undefined
  } else {
    openProject = projectIndex
    // scrollY = scrollY + event.target.clientHeight;
  }
}
</script>

<svelte:window bind:scrollY></svelte:window>

<h1>Projects</h1>
<section>
  {#each data.projects as project, i}
    <!-- {#if project[2].length === 1}
      <a class="project single" href={project[2][0]._type === 'event' ? '/events/' + project[2][0].slug.current : '/festivals/' + project[2][0].slug.current}>
        <h3 class="project-title">{project[2][0].title}</h3>
      </a>
    {:else} -->
      <div class="project" data-project={i}>
        <button class="project-title font-l" onkeyup={(e) => toggleProject(i)} onclick={(e) => toggleProject(i, e)}>{project[0]}</button>
          {#if project[1] && openProject === i}
            <p transition:slide={{ duration: 500 }} class="project-description font-s">{project[1][langer.lang]}</p>
          {/if}
          <div class="project-expandable">
            {#each project[2] as item, j}
                {#if item.use}
                  {#if openProject === i}
                    <a class="project-item font-m" href={item.url} target="_blank"
                    transition:slide={{ duration: 500 }}>
                      <img src={urlFor(item.cover).width(innerWidth > 1080 ? 1280 : 800)} alt="">
                      <div class="project-item-text">
                        <p class="font-s">{formatDate(item.start, item.end)}</p>
                        <h2>{item.title}{#if item.subtitle}<br>{item.subtitle}{/if}</h2>
                      </div>
                    </a>
                  {/if}
                {:else}
                  {#if openProject === i && !item.displayAsSinglePage}
                    <a class="project-item font-m" href={item._type === 'event' ? '/events/' + item.slug.current : '/festivals/' + item.slug.current}
                    transition:slide={{ duration: 500 }}
                    >
                      <img src={urlFor(item.cover).width(innerWidth > 1080 ? 1280 : 800)} alt="">
                      <div class="project-item-text">
                        {#if item._type == 'event' && item.start}
                          <p class="font-s">{formatDate(item.start, item.end)}</p>
                        {:else if item.days}
                          <p class="font-s">{formatDate(item.days[0].date, item.days[item.days.length - 1].date)}</p>
                        {/if}
                        <h2>{item.title}{#if item.subtitle}<br>{item.subtitle}{/if}</h2>
                      </div>
                    </a>
                  {:else if openProject === i && item.displayAsSinglePage}
                    <a class="project-item font-m" href={'/projects/' + item.slug.current}
                    transition:slide={{ duration: 500 }}
                    >
                      <img src={urlFor(item.cover).width(innerWidth > 1080 ? 1280 : 800)} alt="">
                      <div class="project-item-text">
                        {#if item._type == 'event' && item.start}
                          <p class="font-s">{formatDate(item.start, item.end)}</p>
                        {:else if item.days}
                          <p class="font-s">{formatDate(item.days[0].date, item.days[item.days.length - 1].date)}</p>
                        {/if}
                        <h2>{item.title}{#if item.subtitle}<br>{item.subtitle}{/if}</h2>
                      </div>
                    </a>
                  {/if}
                {/if}
            {/each}
          </div>
      </div>
    <!-- {/if} -->
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
  border-top: solid 1px #000;
  /* margin-top: 5.86em; */
  width: 100%;
}

/* Content */
.project-title, .project-item {
  display: block;
  cursor: pointer;
  padding: .3em 0;
  width: 100%;
  font-family: inherit;
  background-color: inherit;
  border: none;
  overflow: hidden;
}
h3:hover {
  color: var(--secondaryColor);
}
.project {
  display: block;
}
.project.single {
  border-bottom: solid 1px #000;
}
.project-expandable {
  border-top: solid 1px #000;
}
.project-description {
  display: block;
  padding: 1em 0 .5em
}
.project-item {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 15vw .4em auto;
  grid-template-columns: 15vw auto;
  border-bottom: solid 1px #000;
  gap: .4em;
  text-align: left;
  padding: .6em 0;
}
.project-item h2 {
  margin-top: auto;
}
.project-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  -o-object-fit: contain;
     object-fit: contain;
}
.project-item-text {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
@media screen and (max-width: 1080px) {
  .project-item {
    -ms-grid-columns: calc(100px + 12vw) auto;
    grid-template-columns: calc(100px + 12vw) auto;
  }
}
</style>