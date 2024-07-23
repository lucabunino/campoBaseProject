<script>
// Import data
const { data } = $props()

// Import from svelte/lib
import Wysiwyg from '$lib/components/Wysiwyg.svelte'
</script>

<h1>{data.about[0].title}</h1>
<Wysiwyg blocks={data.about[0].about}/>