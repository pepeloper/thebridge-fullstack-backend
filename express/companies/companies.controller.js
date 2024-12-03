import CompaniesService from "./companies.service.js"

const CompaniesController = {
  getAllCompanies: async (req, res) => {
    const companies = await CompaniesService.getAllCompanies(req.query)
    res.json(companies)
  },

  getCompanyById: async (req, res) => {
    const company = await CompaniesService.getCompanyById(req.params.id)
    if (!company) {
      return res.status(404).json({ message: "Company not found" })
    }
    res.json(company)
  },

  createCompany: async (req, res) => {
    const newCompany = await CompaniesService.createCompany(req.body)
    res.status(201).json(newCompany)
  },

  updateCompany: async (req, res) => {
    const updatedCompany = await CompaniesService.updateCompany(req.params.id, req.body)
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" })
    }
    res.json(updatedCompany)
  },

  deleteCompany: async (req, res) => {
    const result = await CompaniesService.deleteCompany(req.params.id)
    if (!result) {
      return res.status(404).json({ message: "Company not found" })
    }
    res.status(204).send()
  }
}

export default CompaniesController