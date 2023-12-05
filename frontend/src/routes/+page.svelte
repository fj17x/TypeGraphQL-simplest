<script>
  let yesIntern = false
  let yesInternTime = false
  let yesInternId = false
  let yesInternName = false
  let yesInternCompany = false

  let yesCompany = false
  let yesCompanyId = false
  let yesCompanyName = false
  $: answer = {}

  async function callAPI() {
    const internsQuery = yesIntern
      ? `
        interns{
            ${yesInternTime ? "time_working" : ""}
            ${yesInternId ? "id" : ""}
            ${yesInternName ? "name" : ""}
        }
    `
      : ""

    const companyQuery = yesCompany
      ? `
    companies{
        ${yesCompanyId ? "id" : ""}
        ${yesCompanyName ? "name" : ""}
        }
    `
      : ""

    const graphQuery = `
    query {
        ${internsQuery}
        ${companyQuery}
    }
    `

    console.log("graphQuery: ", graphQuery)

    const response = await fetch("http://localhost:4000/graphql", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphQuery,
      }),
      method: "POST",
    })

    answer = await response.json()
    console.log("answer: ", answer)
  }
</script>

<div class=" container d-flex justify-content-center align-items-center flex-column">
  <div>
    <h4>You can visit /ssr/companies or /ssr/interns to view ssr in action.</h4>
  </div>
  <div class="container bg-danger">
    <form on:submit|preventDefault={callAPI}>
      <div class="form-group pb-1">
        <label for="intern">Intern:</label>
        <input
          placeholder="Enter email"
          bind:checked={yesIntern}
          class="form-check-input"
          type="checkbox"
          id="interns"
          name="interns"
          value="interns"
        />
        <br />
        {#if yesIntern}
          <div class="bg-secondary">
            <label for="internId">Intern ID:</label>
            <input
              bind:checked={yesInternId}
              class="form-check-input"
              type="checkbox"
              id="internId"
              name="internId"
              value="internId"
            /> <br />

            <label for="internName">Intern Name:</label>
            <input
              bind:checked={yesInternName}
              class="form-check-input"
              type="checkbox"
              id="internName"
              name="internName"
              value="internName"
            /> <br />

            <label for="internTime">Intern Time:</label>
            <input
              bind:checked={yesInternTime}
              class="form-check-input"
              type="checkbox"
              id="internTime"
              name="internTime"
              value="internTime"
            /> <br />

            <label for="internCompany">Intern Company:</label>
            <input
              bind:checked={yesInternCompany}
              class="form-check-input"
              type="checkbox"
              id="internCompany"
              name="internCompany"
              value="internCompany"
            />
          </div>
        {/if}
      </div>
      <br />

      <div class="form- pb-1">
        <label for="company">Company:</label>
        <input bind:checked={yesCompany} class="form-check-input" type="checkbox" id="company" name="company" value="company" />
        {#if yesCompany}
          <div class="bg-secondary">
            <label for="companyId">Company ID:</label>
            <input
              bind:checked={yesCompanyId}
              class="form-check-input"
              type="checkbox"
              id="companyId"
              name="companyId"
              value="companyId"
            /> <br />

            <label for="companyName">Company Name:</label>
            <input
              bind:checked={yesCompanyName}
              class="form-check-input"
              type="checkbox"
              id="companyName"
              name="companyName"
              value="companyName"
            />
          </div>
        {/if}
      </div>
      <div class="form-group pb-3">
        <input class="btn btn-primary" type="submit" />
        <input
          class="btn btn-danger"
          type="reset"
          on:click={() => {
            yesIntern = false
            yesCompany = false
          }}
        />
      </div>
    </form>
  </div>
  <br />
  <div class="container bg-warning">
    {#if answer.data}
      {#if answer.data.interns}
        <h2>Interns:</h2>
        {#each answer.data.interns as intern}
          <p>{intern?.name ?? " "}</p>
          <p>{intern?.time_working ?? " "}</p>
          <p>{intern?.id ?? " "}</p>
        {/each}
      {/if}
      {#if answer.data.companies}
        <h2>Company:</h2>
        {#each answer.data.companies as company}
          <p>{company?.id ?? " "}</p>
          <p>{company?.name ?? " "}</p>
        {/each}
      {/if}
    {/if}
  </div>
</div>
