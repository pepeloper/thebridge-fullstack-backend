import UsersRepository from './users.repository.js';
import CompanyUsersService from '../company-users/company-users.service.js';

const UsersService = {
  registerUser: async (userData) => {
    const existingUser = await UsersRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    const newUser = await UsersRepository.create(userData);

    if (userData.company_id) {
      await CompanyUsersService.assignUserToCompany(newUser._id, userData.company_id);
    }

    return newUser;
  },
};

export default UsersService;