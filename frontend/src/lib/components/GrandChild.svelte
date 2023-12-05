<script>
  import { getContext } from "svelte"

  export let simpleStory
  const { story } = getContext("memoir")
</script>

<h6>This is the grandchild.</h6>
<p>{story}</p>

<pre>{simpleStory}</pre>
