export async function load({ fetch }) {
  const companyQuery = `
    companies{
        id 
        name
        }
    `

  const graphQuery = `
    query {
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

  const answer = await response.json()
  console.log("answer: ", answer)
  return answer
}
