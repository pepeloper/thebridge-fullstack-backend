import CompaniesRepository from "./companies.repository.js"

const CompaniesService = {
  getAll: () => {
    try {
      return CompaniesRepository.findAll()
    } catch (error) {
      throw new Error("Error fetching companies")
    }
  },

  getById: (id) => {
    const company = CompaniesRepository.findById(id)
    if (!company) {
      throw new Error("Company not found")
    }
    return company
  },

  create: (companyData) => {
    return CompaniesRepository.create(companyData)
  },

  update: (id, companyData) => {
    const updatedCompany = CompaniesRepository.update(id, companyData)
    if (!updatedCompany) {
      throw new Error("Company not found")
    }
    return updatedCompany
  },

  delete: (id) => {
    const result = CompaniesRepository.delete(id)
    if (!result) {
      throw new Error("Company not found")
    }
  }
}

export default CompaniesService