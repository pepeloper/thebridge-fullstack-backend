import express from "express"
import eventsRouter from "./events/events.router.js"
import LandingController from "./landing/landing.controller.js"

const router = express.Router()

router.get("/", LandingController.welcome)
router.use("/events", eventsRouter)

export default router