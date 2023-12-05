<script>
  import Child from "$lib/components/Child.svelte"
  import { setContext } from "svelte"

  const story = "The year was 1917. It was a long and windy day."
  setContext("memoir", {
    story,
  })
</script>

<Child peanuts="Thomas" simpleStory={story}></Child>
