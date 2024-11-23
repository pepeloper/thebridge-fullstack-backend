import EventsService from "./events.service.js"

const EventsController = {
  index: (req, res) => {
    try {
      const { booking, start_at } = req.query
      const events = EventsService.getAll({ booking, start_at })
      res.json(events)
    } catch (error) {
      if (error.message === "Invalid date format for startAfter") {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  },

  show: (req, res) => {
    try {
      const { id } = req.params
      const event = EventsService.getById(id)
      res.json(event)
    } catch (error) {
      if (error.message === "Event not found") {
        return res.status(404).json({ message: "Evento no encontrado" })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  },

  create: (req, res) => {
    try {
      const newEvent = EventsService.create(req.body)
      res.status(201).json(newEvent)
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
    }
  },

  update: (req, res) => {
    try {
      const { id } = req.params
      const updatedEvent = EventsService.update(id, req.body)
      res.json(updatedEvent)
    } catch (error) {
      if (error.message === "Event not found") {
        return res.status(404).json({ message: "Evento no encontrado" })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  },

  delete: (req, res) => {
    try {
      const { id } = req.params
      EventsService.delete(id)
      res.status(204).send()
    } catch (error) {
      if (error.message === "Event not found") {
        return res.status(404).json({ message: "Evento no encontrado" })
      }
      res.status(500).json({ message: "Internal server error" })
    }
  }
}

export default EventsController