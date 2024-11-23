import EventsRepository from "./events.repository.js"

const EventsService = {
  getAll: (filters = {}) => {
    try {
      return EventsRepository.findAll(filters)
    } catch (error) {
      if (error.message === "Invalid date format for startAfter") {
        throw error
      }
      throw new Error("Error fetching events")
    }
  },

  getById: (id) => {
    const event = EventsRepository.findById(id)
    if (!event) {
      throw new Error("Event not found")
    }
    return event
  },

  create: (eventData) => {
    return EventsRepository.create(eventData)
  },

  update: (id, eventData) => {
    const updatedEvent = EventsRepository.update(id, eventData)
    if (!updatedEvent) {
      throw new Error("Event not found")
    }
    return updatedEvent
  },

  delete: (id) => {
    const result = EventsRepository.delete(id)
    if (!result) {
      throw new Error("Event not found")
    }
  }
}

export default EventsService