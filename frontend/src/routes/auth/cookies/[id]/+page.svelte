<script>
  import { page } from "$app/stores"
  let userValue
  async function genToken() {
    if (userValue) {
      const response = await fetch("http://localhost:4000/auth/genTokenCookie", {
        method: "POST",
        body: JSON.stringify({ userValue }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const answer = await response.json()
      console.log("answer: ", answer)
    } else {
      alert("You are wrong.")
    }
  }
</script>

<div>
  <h4>Enter your ID:</h4>
  <input type="text" bind:value={userValue} placeholder={$page.params.id} />
  <h4>Generate token</h4>
  <button on:click={genToken}> Click to generate for this user.</button>
</div>
