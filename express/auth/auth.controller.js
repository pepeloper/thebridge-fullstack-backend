import AuthService from './auth.service.js';

const AuthController = {
  register: async (req, res) => {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'Email already registered') {
        return res.status(400).json({ message: error.message, });
      }
      res.status(500).json({ message: 'Internal server error', });
    }
  },

  login: async (req, res) => {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message, });
      }
      res.status(500).json({ message: 'Internal server error', });
    }
  },
};

export default AuthController;