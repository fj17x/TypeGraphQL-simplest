<script>
  import { createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()

  function hello() {
    dispatch("message", {
      text: "Hello!",
    })
  }
</script>
