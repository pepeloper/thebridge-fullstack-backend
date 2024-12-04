import CompaniesService from "./companies.service.js"

const CompaniesController = {
  index: async (req, res) => {
    try {
      const companies = await CompaniesService.getAll()
      res.json(companies)
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  },

  show: async (req, res) => {
    try {
      const company = await CompaniesService.getById(req.params.id)
      res.json(company)
    } catch (error) {
      if (error.message === "Company not found") {
        return res.status(404).json({ message: "Company not found" })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  },

  create: async (req, res) => {
    try {
      const newCompany = await CompaniesService.create(req.body)
      res.status(201).json(newCompany)
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  },

  update: async (req, res) => {
    try {
      const updatedCompany = await CompaniesService.update(req.params.id, req.body)
      res.json(updatedCompany)
    } catch (error) {
      if (error.message === "Company not found") {
        return res.status(404).json({ message: "Company not found" })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  },

  delete: async (req, res) => {
    try {
      await CompaniesService.delete(req.params.id)
      res.status(204).send()
    } catch (error) {
      if (error.message === "Company not found") {
        return res.status(404).json({ message: "Company not found" })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default CompaniesController