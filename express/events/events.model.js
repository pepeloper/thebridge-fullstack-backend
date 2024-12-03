import { model, Schema } from "mongoose";

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const eventModel = model('Event', eventSchema);

export default eventModel;