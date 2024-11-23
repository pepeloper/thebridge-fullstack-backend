import express from "express"
import EventsController from "./events.controller.js"

const router = express.Router()

router.get("/", EventsController.index)
router.get("/:id", EventsController.show)
router.post("/", EventsController.create)
router.put("/:id", EventsController.update)
router.delete("/:id", EventsController.delete)

export default router