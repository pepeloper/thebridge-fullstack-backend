import { model, Schema } from "mongoose"
import slugify from "slugify"

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cif: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

companySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true })
  }
  next()
})

const companyModel = model('Company', companySchema);

export default companyModel;