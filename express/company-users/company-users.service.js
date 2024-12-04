import CompanyUsersRepository from './company-users.repository.js';

const CompanyUsersService = {
  create: async (companyUserData) => {
    return CompanyUsersRepository.create(companyUserData);
  },

  findByUserId: async (userId) => {
    return CompanyUsersRepository.findByUserId(userId);
  },
};

export default CompanyUsersService;