export const validateCreateLink = (req, res, next) => {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({
      error: "URL is required"
    })
  }

  try {
    new URL(url)
    next()
  } catch {
    return res.status(400).json({
      error: "Invalid URL format"
    })
  }
}

export const validateLinkId = (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({
      error: "ID is required"
    })
  }

  next()
}