import CompaniesRepository from "./companies.repository.js"

const CompaniesService = {
  getAllCompanies: async (filters) => {
    return CompaniesRepository.findAll(filters)
  },

  getCompanyById: async (id) => {
    return CompaniesRepository.findById(id)
  },

  createCompany: async (companyData) => {
    return CompaniesRepository.create(companyData)
  },

  updateCompany: async (id, companyData) => {
    return CompaniesRepository.update(id, companyData)
  },

  deleteCompany: async (id) => {
    return CompaniesRepository.delete(id)
  }
}

export default CompaniesService