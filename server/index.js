// cSpell:disable
import colors from "colors"
import cors from "cors"
import * as dotenv from "dotenv"
import express from "express"

import connectDB from "./mongodb/connect.js"
import dalleRoutes from "./routes/dalleRoutes.js"
import postRoutes from "./routes/postRoutes.js"

dotenv.config()

// CONFIGURATION
const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))

// ROUTES
app.use("/api/v1/dalle", dalleRoutes)
app.use("/api/v1/post", postRoutes)

// TEST ROUTE
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E 2 index",
  })
})

// INITIALIZE SERVER
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(port, () =>
      console.log(
        colors.cyan.bold.underline.italic(
          `Connected on http://localhost:${port}`
        )
      )
    )
  } catch (error) {
    console.log(error)
  }
}

startServer()
