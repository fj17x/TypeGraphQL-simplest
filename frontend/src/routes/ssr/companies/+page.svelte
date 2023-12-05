<script>
  export let data
  $: info = data
</script>

<div class="container bg-warning">
  {#if info.data}
    {#if info.data.companies}
      <h2>Company:</h2>
      {#each info.data.companies as company}
        <p>{company?.id ?? "<span> This is the id. </span>"}</p>
        <p>{company?.name ?? " "}</p>
        <hr />
      {/each}
    {/if}
  {/if}
</div>
