import userModel from "./users.model.js"
import mongoose from "mongoose"

const UsersRepository = {
  findAll: async () => {
    return userModel.find().lean()
  },

  findById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    return userModel.findById(id).lean()
  },

  findByEmail: async (email) => {
    return userModel.findOne({ email }).lean()
  },

  create: async (userData) => {
    const newUser = await userModel.create(userData)
    return newUser
  }
}

export default UsersRepository