import express from "express"
import eventsRouter from "./events/events.router.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Bienvenido a mi API")
})

router.use("/events", eventsRouter)

export default router