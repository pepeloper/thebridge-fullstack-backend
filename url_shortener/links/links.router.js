import { Router } from 'express'
import { linkController } from './links.controller.js'
import { validateCreateLink } from '../middleware/links.middleware.js'

const linksRouter = Router()

linksRouter.post("/", validateCreateLink, linkController.create)
linksRouter.get("/", linkController.list)

export { linksRouter }