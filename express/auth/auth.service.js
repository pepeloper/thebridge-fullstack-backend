import AuthRepository from './auth.repository.js';
import CompaniesService from '../companies/companies.service.js';
import CompanyUsersService from '../company-users/company-users.service.js';

const generateFakeToken = (userId) => {
  return `token_${userId}_${Date.now()}`;
};

const AuthService = {
  register: async (userData) => {
    const existingUser = await AuthRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const company = await CompaniesService.create(userData.company);
    const user = await AuthRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    await CompanyUsersService.create({
      user_id: user._id,
      company_id: company._id,
    });

    const token = generateFakeToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: {
          id: company._id,
          name: company.name,
        },
      },
      token,
    };
  },

  login: async (credentials) => {
    const user = await AuthRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await user.comparePassword(credentials.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const companyUsers = await CompanyUsersService.findByUserId(user._id);
    const token = generateFakeToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        companies: companyUsers.map((cu) => ({
          id: cu.company_id._id,
          name: cu.company_id.name,
        })),
      },
      token,
    };
  },
};

export default AuthService;