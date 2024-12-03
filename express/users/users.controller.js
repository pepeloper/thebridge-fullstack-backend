import UsersService from "./users.service.js"

const UsersController = {
  register: async (req, res) => {
    try {
      const newUser = await UsersService.registerUser(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      if (error.message === "Email already registered") {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default UsersController