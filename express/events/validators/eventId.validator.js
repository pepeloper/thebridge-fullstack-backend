const validateEventId = (req, res, next) => {
  const { id } = req.params

  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({
      errors: ["Event ID must be a positive integer"]
    })
  }

  next()
}

export default validateEventId