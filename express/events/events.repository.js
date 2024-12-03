import eventModel from "./events.model.js"
import mongoose from "mongoose"

const EventsRepository = {
  findAll: async (filters = {}) => {
    const query = {}

    if (filters.booking !== undefined) {
      const isBookingOpen = filters.booking.toLowerCase() === "open"
      query.booking_open = isBookingOpen
    }

    if (filters.start_at) {
      const startAtFilter = new Date(filters.start_at)
      if (!isNaN(startAtFilter.getTime())) {
        query.start_at = { $gt: startAtFilter }
      } else {
        throw new Error("Invalid date format for startAfter")
      }
    }

    return eventModel.find(query).lean()
  },

  findById: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    return eventModel.findById(id)
      .lean()
  },

  create: async (eventData) => {
    const newEvent = await eventModel.create(eventData)
    return newEvent
  },

  update: async (id, eventData) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null
    }
    return eventModel.findOneAndUpdate(
      { _id: id },
      { $set: eventData },
      { new: true }
    )
  },

  delete: async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false
    }
    const result = await eventModel.findOneAndDelete({ _id: id })
    return result !== null
  }
}

export default EventsRepository