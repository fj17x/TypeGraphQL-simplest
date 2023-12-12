<script>
  import { page } from "$app/stores"
  let userValue
  async function genToken() {
    if (userValue) {
      const response = await fetch("http://localhost:4000/auth/genTokenLocalS", {
        method: "POST",
        body: JSON.stringify({ userValue }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const token = await response.json()
      console.log("token: ", token)
      //dont use localstorage, susceptible to XSS.
      localStorage.setItem("jwtToken", token.token)
    } else {
      alert("You are wrong.")
    }
  }
  // console.log()
</script>

<div>
  <h4>Enter your ID:</h4>
  <input type="text" bind:value={userValue} placeholder={$page.params.id} />
  <h4>Generate token</h4>
  <button on:click={genToken}> Click to generate for this user.</button>
</div>
