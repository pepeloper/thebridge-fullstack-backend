import companyUserModel from './company-users.model.js';
import mongoose from 'mongoose';

const CompanyUsersRepository = {
  create: async (data) => {
    return companyUserModel.create(data);
  },

  findByCompany: async (companyId) => {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return [];
    }
    return companyUserModel.find({ company_id: companyId, })
      .populate('user_id', '-password')
      .lean();
  },

  findByUser: async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }
    return companyUserModel.find({ user_id: userId, })
      .populate('company_id')
      .lean();
  },
};

export default CompanyUsersRepository;