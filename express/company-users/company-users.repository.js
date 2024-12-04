import companyUserModel from './company-users.model.js';
import mongoose from 'mongoose';

const CompanyUsersRepository = {
  create: async (data) => {
    return companyUserModel.create(data);
  },

  findByCompanyId: async (companyId) => {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return [];
    }
    return companyUserModel.find({ company_id: companyId, })
      .populate('user_id', '-password')
      .lean();
  },

  findByUserId: async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return [];
    }
    return companyUserModel.find({ user_id: userId, })
      .populate('user_id', '-password')
      .populate('company_id')
      .lean();
  },
};

export default CompanyUsersRepository;