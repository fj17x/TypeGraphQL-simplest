export async function load({ fetch }) {
  const internsQuery = `
        interns{
        time_working
        id
        name
        }
    `

  const graphQuery = `
    query {
        ${internsQuery}
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
  //   console.log("answer: ", answer)
  return answer
}
