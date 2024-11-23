const validateCreateEvent = (req, res, next) => {
  const { name, description, start_at, ends_at, address, booking_open } = req.body

  const errors = []

  if (!name) errors.push("Name is required")
  if (!description) errors.push("Description is required")
  if (!start_at) errors.push("Start date is required")
  if (!ends_at) errors.push("End date is required")
  if (!address) errors.push("Address is required")
  if (booking_open === undefined) errors.push("Booking status is required")

  if (start_at && ends_at) {
    const startDate = new Date(start_at)
    const endDate = new Date(ends_at)

    if (isNaN(startDate.getTime())) errors.push("Invalid start date format")
    if (isNaN(endDate.getTime())) errors.push("Invalid end date format")
    if (startDate > endDate) errors.push("End date must be after start date")
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

const validateEventId = (req, res, next) => {
  const { id } = req.params

  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({
      errors: ["Event ID must be a positive integer"]
    })
  }

  next()
}

const validateUpdateEvent = (req, res, next) => {
  const { start_at, ends_at } = req.body

  const errors = []

  if (start_at && ends_at) {
    const startDate = new Date(start_at)
    const endDate = new Date(ends_at)

    if (isNaN(startDate.getTime())) errors.push("Invalid start date format")
    if (isNaN(endDate.getTime())) errors.push("Invalid end date format")
    if (startDate > endDate) errors.push("End date must be after start date")
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

export { validateCreateEvent, validateEventId, validateUpdateEvent }