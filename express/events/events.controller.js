import events from "../data.js"

const EventsController = {
  index: (req, res) => {
    const { booking, start_at } = req.query

    let filteredEvents = events

    if (booking !== undefined) {
      const isBookingOpen = booking.toLowerCase() === "open"
      filteredEvents = filteredEvents.filter((event) => event.booking_open === isBookingOpen)
    }

    if (start_at) {
      const startAtFilter = new Date(start_at)
      if (!isNaN(startAtFilter.getTime())) {
        filteredEvents = filteredEvents.filter((event) => new Date(event.start_at) > startAtFilter)
      } else {
        return res.status(400).json({ message: "Invalid date format for startAfter" })
      }
    }

    res.json(filteredEvents)
  },

  show: (req, res) => {
    const { id } = req.params
    const event = events.find((event) => event.id === parseInt(id))

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" })
    }

    res.json(event)
  },

  create: (req, res) => {
    const newEvent = {
      id: events.length + 1,
      name: req.body.name,
      description: req.body.description,
      start_at: req.body.start_at,
      ends_at: req.body.ends_at,
      address: req.body.address,
      booking_open: req.body.booking_open,
      image: req.body.image,
    }

    events.push(newEvent)

    res.status(201).json(newEvent)
  },

  update: (req, res) => {
    const { id } = req.params

    const eventIndex = events.findIndex((event) => event.id === parseInt(id))

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Evento no encontrado" })
    }

    events[eventIndex] = {
      ...events[eventIndex],
      ...req.body,
    }

    res.json(events[eventIndex])
  },

  delete: (req, res) => {
    const { id } = req.params

    const eventIndex = events.findIndex((event) => event.id === parseInt(id))

    if (eventIndex === -1) {
      return res.status(404).json({ message: "Evento no encontrado" })
    }

    events.splice(eventIndex, 1)

    res.status(204).send()
  }
}

export default EventsController