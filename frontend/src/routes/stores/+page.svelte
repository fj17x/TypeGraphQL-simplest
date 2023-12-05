<script>
  import { itemsInCart, cartContents, totalPrice } from "$lib/stores.js"
  import Item from "$lib/components/Item.svelte"
  let inventory = ["apples", "orange", "berries", "flour"]
</script>

<main>
  <div>
    {#each inventory as item}
      <Item {item} class="items" />
    {/each}
    <p>There are {$itemsInCart} items in your cart.</p>
    <p>Cart total: ${$totalPrice}</p>
    <p>Cart contents:</p>

    <ol>
      {#each $cartContents as item}
        <li>{item}</li>
      {/each}
    </ol>
  </div>
</main>

<style>
  /* .items {
    display: flex;
    flex-direction: row;
  } */
</style>
