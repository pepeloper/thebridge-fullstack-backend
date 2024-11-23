import events from "../data.js"

const EventsRepository = {
  findAll: (filters = {}) => {
    let filteredEvents = events

    if (filters.booking !== undefined) {
      const isBookingOpen = filters.booking.toLowerCase() === "open"
      filteredEvents = filteredEvents.filter((event) => event.booking_open === isBookingOpen)
    }

    if (filters.start_at) {
      const startAtFilter = new Date(filters.start_at)
      if (!isNaN(startAtFilter.getTime())) {
        filteredEvents = filteredEvents.filter((event) => new Date(event.start_at) > startAtFilter)
      } else {
        throw new Error("Invalid date format for startAfter")
      }
    }

    return filteredEvents
  },

  findById: (id) => {
    return events.find((event) => event.id === parseInt(id))
  },

  create: (eventData) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData
    }
    events.push(newEvent)
    return newEvent
  },

  update: (id, eventData) => {
    const eventIndex = events.findIndex((event) => event.id === parseInt(id))
    if (eventIndex === -1) return null

    events[eventIndex] = {
      ...events[eventIndex],
      ...eventData,
    }
    return events[eventIndex]
  },

  delete: (id) => {
    const eventIndex = events.findIndex((event) => event.id === parseInt(id))
    if (eventIndex === -1) return false

    events.splice(eventIndex, 1)
    return true
  }
}

export default EventsRepository