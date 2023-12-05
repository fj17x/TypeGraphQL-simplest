<script>
  export let peanuts = "Default"
  export let simpleStory
  import GrandChild from "./GrandChild.svelte"
</script>

<h1>Hello {peanuts}</h1>
<GrandChild {simpleStory} />
