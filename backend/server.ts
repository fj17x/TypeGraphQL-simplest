import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import AllResolver from "./resolvers/resolver.js"
import { connectToDB } from "./utils/db.js"
import authRouter from "./controllers/authRouter.js"
import logger from "morgan"
import cors from "cors"

// import { jwt } from "jsonwebtoken"

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

    app.use(
      express.urlencoded({
        extended: false,
      })
    )
    app.use(express.json())
    app.use(logger("dev"))
    app.use(cors({ origin: true, credentials: true }))

    app.use("/auth", authRouter)

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/graphql`)
    })

    server.applyMiddleware({ app })
  } catch (err) {
    console.log("err: ", err)
  }
}

main()
