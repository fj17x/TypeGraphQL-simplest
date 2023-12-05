<script>
  export let data
  $: info = data
</script>

<div class="container bg-warning">
  {#if info.data}
    {#if info.data.interns}
      <h2>Interns:</h2>
      {#each info.data.interns as intern}
        <p>{intern?.name ?? " "}</p>
        <p>{intern?.time_working ?? " "}</p>
        <p>{intern?.id ?? " "}</p>
        <hr />
      {/each}
    {/if}
  {/if}
</div>
