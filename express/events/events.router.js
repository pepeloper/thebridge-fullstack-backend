import express from "express"
import EventsController from "./events.controller.js"
import validateCreateEvent from "./validators/createEvent.validator.js"
import validateEventId from "./validators/eventId.validator.js"
import validateUpdateEvent from "./validators/updateEvent.validator.js"

const router = express.Router()

router.get("/", EventsController.index)
router.get("/:id", validateEventId, EventsController.show)
router.post("/", validateCreateEvent, EventsController.create)
router.put("/:id", validateEventId, validateUpdateEvent, EventsController.update)
router.delete("/:id", validateEventId, EventsController.delete)

export default router