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

export default validateUpdateEvent