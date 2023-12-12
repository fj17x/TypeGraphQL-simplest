<script>
  let loggedIn = false
  async function valToken() {
    if (typeof window !== "undefined") {
      //dont use localstorage, susceptible to XSS.
      const token = localStorage.getItem("jwtToken")
      const response = await fetch("http://localhost:4000/auth/valTokenLocalS", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const answer = await response.json()
        console.log(answer)
        loggedIn = true
        return answer.userId
      } else {
        throw new Error("Sorry please login first.")
      }
    }
  }
</script>

<!--Notice i have done valToken() which is a promise-->
{#await valToken()}
  <h1>Waiting....</h1>
{:then result}
  <div>
    <h5 class="bg-success">You are logged in!</h5>
    <h6>Your're User ID is:{result}</h6>
  </div>
{:catch error}
  <h4 class="bg-danger">Your're not logged in!</h4>
  <h1>{error}</h1>
{/await}
