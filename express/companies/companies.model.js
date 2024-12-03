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
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

companySchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'company_id'
})

companySchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'company_id',
  through: 'CompanyUser'
})

companySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true })
  }
  next()
})

const companyModel = model('Company', companySchema);

export default companyModel;