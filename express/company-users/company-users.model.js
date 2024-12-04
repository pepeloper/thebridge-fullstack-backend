import { model, Schema } from 'mongoose';

const companyUserSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// Ensure unique combinations of company and user
companyUserSchema.index({ company_id: 1, user_id: 1, }, { unique: true, });

const companyUserModel = model('CompanyUser', companyUserSchema);

export default companyUserModel;