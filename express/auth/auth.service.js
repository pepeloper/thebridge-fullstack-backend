import AuthRepository from './auth.repository.js';

const generateFakeToken = (userId) => {
  return `token_${userId}_${Date.now()}`;
};

const AuthService = {
  register: async (userData) => {
    const existingUser = await AuthRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user = await AuthRepository.create(userData);
    const token = generateFakeToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
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

    const token = generateFakeToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  },
};

export default AuthService;