import { Router } from "express"
import CompaniesController from "./companies.controller.js"

const router = Router()

router.get("/", CompaniesController.index)
router.get("/:id", CompaniesController.show)
router.post("/", CompaniesController.create)
router.put("/:id", CompaniesController.update)
router.delete("/:id", CompaniesController.delete)

export default router