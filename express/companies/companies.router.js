import { Router } from "express"
import CompaniesController from "./companies.controller.js"

const router = Router()

router.get("/", CompaniesController.getAllCompanies)
router.get("/:id", CompaniesController.getCompanyById)
router.post("/", CompaniesController.createCompany)
router.put("/:id", CompaniesController.updateCompany)
router.delete("/:id", CompaniesController.deleteCompany)

export default router