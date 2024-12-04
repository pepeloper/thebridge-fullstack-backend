import companyModel from "./companies.model.js"
import mongoose from "mongoose"

const CompaniesRepository = {
  findAll: async () => {
    return companyModel.find().lean()
  },

  findById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    return companyModel.findById(id).lean()
  },

  create: async (companyData) => {
    const newCompany = await companyModel.create(companyData)
    return newCompany
  },

  update: async (id, companyData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    return companyModel.findOneAndUpdate(
      { _id: id },
      { $set: companyData },
      { new: true }
    )
  },

  delete: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false
    }
    const result = await companyModel.findOneAndDelete({ _id: id })
    return result !== null
  }
}

export default CompaniesRepository