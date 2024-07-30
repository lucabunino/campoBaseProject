<script>
// Import data
const { data } = $props()

// Import from svelte/lib
import { urlFor } from "$lib/utils/image.js";
import { slide } from "svelte/transition";
import { formatDate } from "$lib/utils/date.js";

// Import stores
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
    {#if project[1].length === 1}
      <a class="project" href={project[1][0]._type === 'event' ? '/events/' + project[1][0].slug.current : '/festivals/' + project[1][0].slug.current}><h3>{project[1][0].title}</h3></a>
    {:else}
      <div class="project" data-project={i}>
        <h3 onkeyup={(e) => toggleProject(i)} onclick={(e) => toggleProject(i, e)}>{project[0]}</h3>
          {#each project[1] as item, j}
              {#if item.externalUrl}
                {#if openProject === i}
                  <a class="project-item font-m" href={item.externalUrl} target="_blank"
                  transition:slide={{ duration: 500 }}>
                    <img src={urlFor(item.cover).width(800)} alt="">
                    <div class="project-item-text">
                      <p class="font-s">{formatDate(item.start, item.end)}</p>
                      <h2>{item.title}{#if item.subtitle}<br>{item.subtitle}{/if}</h2>
                    </div>
                  </a>
                {/if}
              {:else}
                {#if openProject === i}
                  <a class="project-item font-m" href={item._type === 'event' ? '/events/' + item.slug.current : '/festivals/' + item.slug.current}
                  transition:slide={{ duration: 500 }}
                  >
                    <img src={urlFor(item.cover).width(800)} alt="">
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
    {/if}
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
h3, .project-item {
  display: block;
  cursor: pointer;
  padding: .3em 0;
  width: 100%;
  border-bottom: solid 1px #000;
}
h3:hover {
  color: var(--secondaryColor);
}
.project {
  display: block;
}
.project.open {
  height: auto;
}
.project-item {
  display: grid;
  grid-template-columns: 15vw auto;
  border-bottom: solid 1px #000;
  gap: .4em;
  text-align: left;
  padding: .6em 0;
}
.project-item+.project-item {
  border-top: solid 1px #000;
}
.project-item h2 {
  margin-top: auto;
}
.project-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
}
.project-item-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
@media screen and (max-width: 1080px) {
  .project-item {
    grid-template-columns: calc(100px + 12vw) auto;
  }
}
</style>