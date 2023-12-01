import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import AllResolver from "./resolvers/resolver.js"
import { connectToDB } from "./utils/db.js"

const main = async () => {
  try {
    await connectToDB()
    const app = express()
    const schema = await buildSchema({
      resolvers: [AllResolver],
      validate: false,
    })
    const server = new ApolloServer({ schema })
    await server.start()

    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/graphql`)
    })
    server.applyMiddleware({ app })
  } catch (err) {
    console.log("err: ", err)
  }
}

main()
