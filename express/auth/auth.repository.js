import userModel from '../users/users.model.js';

const AuthRepository = {
  findByEmail: async (email) => {
    return userModel.findOne({ email, });
  },

  create: async (userData) => {
    return userModel.create(userData);
  },
};

export default AuthRepository;