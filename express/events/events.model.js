import { model, Schema } from 'mongoose';
import slugify from 'slugify';

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_at: {
    type: Date,
    required: true,
  },
  ends_at: {
    type: Date,
    required: true,
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  booking_available: {
    type: Boolean,
    default: false,
  },
  max_tickets_for_order: {
    type: Number,
    required: true,
  },
  event_type: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

eventSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, });
  }
  next();
});

const eventModel = model('Event', eventSchema);

export default eventModel;