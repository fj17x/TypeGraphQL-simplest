import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const authRouter = express.Router()

authRouter.post("/genTokenCookie", (req, res, next) => {
  let userId = req.body.userValue
  console.log("req.body: ", req.body)
  let jwtSecretKey = process.env.JWT_SECRET_KEY ?? "CHICKEN"
  let data = {
    time: Date(),
    userId: userId,
  }
  let token
  token = jwtSecretKey
    ? jwt.sign(data, jwtSecretKey, { expiresIn: "18000000" })
    : res.status(400).send({ message: "JWTSECRETKEY EMPTY" })

  res.cookie("jwtToken", token, {
    httpOnly: true, //So JS cannot access it in the front-end
    // maxAge: 18000000, //this is in milliseconds
  })

  res.send({ message: "Secure cookie set, expiring in 30 mins." + token })
})

authRouter.get("/valTokenCookie", (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY ?? "CHICKEN"

  let token = req.headers?.cookie
  let tokenFound
  ///TODO REMOVE TOKEN PROPERLY
  if (token) {
    tokenFound = token.match(/jwtToken=([\w\.?\-?]+)/)
    console.log("Full token", token)
  }
  if (tokenFound && tokenFound[1] && jwtSecretKey) {
    try {
      console.log("tokenfound: ", tokenFound[1])
      const decoded = jwt.verify(tokenFound[1], jwtSecretKey)
      if (typeof decoded != "string") {
        console.log("decoded: ", decoded)
        return res.status(200).send({ message: "success", userId: decoded.userId })
      } else {
        // Access Denied
        return res.status(401).send({ message: "This is an error!" })
      }
    } catch (error) {
      // Access Denied
      return res.status(401).send({ message: "This is an error!" + error })
    }
  }
  return res.status(401).send({ message: "This is an error!" })
})

authRouter.post("/genTokenLocalS", (req, res, next) => {
  let userId = req.body.userValue
  console.log("req.body: ", req.body)
  let jwtSecretKey = process.env.JWT_SECRET_KEY ?? "CHICKEN"
  let data = {
    time: Date(),
    userId: userId,
  }
  let token
  token = jwtSecretKey
    ? jwt.sign(data, jwtSecretKey, { expiresIn: "1800s" })
    : res.status(400).send({ message: "JWTSECRETKEY EMPTY" })
  res.send({ token })
})

authRouter.get("/valTokenLocalS", (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY ?? "CHICKEN"
  let token = req.header("Authorization")
  if (token && jwtSecretKey) {
    token = token.split(" ")[1]
    console.log("token: ", token)
    try {
      const decoded = jwt.verify(token, jwtSecretKey)
      if (typeof decoded != "string") {
        console.log("decoded: ", decoded)
        return res.status(200).send({ message: "success", userId: decoded.userId })
      } else {
        // Access Denied
        return res.status(401).send({ message: "This is an error!" })
      }
    } catch (error) {
      // Access Denied
      return res.status(401).send({ message: "This is an error!" + error })
    }
  }
  return res.status(401).send({ message: "This is an error!" })
})

export default authRouter
