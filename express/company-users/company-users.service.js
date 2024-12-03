import CompanyUsersRepository from "./company-users.repository.js"

const CompanyUsersService = {
  assignUserToCompany: async (userId, companyId) => {
    return CompanyUsersRepository.create({ user_id: userId, company_id: companyId })
  }
}

export default CompanyUsersService